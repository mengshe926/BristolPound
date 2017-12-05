import React from 'react'
import { View, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideModal, closeConfirmation } from '../store/reducer/navigation'
import ProfileHeader from './profileScreen/ProfileHeader'
import TransactionList from './profileScreen/TransactionList'
import { resetForm } from '../store/reducer/sendMoney'
import { sectionHeight } from '../util/StyleUtils'
import categories from '../util/categories'

const PersonScreen = (props) =>
  <View style={{flex: 1}}>
    <View style={{flex: 1, maxHeight: Dimensions.get('window').height - sectionHeight}}>
    <ScrollView>
      <ProfileHeader
        name={props.person.display}
        username={props.person.shortDisplay}
        image={props.person.image}
        category={categories.person}
        onPressClose={() => {props.hideModal(); props.closeConfirmation(); props.resetForm()}}
        isModal={true} />
      <TransactionList
        listData={props.transactions} />
      </ScrollView>
    </View>
  </View>


// filter the transaction list to contain only those relating to this person
const getTransactionsForSelectedPerson = (state) => {
  return state.transaction.transactions.filter(transaction => {
    return transaction.relatedAccount.kind === 'user' && transaction.relatedAccount.user.id === state.person.selectedPerson.id
  })
}


const mapStateToProps = (state) => ({
  person: state.person.selectedPerson,
  transactions: getTransactionsForSelectedPerson(state)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ hideModal, resetForm, closeConfirmation }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PersonScreen)
