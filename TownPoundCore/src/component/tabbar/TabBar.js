import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import DefaultText from '../DefaultText'
import Price from '../Price'
import { connect } from 'react-redux'
 import Colors from '@Colors/colors'
import { openLoginForm } from '../../store/reducer/login'
import { showModal, modalState } from '../../store/reducer/navigation'
import { LOGIN_STATUSES } from '../../store/reducer/login'
import style from './TabBarStyle'
import Config from '@Config/config'
import Images from '@Assets/images'

// NOTE - The image URLs must be known statically
// see: https://facebook.github.io/react-native/docs/images.html

const TabItem = (active, inactive, label) => ({ active, inactive, label })
const TABS = [
    TabItem(
        Images.searchActive,
        Images.searchInactive,
        'Search Tab'
    ),
    TabItem(
        Images.spendingActive,
        Images.spendingInactive,
        'Spending Tab'
    ),
    TabItem(
        Images.meActive,
        Images.meInactive,
        'My Details Tab'
    )
]

const isDevMode = Config.FLAVOUR === 'dev'

const TabBar = (props) => 
  <View style={style.tabBar}>
    {TABS.map((tab, index) =>
      <View style={style.centerChildren} key={index}>
        <TouchableOpacity
            style={style.iconContainer}
            onPress={() => props.goToPage(index)}
            onLongPress={() => {isDevMode && props.showModal(modalState.developerOptions)}}
            accessibilityLabel={tab.label}>
          <Image source={props.tabIndex === index ? tab.active : tab.inactive}/>
        </TouchableOpacity>
        {index !== TABS.length - 1 ? <View style={style.separator}/> : undefined}
      </View>
    )}
    <View style={style.amountContainer}>
      {
        props.loggedIn
          ? <View style={style.amountInnerContainer}>
              <Image source={Images.balanceSymbol} style={style.balanceSymbol}/>
              <Price
                  style={style.amount}
                  price={props.balance}
                  prefix=''
                  size={30}
                  color={Colors.primaryBlue}/>
            </View>
          : <TouchableOpacity
                style={style.centerChildren}
                onPress={props.connection ? () => props.openLoginForm(true) : undefined}
                accessibilityLabel='Log in Tab'>
              <View>
                <DefaultText style={{ color: props.connection ? Colors.primaryBlue : Colors.offWhite }}>Log in</DefaultText>
              </View>
            </TouchableOpacity>
      }
    </View>
  </View>


const mapStateToProps = (state) => ({
  loggedIn: state.login.loginStatus === LOGIN_STATUSES.LOGGED_IN,
  balance: state.account.balance,
  connection: state.networkConnection.status,
  tabIndex: state.navigation.tabIndex
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    openLoginForm,
    showModal
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)
