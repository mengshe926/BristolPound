import React from 'react'
import { View } from 'react-native'
import DefaultText from '../DefaultText'
import Splash from './Splash'
import style from './ReturningLoginStyle'

const renderWelcomeMessage = (props) => {
  return (
    <View style={style.centerContainer}>
      <DefaultText style={style.welcome.welcomeText}>Welcome back</DefaultText>
      <DefaultText style={style.welcome.usernameText}>{props.loggedInName}</DefaultText>
    </View>
  )
}

const renderInfoText = () => {
  return (
    <View style={style.centerContainer}>
      <DefaultText style={style.infoText}>You can log back in later to see your</DefaultText>
      <DefaultText style={style.infoText}>details and make payments</DefaultText>
    </View>
  )
}

class ReturningLogin extends React.Component {
  render() {
    return (
      <Splash loginButtonText='Log in'
        browsingButtonText="I'm just browsing"
        renderWelcomeMessage={renderWelcomeMessage}
        renderInfoText={renderInfoText} />
    )
  }
}

export default ReturningLogin
