import React from 'react'
import { View } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigateToTab, hideModal, closeConfirmation, modalState, modalOpened } from '../store/reducer/navigation'
import { openLoginForm, LOGIN_STATUSES } from '../store/reducer/login'
import TabBar from './tabbar/TabBar'
import SearchTab from './searchTab/SearchTab'
import NetworkConnection from './NetworkConnection'
import SpendingTab from './spending/SpendingTab'
import { updatePage, resetForm } from '../store/reducer/sendMoney'
import Account from './Account'
import LoginToView, { emptyStateImage } from './loggedOutState/LoginToView'
import TraderScreen from './TraderScreen'
import PersonScreen from './PersonScreen'
import DeveloperOptions from './DeveloperOptions'
import Colors from '@Colors/colors'
import Config from '@Config/config'
import Modal from './Modal'
import SecondModal from './SecondModal'
import PaymentConfirmation from './PaymentConfirmation'
import ContinuePaymentAlert from './ContinuePaymentAlert'

const style = {
  tabs: {
    flex: 1,
    backgroundColor: Colors.white
  },
  hiddenTabBar: {
    height: 0
  },
  flex: {
    flex: 1
  }
}

const componentForModalState = (state) => {
  switch (state) {
    case modalState.traderScreen:
      return <TraderScreen/>
    case modalState.personScreen:
      return <PersonScreen/>
    case modalState.developerOptions:
      return <DeveloperOptions/>
  }
}

const WithNetworkConnection = (props) =>
  <View style={style.flex}>
    {props.children}
    <NetworkConnection/>
  </View>

const Tabs = (props) =>
  <View style={style.flex}>
    <ScrollableTabView
        // On Android devices, when the keyboard is visible it pushes the entire
        // view upwards. In this instance we want to hide the tab bar
        renderTabBar={() => ((props.dialogOpen && props.modalVisible) || !Config.ALLOW_LOGIN) ? <View style={style.hiddenTabBar}/> : <TabBar/>}
        tabBarPosition='bottom'
        initialPage={props.tabIndex}
        tabBarActiveTextColor={Colors.primaryBlue}
        style={style.tabs}
        page={props.tabIndex}
        tabBarBackgroundColor={Colors.lightGray}
        scrollWithoutAnimation={true}
        locked={true}
        onChangeTab={({i}) => props.navigateToTab(i)}
        tabBarUnderlineColor={Colors.transparent}>
      <WithNetworkConnection tabLabel='Search'>
        <SearchTab/>
      </WithNetworkConnection>
      <WithNetworkConnection tabLabel='Spending'>
        { props.loggedIn
          ? <SpendingTab/>
          : <LoginToView
              image={emptyStateImage.spending}
              lineOne='Log in to view'
              lineTwo='your spending history' />
        }
      </WithNetworkConnection>
      <WithNetworkConnection tabLabel='Account'>
        { props.loggedIn
          ? <Account/>
          : <LoginToView
                  image={emptyStateImage.account}
                  lineOne='Log in to view'
                  lineTwo='your account details' />
        }
      </WithNetworkConnection>
    </ScrollableTabView>
    <Modal visible={props.modalVisible} hideModal={() => {!props.confirmationOpen && props.hideModal() && props.resetForm()}} modalOpened={props.modalOpened}>
      {componentForModalState(props.modalState)}
    </Modal>
    <SecondModal visible={props.confirmationOpen} hideModal={() => {props.closeConfirmation() && props.updatePage(0)}}>
      <PaymentConfirmation />
    </SecondModal>
    {props.alertShouldPopUp && props.loggedIn && <ContinuePaymentAlert />}
  </View>

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ navigateToTab, hideModal, closeConfirmation, openLoginForm, updatePage, resetForm, modalOpened }, dispatch)

const mapStateToProps = (state) => ({
  tabIndex: state.navigation.tabIndex,
  modalState: state.navigation.modalState,
  modalVisible: state.navigation.modalVisible,
  loggedIn: state.login.loginStatus === LOGIN_STATUSES.LOGGED_IN,
  status: state.status,
  dialogOpen: state.login.loginFormOpen,
  online: state.networkConnection.status,
  confirmationOpen: state.navigation.confirmationOpen,
  alertShouldPopUp: state.sendMoney.alertShouldPopUp
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
