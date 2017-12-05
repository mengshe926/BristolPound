import React from 'React'
import { View, AppState } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authenticate } from '../../api/api'
import md5 from 'md5'
import { logout, reauthorise, authenticateCyclosPIN,
  LOGIN_STATUSES, clearEncryptionKey, setEncryptionKey
} from '../../store/reducer/login'
import AppCover from './AppCover'
import { closeConfirmation, setCoverApp, navigateToTab, hideModal, setOverlayOpen } from '../../store/reducer/navigation'
import UnlockAppAlert, {maxAttempts} from './UnlockAppAlert'
import { updatePage, resetPayment, resetForm } from '../../store/reducer/sendMoney'
import StoredPasswordLockScreen from './StoredPasswordLockScreen'
import style from './LockStyle'
import moment from 'moment'
import Colors from '@Colors/colors'
import { Overlay } from '../common/Overlay'
import NetworkConnection from '../NetworkConnection'


const MINIMISE_TIMEOUT = 3

class LockScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      unlockError: false,
      failedAttempts: 0,
      lockTimeStamp: null,
      headerMessage: '',
      reauthOnConnection: false
    }
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
      this.props.setCoverApp(true)
      this.setState({lockTimeStamp: moment()})
    }
    else if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      var diff = moment().diff(this.state.lockTimeStamp, 'seconds')
      if (diff >= MINIMISE_TIMEOUT) {
        if (this.props.unlockCode !== '' && this.props.loginStatus === LOGIN_STATUSES.LOGGED_IN) {
          this.setState({
              askToUnlock: true,
              reauthOnConnection: false
          })
          this.props.clearEncryptionKey()
        }
        else if (this.props.loginStatus === LOGIN_STATUSES.LOGGED_IN) {
          this.props.setCoverApp(false)
          this.logout()
        }
      }
      else {
        if (!this.state.askToUnlock) {
          this.props.setCoverApp(false)
        }
      }
    }
    else {
    }
    this.setState({appState: nextAppState})
  }


  resetState() {
    // If it's a login replacement then it will unmount after login so just return
    if (this.props.loginReplacement) return

    this.setState({
      askToUnlock: false,
      unlockError: false,
      failedAttempts: 0,
      headerMessage: '',
      reauthOnConnection: false
    })
  }

  logout () {
    this.props.logout()
    this.props.closeConfirmation()
    this.resetState()
    this.props.setCoverApp(false)
  }

  logoutPress () {
    this.props.navigateToTab(0)
    this.props.resetForm()
    this.props.setOverlayOpen(false)
    this.props.hideModal()
    this.logout()
  }

  unlock() {
    this.props.setCoverApp(false)
    this.resetState()

  }

  failedAttempt() {
    var failedAttempts = this.state.failedAttempts + 1
    this.setHeader(false)
    if (failedAttempts < maxAttempts) {
      this.setState({unlockError: true, failedAttempts})
    }
    else {
      this.props.resetPayment()
      this.logout()
    }
  }

  setHeader(set, message) {
    if (set) {
      this.setState({ headerMessage: message })
    }
    else {
      this.setState({ headerMessage: '' })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.storePassword !== this.props.storePassword
      && !nextProps.storePassword) {
        this.resetState()
    }

    if (nextProps.loginStatus !== this.props.loginStatus
      && nextProps.loginStatus == LOGIN_STATUSES.LOGGED_IN) {
        this.resetState()
    }

    if (nextProps.connection && !this.props.connection
      && this.state.reauthOnConnection) {
        this.reauthorise()
      }

  }

  checkPin(code) {
    var hashedPIN = md5(code)
    if (hashedPIN === this.props.unlockCode) {
      return true
    }

    return false
  }

  reauthorise(code = null) {
    this.props.reauthorise(code)
      .then((success) => {
        if (success) {
          return true
        }
      })
      .catch(() => {
        this.logout()
      })
  }

  setAuthTimer(code) {
    // If internet returns after disconnection, reauthorise

    // Set timer to reauthorise if there's internet connection
    if (this.props.connection) {
      setTimeout(() => this.reauthorise(code), 200)
    }
    // Otherwise just set the encryption key and wait for internet to return
    else {
      this.props.setEncryptionKey(code)
    }
    this.setState({reauthOnConnection: true})
  }

  loginReplacementMethod(code) {
    this.props.authenticateCyclosPIN(this.props.loggedInUsername, code)
    .then((success) => {
      if (success) {
        this.unlock()
        this.props.postUnlock() // login after authorising the PIN
      }
    })
    .catch((err) => {
      return false
    })
  }

  storedPasswordUnlock(code) {
    // If being used as a login replacement, perform full log in using
    // different auth method
    if (this.props.loginReplacement) {
      return this.loginReplacementMethod(code)
    }
    else {
      if (this.checkPin(code)) {
        this.unlock()
        this.setAuthTimer(code)
      }
      else {
        this.failedAttempt()
      }
    }

    this.setHeader(false)
  }


  render() {
    if (!this.state.askToUnlock && !this.props.loginReplacement) {
      return <View style={{ height: 0 }}/>
    }
    const { loginReplacement, connection } = this.props
    var disabledUnlock = (loginReplacement && !connection) || this.props.authenticating
    return (
      <View style={style.wrapper}>
        {this.props.coverApp
            && <AppCover/>
        }
        <Overlay overlayVisible={this.state.headerMessage ? true : false}
                 onPress={() => {}}
                 underlayColor={Colors.transparent}
        />
        <StoredPasswordLockScreen
                storedPasswordUnlock={this.storedPasswordUnlock.bind(this)}
                error={this.state.unlockError}
                failedAttempts={this.state.failedAttempts}
                logout={() => this.logoutPress()}
                disabledUnlock={this.props.loginReplacement && !this.props.connection}
                headerMessage={this.state.headerMessage}
                showLockScreen={this.props.storePassword}
          />
        <NetworkConnection top={true}/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    logout,
    hideModal,
    closeConfirmation,
    updatePage,
    setCoverApp,
    navigateToTab,
    setOverlayOpen,
    resetPayment,
    resetForm,
    authenticateCyclosPIN,
    reauthorise,
    clearEncryptionKey,
    setEncryptionKey
  }, dispatch)


const mapStateToProps = (state) => ({
  ...state.navigation,
  ...state.login,
  connection: state.networkConnection.status,
  statusMessage: state.statusMessage.message
})

export default connect(mapStateToProps, mapDispatchToProps)(LockScreen)
