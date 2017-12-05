import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeConfirmation } from '../store/reducer/navigation'
import { updatePage } from '../store/reducer/sendMoney'
import style from './PaymentConfirmationStyle'
import ProfileHeader from './profileScreen/ProfileHeader'
import DefaultText from './DefaultText'
import categories from '../util/categories'
import Images from '@Assets/images'
import Config from '@Config/config'

const PaymentConfirmation = (props) => {

    const priceComponents = Math.abs(props.amountPaid).toFixed(2).split('.')
    const priceBeforeDecimal = !isNaN(priceComponents[0]) ? priceComponents[0] : '-'
    const priceAfterDecimal = !isNaN(priceComponents[1]) ? priceComponents[1] : '--'
    const { payee, transactionType, category,
        transactionNumber, description, timestamp
    } = props

    const imgSrc = payee.image
          ?   payee.image.url
          :   ''

    return (
      <View style={style.container}>
        	<ScrollView contentContainerStyle={style.innerContainer}>
            <ProfileHeader
              withdrawal={transactionType === 'accesspoint'}
              name={payee.name || payee.display}
              username={payee.fields? payee.username : payee.shortDisplay}
              image={imgSrc}
              category={props.category}
              onPressClose={() => {props.closeConfirmation() && props.updatePage(0)}}
              isModal={true}
              paymentComplete={true} />
            {renderPrice(priceBeforeDecimal, priceAfterDecimal)}
            {renderDetails(transactionNumber, description, timestamp)}
          </ScrollView>
        </View>
    )
}

const renderPrice = (priceBeforeDecimal, priceAfterDecimal) =>
  <View style={style.priceContainer}>
    <View style={style.pricePoundLogoContainer}>
      <Image source={Images.shape} style={style.pricePoundLogo} />
    </View>
    <DefaultText style={style.priceBeforeDecimal}>
        {priceBeforeDecimal}
    </DefaultText>
    <DefaultText style={style.priceAfterDecimal}>
        .{priceAfterDecimal}
    </DefaultText>
  </View>

const getDateOrTime = (timestamp, index) => {
  const res = timestamp.split(',')
  return res[index]
}

const renderDetails = (transactionNumber, description, timestamp) =>
  <View style={style.detailsContainer}>
    {renderSectionHeader()}
    {renderRow('Reference:', transactionNumber, true)}
    <View style={style.separator} />
    {description.trim() != '' && renderRow('Description:', description, true)}
    {description.trim() != '' && <View style={style.separator} />}
    <View style={style.detailsInnerContainer}>
      {timestamp && renderRow('Date:', getDateOrTime(timestamp, 0), false)}
      {timestamp && renderRow('Time:', getDateOrTime(timestamp, 1), false)}
    </View>
  </View>

const renderRow = (title, data, reference) =>
  <View style={reference ? style.referenceContainer : style.rowContainer}>
    <DefaultText style={style.rowTitle}>{title}</DefaultText>
    <DefaultText style={style.rowData}>{data}</DefaultText>
  </View>

const renderSectionHeader = () =>
  <View style={style.sectionHeader.container}>
    <DefaultText style={style.sectionHeader.text}>
      Details
    </DefaultText>
  </View>

const mapStateToProps = (state) => {
  const businessPayee = state.business.businessList[state.sendMoney.payeeId]
  let category
  let payee = {}
  if (businessPayee) {
    category = categories.shop
    payee = businessPayee
  } else if (state.person.selectedPerson) {
    category = categories.person
    payee = state.person.selectedPerson
  }
  return {
    payee,
    category,
    message: state.sendMoney.message,
    amountPaid: state.sendMoney.amountPaid,
    timestamp: state.sendMoney.timestamp,
    transactionNumber: state.sendMoney.transactionNumber,
    transactionType: state.sendMoney.transactionType,
    description: state.sendMoney.description
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeConfirmation, updatePage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmation)
