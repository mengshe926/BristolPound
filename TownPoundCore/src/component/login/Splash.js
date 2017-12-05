import React from 'react'
import { View, TouchableHighlight, Animated,  Easing, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import DefaultText from '../DefaultText'
import Colors from '@Colors/colors'
import merge from '../../util/merge'
import { bindActionCreators } from 'redux'
import { openLoginForm, justBrowsing, LOGIN_STATUSES } from '../../store/reducer/login'
import PLATFORM from '../../util/Platforms'
import style from './SplashStyle'
import Images from '@Assets/images'
import Config from '@Config/config'
import NetworkConnection from '../NetworkConnection'

const background = Images.background
const screenWidth = Dimensions.get('window').width

class Splash  extends React.Component {
  constructor() {
    super()
    this.state = {
      backgroundOffset: new Animated.Value(0),
      showButtons: true
    }
  }

  componentDidMount() {
    this.animateBackground()
  }


  animateBackground() {
    // background image is 2028px wide
    const slideDistance = 2028 - screenWidth

    const animateBackgroundTo = toValue =>
      Animated.timing(this.state.backgroundOffset, {
        toValue,
        duration: 75 * slideDistance,
        easing: Easing.linear
      })

    // create a looping animation for the background
    Animated.sequence([
      animateBackgroundTo(-slideDistance),
      animateBackgroundTo(0)
    ]).start(event => {
      if (event.finished) {
        this.animateBackground()
      }
    })
  }

  render()  {
    return (
      <View style={style.container}>
        <Animated.Image
          style={merge(style.background, {
            transform: [
              {translateX: this.state.backgroundOffset}
            ]
          })}
          resizeMode='cover'
          source={background}/>
        { this.props.loginStatus !== LOGIN_STATUSES.LOGIN_IN_PROGRESS && !this.props.loginFormOpen && !this.props.encryptedPassword
          ? <View style={style.bottomContainer}>
              { this.props.renderWelcomeMessage(this.props) }
              { Config.ALLOW_LOGIN ?
                <TouchableHighlight
                  style={style.loginButton.container}
                  onPress={this.props.connection ? () => this.props.openLoginForm(true) : undefined}
                  underlayColor={Colors.offWhite}>
                <DefaultText style={merge(style.loginButton.text, { color: this.props.connection ? Colors.primaryBlue : Colors.offWhite })}>
                  {this.props.connection ? this.props.loginButtonText : 'No internet connection'}
                </DefaultText>
              </TouchableHighlight>
              : <View style={style.loginButton.replacementContainer}/>}
              <TouchableHighlight
                  style={style.skipButton.container}
                  onPress={this.props.justBrowsing}
                  underlayColor={Colors.primaryBlue}>
                <DefaultText style={style.skipButton.text}>{this.props.browsingButtonText}</DefaultText>
              </TouchableHighlight>
              { Config.ALLOW_LOGIN && this.props.renderInfoText(this.props) }
            </View>
          : undefined
        }
        <NetworkConnection top={true}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
    ...state.login,
    connection: state.networkConnection.status
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openLoginForm, justBrowsing }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
