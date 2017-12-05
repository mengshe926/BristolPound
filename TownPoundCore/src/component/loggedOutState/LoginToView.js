import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import Colors from '@Colors/colors'
import DefaultText from '../DefaultText'
import Images from '@Assets/images'

const screenWidth = Dimensions.get('window').width,
  screenHeight = Dimensions.get('window').height
  
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute'
  },
  text: {
    color: Colors.gray4,
    marginBottom: 8,
    fontSize: 20
  },
  image: {
    marginBottom: 20
  }
}


export const emptyStateImage = {
  spending: 'spending',
  map: 'map',
  account: 'account'
}

const getImageSource = (image) => {
  switch(image) {
    case emptyStateImage.spending:
      return Images.spending
    case emptyStateImage.map:
      return Images.map
    case emptyStateImage.account:
      return Images.account
  }
}

const LoginToView = (props) =>
  <View style={styles.container}>
    <Image style={styles.image} source={getImageSource(props.image)} />
    <DefaultText style={styles.text}>{props.lineOne}</DefaultText>
    <DefaultText style={styles.text}>{props.lineTwo}</DefaultText>
  </View>

export default LoginToView
