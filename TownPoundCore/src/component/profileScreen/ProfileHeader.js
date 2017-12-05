import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import DefaultText from '../DefaultText'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './ProfileStyle'
import merge from '../../util/merge'
import MapMarker from '../searchTab/MapMarker'
import { isIncorrectLocation } from '../../util/business'
import  { Button } from '../common/Button'
import Images from '@Assets/images'

const closeButton = Images.close
const expandIcon = Images.expand

const screenWidth = Dimensions.get('window').width,
  screenHeight = Dimensions.get('window').height

const renderCloseButton = (onPress) =>
  <Button style={styles.header.closeButton} onPress={onPress} buttonType={closeButton} size={70}/>

const renderExpandButton = (goToTraderLocation) => {
  if (!goToTraderLocation) {
    return undefined
  }
  return <TouchableOpacity onPress={goToTraderLocation} style={styles.header.expandButton}>
    <Image source={expandIcon} style={styles.header.expandIcon}/>
  </TouchableOpacity>
}


const renderButtonBar = (props) => {
  if (!props.isModal) {
    return undefined
  }
  // Each button is doubled because they disappear on android (RN issue #12060)
  return (
    <View style={styles.header.buttonBar}>
      {renderCloseButton(props.onPressClose)}
      {props.address && props.address.location && renderExpandButton(props.goToTraderLocation)}
    </View>
  )
}

const getMapRegion = (location) => ({
  latitude: location.latitude + 0.00038,
  longitude: location.longitude,
  latitudeDelta: 0.001,
  longitudeDelta: 0.0003
})

const renderBackground = (props) => {
  if (props.address && props.address.location && !isIncorrectLocation(props.address.location)) {
    return (
      props.showMap
      ? <MapView style={styles.header.backgroundImage}
            region={getMapRegion(props.address.location)}
            showsPointsOfInterest={false}
            showsUserLocation={false}
            showsCompass={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            liteMode={true}
            onPress={props.goToTraderLocation}>
          <MapMarker key='marker' coordinate={props.address.location} selected={true} />
        </MapView>
      : <View style={styles.header.backgroundImage} />
    )
  }
  return (
    <Image source={Images.gorillaWithBackground}
        style={styles.header.backgroundImage}
        resizeMode='cover' />
  )
}

const ProfileHeader = (props) => {
  const getSubtitleStyle = () => {
    return props.paymentComplete ? styles.header.subtitle : merge(styles.header.subtitle, {marginBottom: 46})
  }

  return (
    <View style={{ width: screenWidth, height: props.paymentComplete ? undefined : 248 }}>
      {!props.paymentComplete && renderBackground(props)}
      {renderButtonBar(props)}
      <View style={{ alignItems: 'center' }}>
        <ProfileImage
          withdrawal={props.withdrawal}
          image={props.image ? ( props.image.url ? {uri: props.image.url} : {uri: props.image} ) : undefined }
          style={styles.header.businessLogo}
          category={props.category}
          colorCode={0} />
        <DefaultText style={styles.header.title}>{props.name}</DefaultText>
        {props.username
          ? <DefaultText style={getSubtitleStyle()}>{props.username}</DefaultText>
          : null}
      </View>
    </View>
  )
}

export default ProfileHeader
