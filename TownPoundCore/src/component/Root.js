import React from 'react'
import Tabs from './Tabs'
import { View, StatusBar, AppState } from 'react-native'
import ReturningLogin from './login/ReturningLogin'
import Onboarding from './login/Onboarding'
import { mainComponent } from '../store/reducer/navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from './login/Login'
import LoginOverlay from './login/LoginOverlay'
import StatusMessage from './StatusMessage'
import Colors from '@Colors/colors'
import Config from '@Config/config'
import SendMoney from './sendMoney/SendMoney'
import md5 from 'md5'
import { logout } from '../store/reducer/login'
import { closeConfirmation, setCoverApp, navigateToTab, hideModal, setOverlayOpen } from '../store/reducer/navigation'
import { updatePage, resetPayment, resetForm } from '../store/reducer/sendMoney'
// import UnlockAppAlert, {maxAttempts} from './lockedState/UnlockAppAlert'
import LockScreen from './lockedState/LockScreen'
import NetworkConnection from './NetworkConnection'

class Root extends React.Component {

  constructor () {
    super()
  }


  render () {
      // The app is rendered before the state has been loaded via redux-persist. This state property allows
      // the main 'app' UI to be hidden until initialised.
      if (!this.props.stateInitialised) {
        return (
          <View style={{flex: 1}}/>
        )
      }
      let bodyComponent
      if (this.props.mainComponent === mainComponent.returningLogin) {
        bodyComponent = <ReturningLogin />
      } else if (this.props.mainComponent === mainComponent.onboarding) {
        bodyComponent = <Onboarding />
      } else if (this.props.mainComponent === mainComponent.tabs) {
        bodyComponent = <Tabs />
      } else {
        throw new Error('Invalid navigation state')
      }

      return (
        <View style={{flex: 1}}>
          <StatusBar animated={true}
              backgroundColor={Colors.transparent}
              translucent={true}
              barStyle={this.props.mainComponent === mainComponent.returningLogin ? 'light-content' : 'dark-content'}/>
          {bodyComponent}
          <LoginOverlay/>
          {(this.props.modalOpen && !this.props.loginFormOpen) && Config.ALLOW_LOGIN && (!this.props.payeeShortDisplay || this.props.userShortDisplay !== this.props.payeeShortDisplay) ? <SendMoney /> : undefined}
          <Login/>
          {this.props.loginFormOpen && <NetworkConnection top={true}/>}
          <StatusMessage/>
          <LockScreen/>
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
    resetPayment,
    setCoverApp,
    navigateToTab,
    setOverlayOpen,
    resetForm
  }, dispatch)

const mapStateToProps = (state) => ({
    ...state.navigation,
    userShortDisplay: state.account.details.shortDisplay,
    payeeShortDisplay: state.business.traderScreenBusinessId
          ? state.business.businessList[state.business.traderScreenBusinessId].fields.username
          : state.person.selectedPerson
            ? state.person.selectedPerson.shortDisplay
            : '',
    loginFormOpen: state.login.loginFormOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
