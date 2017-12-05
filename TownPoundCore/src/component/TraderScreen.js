import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Dimensions, ScrollView } from 'react-native'
import TransactionList from './profileScreen/TransactionList'
import ProfileHeader from './profileScreen/ProfileHeader'
import BusinessDetails from './businessDetails/BusinessDetails'
import { sectionHeight } from '../util/StyleUtils'
import { resetForm } from '../store/reducer/sendMoney'
import { goToLocation, hideModal, closeConfirmation } from '../store/reducer/navigation'
import { isIncorrectLocation } from '../util/business'
import { resetTraderScreen } from '../store/reducer/business'
import DefaultText from './DefaultText'
import categories from '../util/categories'

import merge from '../util/merge'

// empty defaultText is needed so the transaction list doesn't disappear on expand details
const TraderScreen = (props) => {
  let goToTraderLocation
  let location = props.trader.address.location ? props.trader.address.location : undefined
  if (location && !isIncorrectLocation(location)) {
    goToTraderLocation = () => {
      const region = merge(location, { latitudeDelta: 0.006, longitudeDelta: 0.006 })
      props.goToLocation(region)
    }
  }

  return (
      <View style={{maxHeight: Dimensions.get('window').height - sectionHeight}}>
      <ScrollView>
        <ProfileHeader
            name={props.trader.name || ''}
            username={props.trader.fields.username}
            image={props.trader.image.url}
            category={categories.shop}
            address={props.trader.address}
            onPressClose={() => {props.hideModal(); props.closeConfirmation(); props.resetForm(); props.resetTraderScreen()}}
            isModal={true}
            showMap={props.modalOpen}
            goToTraderLocation={() => goToTraderLocation()}/>
        <BusinessDetails business={props.trader} goToTraderLocation={() => goToTraderLocation()}/>
        <DefaultText style={{height: 0}}></DefaultText>
        <TransactionList
          listData={props.transactions} />
        </ScrollView>
      </View>
  )
}


const getTransactionsForSelectedBusiness = (state) => {
  return state.transaction.transactions.filter(transaction => {
    return transaction.relatedAccount.kind === 'user' && transaction.relatedAccount.user.id === state.business.traderScreenBusinessId
  })
}

// Redux Setup
const mapStateToProps = (state) => ({
    trader: state.business.businessList[state.business.traderScreenBusinessId] || {},
    transactions: getTransactionsForSelectedBusiness(state),
    modalOpen: state.navigation.modalOpen
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ hideModal, resetForm, goToLocation, closeConfirmation, resetTraderScreen }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TraderScreen)
