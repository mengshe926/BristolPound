import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { isScreenSmall } from '../../util/ScreenSizes'
import Colors from '@Colors/colors'
import Images from '@Assets/images'
import merge from '../../util/merge'

const logo = isScreenSmall ? Images.onboardingLogoSE : Images.onboardingLogo7
const background = Images.background

const style = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    padding: 45,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height
}

const AppCover = (props) =>
    <View style={merge(style, {backgroundColor: Colors.primaryBlue})}>
        <Image source={background} style={style} />
        <Image source={logo} />
    </View>


export default AppCover
