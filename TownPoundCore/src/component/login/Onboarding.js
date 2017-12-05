import React from 'react'
import { View, Image } from 'react-native'
import DefaultText, { HyperlinkText } from '../DefaultText'
import Splash from './Splash'
import { isScreenSmall } from '../../util/ScreenSizes'
import Colors from '@Colors/colors'
import commonStyle from '../style'
import Images from '@Assets/images'
import Config from '@Config/config'

const style = {
  infoText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: commonStyle.museo700
  }
}

const logo = isScreenSmall ? Images.onboardingLogoSE : Images.onboardingLogo7

const renderWelcomeMessage = () => <Image source={logo} />
const renderInfoText = () =>
  <View style={{flex: 1, alignItems: 'center'}}>
    <DefaultText style={style.infoText}>
        If you haven't signed up for {Config.APP_CURRENCY},
    </DefaultText>
    <View style={{flexDirection: 'row'}}>
      <DefaultText style={style.infoText}>you can do so </DefaultText>
      <HyperlinkText text='from our website' style={style.infoText} link={Config.APP_WEBSITE} />
    </View>
  </View>

class Onboarding extends React.Component {
  render() {
    var logoutButtonText = Config.ALLOW_LOGIN ? "I'm just browsing" : "Start browsing"
    return (
      <Splash loginButtonText='Log in'
        browsingButtonText={logoutButtonText}
        renderWelcomeMessage={renderWelcomeMessage}
        renderInfoText={renderInfoText} />
    )
  }
}
export default Onboarding
