import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ListView, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import moment from 'moment'
import SpendingHeader from './SpendingHeader'
import DefaultText, { MultilineText } from '../DefaultText'
import Colors from '@Colors/colors'
import * as actions from '../../store/reducer/transaction'
import { openDetailsModal } from '../../store/reducer/navigation'
import styles from './spendingStyle'
import TransactionRow from './TransactionRow'

const renderSeparator = (sectionID, rowID) =>
  <View style={styles.separator} key={`sep:${sectionID}:${rowID}`}/>

const renderSectionHeader = (sectionData, sectionID) =>
  <View style={styles.sectionHeader.container} key={sectionID}>
    <DefaultText style={styles.sectionHeader.text}>
      {moment(sectionData[0].date).format('D MMMM YYYY').toUpperCase()}
    </DefaultText>
  </View>

const getTransactionImage = (user, businessList) => {
  if (user) {
    const userDetails = businessList[user.id]
    image = userDetails ? userDetails.image.url : undefined
    if (image) {
      return { uri: image }
    } else if (user.image && user.image.url) {
      /*
      if it's an individual to individual transaction,
      the user details are received in the user object
      */
      return { uri: user.image.url }
    }
  }
}

const getUserCategory = (user, businessList) => {
  if (user) {
    return businessList[user.id] ? 'shop' : 'person'
  } else {
    return 'system'
  }
}

const renderRow = (transaction, openDetailsModal, businessList, tabIndex, modalState) => {
    const transactionProps = {
        transaction: transaction,
        openDetailsModal: openDetailsModal,
        businessList: businessList,
        getTransactionImage: getTransactionImage,
        getUserCategory: getUserCategory
    }

    return <TransactionRow {...transactionProps}/>
}


class SpendingTab extends React.Component {
  render() {
    let bodyComponent
    const props = this.props
    const dataSource = props.transactionsDataSource
    if (props.loadingTransactions) {
      bodyComponent = <ActivityIndicator size='large' style={styles.loadingIndicator}/>
    } else if (dataSource.getRowCount()) {
      bodyComponent = <ListView
          ref={this.props.registerSpengingList}
          style={{ backgroundColor: Colors.offWhite, marginTop: 106 }}
          tabLabel='Transactions'
          decelerationRate='fast'
          renderSeparator={renderSeparator}
          initialListSize={15}
          enableEmptySections={true}
          renderRow={transaction => renderRow(transaction, props.openDetailsModal, props.businessList)}
          dataSource={dataSource}
          renderSectionHeader={renderSectionHeader}
          refreshControl={props.selectedMonthIndex === props.monthlyTotalSpent.length - 1
            ? <RefreshControl
                  refreshing={props.refreshing}
                  onRefresh={() => !props.refreshing ? props.loadMoreTransactions() : undefined} />
            : undefined
          }
          removeClippedSubviews={false}/>
    } else {
      bodyComponent =
        <TouchableOpacity style={styles.noTransactions.outerContainer} onPress={() => !props.refreshing && props.selectedMonthIndex === 0 ? props.loadMoreTransactions() : undefined}>
          <View style={styles.noTransactions.container}>
            <MultilineText style={styles.noTransactions.text}>You have made no transactions this month</MultilineText>
            {props.selectedMonthIndex === 0 ? <DefaultText style={{ ...styles.noTransactions.text, marginTop: 20 }}>Tap to refresh</DefaultText> : undefined}
          </View>
        </TouchableOpacity>
    }

    return (
      <View style={{flex: 1}}>
        {bodyComponent}
        <View style={styles.header.carouselContainer}>
          <SpendingHeader
            selectMonth={(index) => this.props.selectMonth(index) }
            monthlyTotalSpent={this.props.monthlyTotalSpent}
            selectedMonthIndex={this.props.selectedMonthIndex}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.transaction,
  businessList: state.business.businessList
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    ...actions, openDetailsModal
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SpendingTab)
