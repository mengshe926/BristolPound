import React from 'react'
import { View, Dimensions } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BackgroundMap from './BackgroundMap'
import ComponentList from './ComponentList'
import BusinessListItem, { SelectedBusiness } from './BusinessListItem'
import DraggableList from './DraggableList'
import styles, { SEARCH_BAR_HEIGHT, SEARCH_BAR_MARGIN, maxExpandedHeight } from './SearchTabStyle'
import { ROW_HEIGHT, BUSINESS_LIST_SELECTED_GAP} from './BusinessListStyle'
import { selectBusiness, updateTabMode, openTraderModal, moveMap, addFilter, removeFilter, tabModes } from '../../store/reducer/business'
import { Overlay } from '../common/Overlay'
import Search from './Search'
import calculatePanelHeight from '../../util/calculatePanelHeight'

const BUSINESS_LIST_GAP_PLACEHOLDER = { pressable: false }

const EXPANDED_LIST_TOP_OFFSET = SEARCH_BAR_HEIGHT + SEARCH_BAR_MARGIN

const listCroppedLength = Math.ceil(Dimensions.get('window').height / ROW_HEIGHT)

const ComponentForItem = (item, deselect) => {
    if (item === BUSINESS_LIST_GAP_PLACEHOLDER) {
        return <View style={{ height: 10 }}/>
    }
    if (item.isSelected) {
        return <SelectedBusiness business={item} deselect={deselect}/>
    }
    return <BusinessListItem business={item} />
}

class SearchTab extends React.Component {
  constructor(props) {
    super()
    this.state = { componentListArray: this.createComponentListArray(props).slice(0, listCroppedLength) }
    this.listPosition = 1
  }


  createComponentListArray(props = this.props) {
    const makePressable = (itemProps) => {
      itemProps.pressable = true
      return itemProps
    }
    if (props.selectedBusiness) {
      return [
        _.extend({isSelected: true}, makePressable(props.selectedBusiness)),
        BUSINESS_LIST_GAP_PLACEHOLDER,
        ...props.closestBusinesses.map(makePressable)
      ]
    } else {
      return props.closestBusinesses.map(makePressable)
    }
  }

  calculateOffset(heights) {
    return heights.map(height => EXPANDED_LIST_TOP_OFFSET + maxExpandedHeight - height)
  }

  componentWillReceiveProps(nextProps) {
    let mapMoved = false
    nextProps.closestBusinesses.forEach((b, index) => {
      if (!this.props.closestBusinesses[index] || b.id !== this.props.closestBusinesses[index].id) {
        mapMoved = true
      }
    })
    if (nextProps.selectedBusiness !== this.props.selectedBusiness || mapMoved) {
      const componentListArray = this.createComponentListArray(nextProps)
      componentListArray = this.listPosition
        ? componentListArray.slice(0, listCroppedLength)
        : componentListArray

      this.setState({ componentListArray: componentListArray})
    }
  }

  onPositionChange(position) {
    if (position === 0 && this.listPosition !== 0) {
      this.setState({ componentListArray: this.createComponentListArray() })
    }
    this.listPosition = position
  }

  render() {
    const { closestBusinesses, openTraderModal, selectedBusiness, tabMode, updateTabMode } = this.props
    const { componentList } = this.refs

    const noOfCloseBusinesses = closestBusinesses.length,
        childrenHeight = selectedBusiness
            ? (noOfCloseBusinesses + 1) * ROW_HEIGHT + BUSINESS_LIST_SELECTED_GAP
            : noOfCloseBusinesses * ROW_HEIGHT

    const { collapsedHeight, expandedHeight, closedHeight } = calculatePanelHeight(
      this.props.closestBusinesses.length,
      this.props.selectedBusiness
    )

    return (
      <View style={{flex: 1}}>
        <BackgroundMap />
        {tabMode === tabModes.default && <DraggableList ref={this.props.registerBusinessList}
            style={styles.searchTab.expandPanel}
            topOffset={this.calculateOffset([ expandedHeight, collapsedHeight, closedHeight ])}
            expandedHeight={expandedHeight}
            onTouchEnd={(event, hasMoved) => componentList && componentList.handleRelease(hasMoved, event)}
            onTouchStart={location => componentList && componentList.highlightItem(location)}
            onMove={() => componentList && componentList.handleRelease(true)}
            childrenHeight={childrenHeight + BUSINESS_LIST_SELECTED_GAP}
            startPosition={1}
            onPositionChange={(position) => this.onPositionChange(position)}>
            <ComponentList
                ref='componentList'
                items={this.state.componentListArray}
                refreshTabMode={() => updateTabMode(tabMode)}
                componentForItem={ComponentForItem}
                deselect={() => this.props.selectBusiness(undefined)}
                onPressItem={index => this.state.componentListArray[index].id && openTraderModal(this.state.componentListArray[index].id)} />
        </DraggableList>}
        {tabMode!==tabModes.default && <Overlay overlayVisible={true} onPress={() => updateTabMode(tabModes.default)} />}
        <Search {...this.props} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  closestBusinesses: state.business.closestBusinesses.filter(b => b.id !== state.business.selectedBusinessId),
  allFilters: state.business.categories,
  activeFilters: state.business.activeFilters,
  selectedBusiness: state.business.selectedBusinessId ? state.business.businessList[state.business.selectedBusinessId] : undefined,
  allBusinesses: state.business.businessList,
  tabMode: state.business.tabMode,
  mapViewport: state.business.mapViewport,
  geolocationStatus: state.business.geolocationStatus
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ moveMap, addFilter, removeFilter, selectBusiness, updateTabMode, openTraderModal }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)
