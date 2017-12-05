import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, TouchableOpacity, TextInput, Image, Animated } from 'react-native'
import DefaultText from '../DefaultText'
import Colors from '@Colors/colors'
import merge from '../../util/merge'
import animateTo from '../../util/animateTo'
import { beginLogin, unlockAndLogin, login,
    LOGIN_STATUSES, acceptPrivacyPolicy, flipStorePassword,
    acceptQuickUnlockDisclaimer, authenticateCyclosPassword, authenticateCyclosPIN, setStorePassword
} from '../../store/reducer/login'
import KeyboardComponent from '../KeyboardComponent'
import PrivacyPolicy from './PrivacyPolicy'
import QuickUnlockDisclaimer from './QuickUnlockDisclaimer'
import styles from './LoginStyle'
import Images from '@Assets/images'
import Checkbox from 'react-native-check-box'
import LockScreen from '../lockedState/LockScreen'
import NetworkConnection from '../NetworkConnection'
import _ from 'lodash'
import { screenHeight } from '../../util/ScreenSizes'


class Login extends KeyboardComponent {
  constructor(props) {
    super()
    this.state.username = props.loggedInUsername
    this.state.maxKeyboardHeight = 0
    this.THROTTLED_DELAY = 500
  }

  selectPasswordField() {
    this.passwordInputRef.focus()
  }

  loginValid() {
    return (this.detailsValid() && this.loginStateValid())
  }

  loginStateValid() {
    const { connection, authenticating } = this.props
    return connection && !authenticating
  }

  // Cyclos doesn't like special characters or empty usernames :(
  detailsValid() {
    const { username, password } = this.state
    return (
      username && !username.match(/\W/) && password
        && password.indexOf(' ') === -1
    )
  }

  componentDidUpdate(lastProps) {
    if (this.props.loginFormOpen && !lastProps.loginFormOpen) {
      const bottom = new Animated.Value(-204)
      this.setState({ bottom })
      animateTo(bottom, 0, 500)
    }
    if (!this.props.loginFormOpen && lastProps.loginFormOpen) {
      this.setState({ password: undefined })
    }
    if (this.props.loggedInUsername !== lastProps.loggedInUsername) {
      this.setState({ username: this.props.loggedInUsername })
    }
  }

  beginLogin() {
    this.props.beginLogin(this.state.username, this.state.password)
  }

  passwordUpdated(newPassword) {
    this.setState({ password: newPassword })
  }

  usernameUpdated(newUsername) {
    this.setState({ username: newUsername })
  }

  acceptQuickLoginCallback(PIN) {
    // Fall back if no connection
    if (!this.props.connection) {
      this.props.acceptQuickUnlockDisclaimer(false)
      return
    }

    const { username, password } = this.state

    this.props.authenticateCyclosPIN(username, PIN)
      .then((success) => {
        if (success) {
          this.props.acceptQuickUnlockDisclaimer(true, username, password)
        }
        else {
          // Fall back if cannot validate PIN
          this.props.acceptQuickUnlockDisclaimer(false)
        }
      })

  }

  cancelQuickLoginCallback() {
    this.props.acceptQuickUnlockDisclaimer(false)
    this.props.setStorePassword(false)
  }


  flipStorePassword() {
    this.props.flipStorePassword()
  }

  attemptLogin() {
    if (this.loginValid()) {
      this.beginLogin()
    }
  }

  render() {
    let loginButtonText = 'Log in'
    const {
      acceptPrivacyPolicy,
    } = this.props
    const { username, password } = this.state
    const loginView = (
      <View>
        <Animated.View style={merge(styles.outerContainer, { bottom: this.state.keyboardHeight })}>
          <Animated.View style={merge(styles.loginContainer, { bottom: this.state.bottom })}>
            <TouchableOpacity style={{ ...styles.loginButton, backgroundColor: this.loginValid() ? Colors.primaryBlue : Colors.offWhite }}
                accessibilityLabel={'Login Button'}
                onPress={_.throttle(this.attemptLogin.bind(this), this.THROTTLED_DELAY)}>
              <DefaultText style={{ ...styles.loginButtonText, color: this.loginValid() ? 'white' : 'black' }}>
                {loginButtonText}
              </DefaultText>
            </TouchableOpacity>
            <TextInput style={styles.input}
                accessibilityLabel={'Input Username'}
                autoFocus={this.state.username === ''}
                onChangeText={(text) => this.usernameUpdated(text)}
                onSubmitEditing={this.selectPasswordField.bind(this)}
                placeholder={'Username'}
                placeholderTextColor={Colors.gray4}
                selectTextOnFocus={true}
                value={this.state.username}
                underlineColorAndroid={Colors.transparent}
                autoCorrect={false} />
            <View style={styles.separator}/>
            <TextInput style={styles.input}
                ref={(ref) => this.passwordInputRef = ref}
                accessibilityLabel={'Input Password'}
                autoFocus={this.state.username !== ''}
                onChangeText={(text) => this.passwordUpdated(text)}
                onSubmitEditing={() => this.beginLogin()}
                placeholder={'Password'}
                placeholderTextColor={Colors.gray4}
                value={this.state.password}
                secureTextEntry={true}
                selectTextOnFocus={true}
                underlineColorAndroid={Colors.transparent} />
            <View style={styles.separator}/>
            <View style={styles.storePasswordContainer}>
              <Checkbox
                style={styles.checkbox}
                onClick={() => this.flipStorePassword()}
                isChecked={this.props.storePassword}
                leftText={"Use Quick Login"}
                checkedImage={<Image source={Images.check_box} style={styles.checkboxImage}/>}
                unCheckedImage={<Image source={Images.check_box_blank} style={styles.checkboxImage}/>}
                leftTextStyle={styles.checkboxLeftText}
              />
            </View>
          </Animated.View>
        </Animated.View>
        <NetworkConnection top={true}/>
      </View>
    )
    return (
      this.props.storePassword && this.props.encryptedPassword && this.props.loginStatus === LOGIN_STATUSES.LOGGED_OUT
        ? <LockScreen postUnlock={this.props.unlockAndLogin} loginReplacement={true}/>
        : this.props.loginFormOpen
            ? this.props.privacyPolicyOpen
              ? <PrivacyPolicy
                  acceptCallback={() =>
                    acceptPrivacyPolicy(true, this.state.username, this.state.password)}
                  rejectCallback={() => acceptPrivacyPolicy(false)}
                  bottom={this.state.maxKeyboardHeight}
                />
              : this.props.quickUnlockDisclaimerOpen
                ? <QuickUnlockDisclaimer
                    acceptCallback={_.throttle((PIN) => this.acceptQuickLoginCallback(PIN), this.THROTTLED_DELAY)}
                    rejectCallback={() => this.cancelQuickLoginCallback()}
                    disabledAccept={!this.loginStateValid()}
                    bottom={this.state.maxKeyboardHeight}
                  />
                : loginView
            : <View style={{ height: 0 }}/>
      )
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    beginLogin,
    acceptPrivacyPolicy,
    flipStorePassword,
    acceptQuickUnlockDisclaimer,
    authenticateCyclosPassword,
    authenticateCyclosPIN,
    setStorePassword,
    login,
    unlockAndLogin
  }, dispatch)

const mapStateToProps = (state) => (
  {
    ...state.login,
    connection: state.networkConnection.status,
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
