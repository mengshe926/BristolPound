import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View, TouchableHighlight, Image } from 'react-native'
import Colors from '@Colors/colors'
import merge from '../util/merge'
import { loadBusinessList, resetBusinesses } from '../store/reducer/business'
import { loadTransactions, resetTransactions } from '../store/reducer/transaction'
import DefaultText from './DefaultText'
import { hideModal } from '../store/reducer/navigation'
import { LOGIN_STATUSES } from '../store/reducer/login'
import { selectServer, SERVER } from '../store/reducer/developerOptions'
import { setSessionToken } from '../api/api'
import Images from '@Assets/images'

const INFO_FONT_SIZE = 14
const ACTION_FONT_SIZE = 18
const PADDING = 5

const style = {
  header: {
    container: {
      padding: PADDING,
      backgroundColor: Colors.gray4
    },
    text: {
      fontSize: INFO_FONT_SIZE
    }
  },
  row: {
    container: {
      padding: PADDING
    },
    label: {
      fontSize: INFO_FONT_SIZE
    },
    value: {
      fontSize: INFO_FONT_SIZE
    },
    action: {
      fontSize: ACTION_FONT_SIZE
    }
  }
}

// Render label / value pair.
const DeveloperInfo = ({label, value, index, accessibilityLabel}) =>
  <View key={index} style={style.row.container}>
    <View style={{flexDirection: 'row'}}>
      <DefaultText style={style.row.label}>
        {label}
      </DefaultText>
      <DefaultText style={style.row.value} accessibilityLabel={accessibilityLabel}>
        {value}
      </DefaultText>
    </View>
  </View>

// Render clickable button
const DeveloperAction = ({text, onPress, disabled, index, accessibilityLabel}) =>
  <View key={index} style={style.row.container}>
    <TouchableHighlight
      onPress={() => !disabled && onPress()}
      activeOpacity={0.6}
      underlayColor={Colors.transparent}
    >
      <View>
        <DefaultText
          style={merge(style.row.action, disabled ? {opacity: 0.4} : {})}
          accessibilityLabel={accessibilityLabel}
        >
          {text}
        </DefaultText>
      </View>
    </TouchableHighlight>
  </View>

const renderSectionHeader = (sectionData, sectionID) =>
  <View key={sectionID} style={style.header.container}>
    <DefaultText style={style.row.text}>{sectionID}</DefaultText>
  </View>

const DeveloperOptions = props => {
  let infoSource = new ListView.DataSource({
    rowHasChanged: (a, b) => a.text !== b.text || a.disabled !== b.disabled,
    sectionHeaderHasChanged: (a, b) => a !== b
  })

  let actionsSource = new ListView.DataSource({
    rowHasChanged: (a, b) => a.text !== b.text || a.disabled !== b.disabled,
    sectionHeaderHasChanged: (a, b) => a !== b
  })

  const infoRows = {
    'App State': [
      { label: 'Businesses: ', value: props.store.businessCount, accessibilityLabel: 'Business Count'},
      { label: 'Business List Timestamp: ', value: `${props.store.businessTimestamp}`, accessibilityLabel: 'Business Timestamp'},
      { label: 'Transactions: ', value: props.store.transactionCount, accessibilityLabel: 'Transaction Count'},
      { label: 'Server: ', value: props.store.server, accessibilityLabel: 'Server'}
    ]
  }
  const actionRows = {
    'Developer Actions': [{
        text: 'Clear All Business Data',
        onPress: () => props.resetBusinesses(),
        accessibilityLabel: 'Clear Businesses'
      },
      {
        text: 'Load Business Data',
        onPress: () => props.loadBusinessList(),
        accessibilityLabel: 'Load Businesses'
      },
      {
        text: 'Clear All Transaction Data',
        onPress: () => props.resetTransactions(),
        disabled: props.loadingTransactions,
        accessibilityLabel: 'Clear Transactions'
      },
      {
        text: 'Load Transaction Data',
        onPress: () => props.loadTransactions(),
        disabled: props.loadingTransactions || !props.loggedIn,
        accessibilityLabel: 'Load Transactions'
      },
      {
        text: 'Switch Server To ' +
          (props.store.server === SERVER.STAGE ? 'Dev' : 'Stage'),
        onPress: () => props.selectServer(props.store.server === SERVER.STAGE ? 'DEV' : 'STAGE'),
        accessibilityLabel: 'Switch Server'
      },
      {
        text: 'Corrupt session token',
        onPress: () => setSessionToken('not a valid session token'),
        accessibilityLabel: 'Corrupt session token'
      }
    ]
  }

  infoSource = infoSource.cloneWithRowsAndSections(infoRows, Object.keys(infoRows))
  actionsSource = actionsSource.cloneWithRowsAndSections(actionRows, Object.keys(actionRows))

  return (
    <View style={{flex: 1}}>
      <View>
        <TouchableHighlight
          onPress={() => props.hideModal()}
          underlayColor={Colors.white}
          accessiblityLabel='Close Developer Options'
        >
          <Image source={Images.close} style={{margin: 20}}/>
        </TouchableHighlight>
      </View>
      <ListView
        style={{flex: 1}}
        dataSource={infoSource}
        renderRow={(accountOption, i) => <DeveloperInfo {...accountOption} index={i}/> }
        renderSectionHeader={renderSectionHeader}
        accessibilityLabel='Developer Info'
        removeClippedSubviews={false}/>
      <ListView
        style={{flex: 1}}
        dataSource={actionsSource}
        renderRow={(accountOption, i) => <DeveloperAction {...accountOption} index={i}/> }
        renderSectionHeader={renderSectionHeader}
        accessibilityLabel='Developer Actions'
        removeClippedSubviews={false}/>
    </View>
  )
}

export const onPressChangeServer = props => () => {
  props.switchBaseUrl()
  if (props.loggedIn) {
    props.logout()
  }
}

const mapStateToProps = state => ({
  store: {
    businessCount: state.business.businessList.length,
    businessTimestamp: state.business.businessListTimestamp,
    transactionCount: state.transaction.transactions.length,
    server: state.developerOptions.server
  },
  loadingTransactions: state.transaction.loadingTransactions,
  loggedIn: state.login.loginStatus === LOGIN_STATUSES.LOGGED_IN
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadTransactions,
    resetTransactions,
    resetBusinesses,
    loadBusinessList,
    hideModal,
    selectServer
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperOptions)
