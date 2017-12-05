import React from 'react'
import animateTo from '../../util/animateTo'
import Price from '../Price'
import commonStyle from '../style'
import Colors from '@Colors/colors'
import Config from '@Config/config'
import DefaultText from '../DefaultText'
import merge from '../../util/merge'
import KeyboardComponent from '../KeyboardComponent'
import { View, TextInput, TouchableOpacity, TouchableHighlight, Animated, Image } from 'react-native'
import styles from './InputComponentStyle'
import Images from '@Assets/images'
import Drawer from 'react-native-drawer'

export const labels = {
    AMOUNT: 'Amount',
    CASH_ONLY_BUSINESS: Config.CASH_ONLY_TEXT,
    CONFIRM: 'Confirm',
    CONFIRM_WITHDRAWAL: 'Confirm Withdrawal',
    CURRENT_BALANCE: 'CURRENT BALANCE',
    DESCRIPTION: 'Description (optional)',
    ENTER_AMOUNT: 'Enter Amount',
    LOGIN_FOR_PAYMENT: 'Log in to make payment',
    LOGIN_TO_WITHDRAW: 'Log in to withdraw cash',
    MAKING_PAYMENT: 'Making Payment',
    MAKING_WITHDRAWAL: 'Withdrawing',
    NO_PAYMENT_AVAILABLE: 'No payment available',
    PAY: 'Pay',
    PAYMENT_COMPLETE: 'Payment complete',
    PIN: 'PIN',
    SEND_PAYMENT: 'Send Payment',
    USING_TXT2PAY: 'No internet connection (Using TXT2PAY)',
    WITHDRAW: 'Withdraw',
    WITHDRAW_CASH: 'Withdraw Cash'
}

const DRAWER_PROTRUSION = 44 + 50

const BalanceMessage = ({ balance }) => {
  return (
    <View style={styles.balanceContainer}>
      <DefaultText style={commonStyle.sectionHeader.text}>{labels.CURRENT_BALANCE}</DefaultText>
      <View style={styles.priceContainer}>
        <Image source={Images.balanceSymbol}/>
        <Price prefix=''
            price={balance}
            size={30}
            color={Colors.primaryBlue}/>
      </View>
    </View>
  )
}

class InputComponent extends KeyboardComponent {
  constructor(props) {
    super(props)
    this.state.withdrawing = false
  }

  getButtonColor (withdraw = false) {
    if (this.props.invalidInput || this.props.buttonText === labels.NO_PAYMENT_AVAILABLE) {
      return Colors.offWhite
    }
    else if (this.props.buttonText === labels.CASH_ONLY_BUSINESS) {
      return Colors.secondaryBlue
    }

    if (withdraw) {
      return Colors.orange
    }
    return Colors.primaryBlue
  }


  getButtonTextColor () {
    return this.getButtonColor() === Colors.offWhite ? 'black' : 'white'
  }

  componentWillUpdate(nextProps) {
    if (nextProps.accessibilityLabel !== labels.ENTER_AMOUNT) {
      animateTo(this.state.keyboardHeight, 0, 50)
    }

  }

