import React from 'react'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StatusBar, ActivityIndicator } from 'react-native'
import _ from 'lodash'
import supercluster from 'supercluster'
import { MultilineText } from '../DefaultText'
import { updateMapViewport, selectBusiness } from '../../store/reducer/business'
import { shouldBeDisplayed, isIncorrectLocation } from '../../util/business'
import merge from '../../util/merge'
import style from './BackgroundMapStyle'
import MapMarker from './MapMarker'

class BackgroundMap extends React.Component {
  onRegionChangeComplete = () => {}

  constructor(props) {
    super()
    this.state = ({ loading: true, markerArray: [] })
    this.forceRegion = merge(props.forceRegion)
    this.currentRegion = merge(props.forceRegion)
    this.supercluster = supercluster({ radius: 60 })
    this.mapRef = null
    this.superclusterLoaded = false
  }

  componentDidMount() {
    // To prevent the user seeing the centre of the earth when opening the app
    // and to prevent phony region changes
    setTimeout(() => {
      this.onRegionChangeComplete = (region) => {
        this.currentRegion = merge(region)
        this.props.updateMapViewport(region)
        this.updateMarkers()
      }
      if (this.props.businessList) {
        this.populateSupercluster()
      }
      this.setState({ loading: false })
    }, 1500)
  }

  componentWillUpdate(nextProps) {
    /*
      if we press on goToLocation from the same business twice in a row,
      nextProps.forceRegion and this.props.forceRegion would be the same,
      even if the map moved in the meantime
      in this case, the second component of the OR check is met,
      fixing https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/BristolPound/issues/1009
    */
    if (!_.isEqual(nextProps.forceRegion, this.props.forceRegion) || (!_.isEqual(nextProps.mapViewport, this.props.mapViewport) && _.isEqual(nextProps.forceRegion, nextProps.mapViewport))) {
      this.forceRegion = merge(nextProps.forceRegion)
      this.currentRegion = merge(nextProps.forceRegion)
      this.updateMarkers()
    } else {
      this.forceRegion = undefined
    }
  }

  componentDidUpdate(lastProps) {
    if (lastProps.businessList !== this.props.businessList) {
      this.populateSupercluster()
    } else if (lastProps.forceRegion !== this.props.forceRegion
        || lastProps.selectedBusinessId !== this.props.selectedBusinessId) {
      this.updateMarkers()
    }
  }

  populateSupercluster() {
    this.supercluster.load(_.filter(this.props.businessList, b => b.address.location)
      .map((b) => ({
        geometry: {
          coordinates: [
            b.address.location.longitude,
            b.address.location.latitude
          ]
        },
        properties: {},
        id: b.id
    })))
    this.superclusterLoaded = true
    this.updateMarkers()
  }

  getZoomLevel(region = this.currentRegion) {
    // http://stackoverflow.com/a/6055653
    const angle = region.longitudeDelta

    const zoom = Math.max(0, Math.min(Math.round(Math.log(360 / angle) / Math.LN2), 17))

    return zoom
  }

  updateMarkers(props = this.props) {

    // only works, once the markers are loaded
    if (!this.superclusterLoaded) return

    const clusteredMarkers = this.supercluster.getClusters([
      this.currentRegion.longitude - this.currentRegion.longitudeDelta * 0.5,
      this.currentRegion.latitude - this.currentRegion.latitudeDelta * 0.5,
      this.currentRegion.longitude + this.currentRegion.longitudeDelta * 0.5,
      this.currentRegion.latitude + this.currentRegion.latitudeDelta * 0.5,
    ], this.getZoomLevel())

    this.setState({ markerArray: clusteredMarkers.map(this.renderClusteredMarker(props)) })
  }

  isSelected(business) {
    return business.id === this.props.selectedBusinessId
  }

  zoomToCluster = (coordinate) => {
    const region = {
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      longitudeDelta: this.currentRegion.longitudeDelta * 0.5,
      latitudeDelta: this.currentRegion.latitudeDelta * 0.5
    }
    this.mapRef.animateToRegion(region, 300)
  }

  renderClusteredMarker = ({ selectBusiness, selectedBusinessId }) =>
    ({ geometry, properties, id }) => {
      const coordinate = {
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1]
      }
      let onPress = null
      let selected = null
      if ( id && (properties.point_count === 1 || !properties.point_count) ) {
          onPress = () => selectBusiness(id)
          selected = id === selectedBusinessId
      } else if (properties.point_count > 1 ) {
        if(selectedBusinessId) {
          var points = this.supercluster.getLeaves(properties.cluster_id, this.getZoomLevel(), Infinity)
          var pt = points.find(point => point.id === selectedBusinessId)
          selected = pt !== undefined
        }
        onPress = () => this.zoomToCluster(coordinate)
      }

      return isIncorrectLocation(coordinate)
              ? undefined
              : <MapMarker key={coordinate.latitude.toString()+coordinate.longitude.toString()}
                  selected={selected}
                  coordinate={coordinate}
                  onPress={onPress}
                  pointCount={properties.point_count}/>
    }

  render() {
    return (
      <View style={style.mapContainer}>
        <StatusBar
          backgroundColor='rgba(255, 255, 255, 0.5)'
          barStyle="dark-content"
        />
        {this.state.loading
          ? undefined
          : <View style={style.warningContainer}>
            <MultilineText style={{textAlign: 'center'}}>
              Google Play Services is out of date. You can get the latest version from the Play Store
            </MultilineText>
          </View>}
        <MapView style={style.map}
            region={this.forceRegion || this.currentRegion}
            ref={(ref) => { this.mapRef = ref }}
            showsPointsOfInterest={false}
            showsUserLocation={true}
            showsCompass={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollEnabled={!this.state.loading}
            zoomEnabled={!this.state.loading}
            onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}
            loadingEnabled={false}
            moveOnMarkerPress={false}>
          {this.state.markerArray}
        </MapView>
        {this.state.loading
          ? <View style={style.loadingOverlay}>
              <ActivityIndicator size='large' style={{
                alignItems: 'center',
                justifyContent: 'center'
              }} />
            </View>
          : undefined}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedBusinessId: state.business.selectedBusinessId,
  businessList: state.business.filteredBusinesses.length > 0 ? state.business.filteredBusinesses : state.business.businessList,
  forceRegion: state.business.forceRegion,
  mapViewport: state.business.mapViewport
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateMapViewport, selectBusiness }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundMap)
