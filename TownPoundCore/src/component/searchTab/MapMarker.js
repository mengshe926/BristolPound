import React from 'react'
import { Marker } from 'react-native-maps'
import platform from '../../util/Platforms'
import { isScreenSmall } from '../../util/ScreenSizes'
import { Image, View, Text } from 'react-native'
import Images from '@Assets/images'
import Colors from '@Colors/colors'
import { Dimensions } from 'react-native'

const MapMarker = ({ coordinate, selected, onPress, pointCount }) => {
  if (pointCount) {
    // added Date.now into marker key to force update marker (fixes cluster text disappearing)
    const imageStyle = {
      tintColor: (selected ? Colors.darkBlue : Colors.primaryBlue)
    }
    const scale     = pointCount > 99
                    ? 1
                    : pointCount > 9
                    ? 0.8
                    : 0.6
    if (scale != 1) {
      imageStyle.transform = [{scale: scale}]
    }

    return <Marker
        coordinate={coordinate}
        onPress={onPress}
        key={coordinate.latitude + '-' + coordinate.longitude + '-' + Date.now()}
        anchor={platform.isIOS() ? null : { x: 0.5, y: 0.5 }}
        >
        <Image
          style={imageStyle}
          source={Images.cluster.circle}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            {pointCount}
          </Text>
        </View>
    </Marker>
  }

  const marker = selected ? Images.marker.selected : Images.marker.account
  return <Marker
      coordinate={coordinate}
      onPress={onPress}
      anchor={platform.isIOS() ? null : { x: 0.5, y: 0.5 }}
      image={marker}/>
}

export default MapMarker