  render () {
    let {
      onButtonPress,
      onWithdrawPress,
      buttonText,
      input,
      cashpoint,
      descriptionInput,
      pinInput,
      invalidInput,
      accessibilityLabel,
      balance,
      amount,
      description,
      onChangeAmount,
      optionalWithdraw,
      payee,
      offlinePaymentLabel,
      withdrawText
    } = this.props

    const button = <View style={merge(styles.button, { backgroundColor: this.getButtonColor() })}>
      <DefaultText style={merge(styles.buttonText, { color: this.getButtonTextColor() })}>
        {buttonText}
      </DefaultText>
      {offlinePaymentLabel &&
        <DefaultText style={styles.noInternetMessage}>
          {offlinePaymentLabel}
        </DefaultText>}
    </View>

    const withdrawButton = <View style={merge(styles.button, { backgroundColor: this.getButtonColor(true)})}>
      <DefaultText style={merge(styles.buttonText, { color: this.getButtonTextColor() })}>
        {withdrawText}
      </DefaultText>
      {offlinePaymentLabel &&
        <DefaultText style={styles.noInternetMessage}>
          {offlinePaymentLabel}
        </DefaultText>}
    </View>

    const withdrawOverlay = <View style={merge(styles.button, { backgroundColor: this.getButtonColor(true)})}>
      <View style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Image source={Images.cashpointTransparent} style={{marginLeft: 20, marginRight: 30}}/>
        <DefaultText style={merge(styles.buttonText, {textAlign: 'left', color: this.getButtonTextColor() })}>
          {withdrawText}
        </DefaultText>
      </View>
    </View>

    const startWithdrawal = () => {
      this.setState({withdrawing: true})
      onButtonPress()
    }

    const startNormal = () => {
      this.setState({withdrawing: false})
      onButtonPress()
    }

    const optionalDrawer = <View style={styles.cashpointDrawer}>
        <Drawer
            type={'overlay'}
            captureGestures={true}
            tapToClose={true}
            closedDrawerOffset={DRAWER_PROTRUSION}
            openDrawerOffset={DRAWER_PROTRUSION}
            styles={{drawer: styles.withdrawButtonOverlay}}
            side={'right'}
            acceptTap={true}
            negotiatePan={true}
            content={
              <TouchableHighlight underlayColor='white' onPress={invalidInput ? undefined : startWithdrawal}>
                  {withdrawOverlay}
              </TouchableHighlight>
              }>
            <TouchableOpacity onPress={invalidInput ? undefined : startNormal}>
              {button}
            </TouchableOpacity>

        </Drawer>
    </View>




    return (
          <Animated.View style={{backgroundColor: 'white', bottom: this.state.keyboardHeight }} accessibilityLabel={accessibilityLabel}>

          {cashpoint && optionalWithdraw && this.props.buttonText !== labels.NO_PAYMENT_AVAILABLE
            ?   optionalDrawer
            :   this.state.withdrawing
                ?   <TouchableOpacity onPress={invalidInput ? undefined : (onWithdrawPress || onButtonPress)}>
                      {withdrawButton}
                    </TouchableOpacity>
                :   <TouchableOpacity onPress={invalidInput ? undefined : onButtonPress}>
                      {button}
                    </TouchableOpacity>
          }


          {input
            ? <View>
                <TextInput style={styles.textInput}
                    {...input}
                    autoFocus={true}
                    underlineColorAndroid={Colors.transparent}
                    accessibilityLabel={input.placeholder} />
                <View style={styles.separator}/>
                {pinInput
                  ? <TextInput style={styles.textInput}
                      {...pinInput}
                      underlineColorAndroid={Colors.transparent}
                      accessibilityLabel={pinInput.placeholder} />
                  : !this.state.withdrawing &&
                    <TextInput style={styles.textInput}
                      {...descriptionInput}
                      underlineColorAndroid={Colors.transparent}
                      accessibilityLabel={descriptionInput.placeholder}
                    />
                }
                <BalanceMessage balance={balance}/>
              </View>
            : undefined}

          {amount
            ? <TouchableOpacity onPress={onChangeAmount}>
                <View style={styles.confirmContainer}>
                  <View style={styles.confirmPayeeContainer}>
                    <DefaultText style={styles.confirmPayeeText}>
                      {payee}
                    </DefaultText>
                  </View>
                  {description.trim() != "" &&
                  <View style={styles.confirmDescriptionContainer}>
                    <DefaultText style={styles.confirmDescriptionText}>
                      {description}
                    </DefaultText>
                  </View>}
                  <View style={styles.confirmAmountContainer}>
                    <Image source={Images.balanceSymbol}/>
                    <Price prefix=''
                        price={amount}
                        size={24}
                        color={'black'}/>
                  </View>
                </View>
              </TouchableOpacity>
              : undefined
          }

        </Animated.View>
      )

  }
}

export default InputComponent
