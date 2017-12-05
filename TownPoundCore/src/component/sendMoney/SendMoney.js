import React from 'react'
import { bindActionCreators } from 'redux'
import Communications from 'react-native-communications'
import { connect } from 'react-redux'
import { Clipboard } from 'react-native'
import * as actions from '../../store/reducer/sendMoney'
import { openLoginForm, LOGIN_STATUSES } from '../../store/reducer/login'
import { setOverlayOpen, closeConfirmation } from '../../store/reducer/navigation'
import InputComponent, { labels } from './InputComponent'
import Config from '@Config/config'

const Page = {
  Ready: 0,
  EnterAmount: 1,
  ConfirmAmount: 2,
  MakingPayment: 3,
  PaymentComplete: 4
}

let tempClipboardString = ''

class SendMoney extends React.Component {

  constructor () {
    super()
    this.state = {
      pin: ''
    }
  }

  setClipboardContent = async () => {
    try {
      tempClipboardString = await Clipboard.getString()
    } catch (e) {
    } finally {
      Clipboard.setString('')
    }
  }

  nextPage () {
    const nextPage = (this.props.inputPage + 1) % Object.keys(Page).length
    this.props.updatePage(nextPage)
    if (nextPage === Page.EnterAmount) {
      this.setClipboardContent()
    } else if (nextPage === Page.MakingPayment) {
      Clipboard.setString(tempClipboardString)
    }
  }

  prevPage () {
    this.props.updatePage(Page.EnterAmount)
  }

  componentDidUpdate (prevProps) {
    if (this.props.payeeId !== prevProps.payeeId) {
      this.props.updateAmount('')
      this.props.updatePage(Page.Ready)
    } else if (prevProps.loading && !this.props.loading && this.props.inputPage === Page.MakingPayment) {
      this.nextPage()
    } else if (prevProps.inputPage === Page.MakingPayment
      && this.props.inputPage === Page.PaymentComplete
      && !this.props.success) {
      setTimeout(() => this.props.inputPage === Page.PaymentComplete && this.nextPage(), 1800)
    }
  }

  isPinInvalid () {
    const { pin } = this.state
    return !this.props.connection && (pin.length < 4 || pin.indexOf('.') !== -1)
  }

  isInputInvalid () {
    const { amount } = this.props
    return (
      isNaN(Number(this.props.amount))
        || Number(amount) > this.props.balance
        || Number(amount) <= 0
        || (amount.charAt(0) === '0' && amount.charAt(1) !== '.')
        || amount.charAt(amount.length - 1) === '.'
        || (amount.split('.')[1] && amount.split('.')[1].length > 2)
        || this.isPinInvalid()
    )
  }

  payByTextOnPress (withdrawing) {
    var action = withdrawing
      ? Config.TXT2PAY_ACTION_WITHDRAW
      : Config.TXT2PAY_ACTION_PAY
    const usernameToPay = withdrawing
      ? this.props.payee.fields.cashpointUsername
      : (this.props.payee.shortDisplay || this.props.payee.fields.username)
    const text = Config.TXT2PAY_TEMPLATE
        .replace('{ACTION}', action)
        .replace('{PIN}', this.state.pin)
        .replace('{PAYEE}', usernameToPay)
        .replace('{AMOUNT}', this.props.amount)
    Communications.textWithoutEncoding(Config.TXT2PAY_NO, text)
    this.props.updateAmount('')
    this.setState({pin: ''})
    this.props.updatePage(Page.Ready)
    this.props.setOverlayOpen(false)
  }

  render () {
    let inputProps
    const { payee, payeeShortDisplay } = this.props

    if (this.props.resetClipboard) {
      Clipboard.setString(tempClipboardString)
    }

    if (this.props.inputPage === Page.PaymentComplete) {
      inputProps = {
        buttonText: this.props.message,
        withdrawText: this.props.message,
        onButtonPress: () => {this.props.closeConfirmation() && this.props.updatePage(0)},
        accessibilityLabel: labels.PAYMENT_COMPLETE
      }
    }
    else if (!payeeShortDisplay) {
      inputProps = {
        buttonText: labels.CASH_ONLY_BUSINESS,
        onButtonPress: () => {},
        accessibilityLabel: labels.CASH_ONLY_BUSINESS
      }
    }
    else if (this.props.loggedIn) {
      switch (this.props.inputPage) {
        case Page.Ready: // Initial state, ready to begin
        // sometimes when pressing on the 'no' on the alert triggers the onPress here
        //-> hence the !this.props.alertShouldPopUp check
          inputProps = {
            buttonText: labels.NO_PAYMENT_AVAILABLE,
            withdrawText: labels.NO_PAYMENT_AVAILABLE,
            onButtonPress: () => {},
            accessibilityLabel: labels.NO_PAYMENT_AVAILABLE,
            optionalWithdraw: true
          }
          if (this.props.paymentTypes && this.props.paymentTypes.length > 0 ) {
            inputProps.buttonText = labels.SEND_PAYMENT
            inputProps.withdrawText = labels.WITHDRAW_CASH
            inputProps.onButtonPress = () => { !this.props.alertShouldPopUp && this.nextPage() }
          }
          break
        case Page.EnterAmount: // provide amount
          inputProps = {
            buttonText: labels.PAY + ' ' + (payee.display || payee.name || ""),
            withdrawText: labels.WITHDRAW,
            onButtonPress: () => { this.nextPage() },
            input: {
              keyboardType: 'numeric',
              value: this.props.amount,
              placeholder: labels.AMOUNT,
              onChangeText: amt => this.props.updateAmount(amt)
            },
            descriptionInput: {
              keyboardType: 'default',
              value: this.props.description,
              placeholder: labels.DESCRIPTION,
              maxLength: 100,
              onChangeText: desc => this.props.updateDescription(desc)
            },
            invalidInput: this.isInputInvalid(),
            accessibilityLabel: 'Enter Amount',
            balance: this.props.balance
          }
          if (!this.props.connection) {
            inputProps.offlinePaymentLabel = labels.USING_TXT2PAY
            inputProps.onButtonPress = () => { this.payByTextOnPress(false) }
            inputProps.onWithdrawPress = () => { this.payByTextOnPress(true)}
            inputProps.pinInput = {
              keyboardType: 'numeric',
              value: this.state.pin,
              placeholder: labels.PIN,
              maxLength: 4,
              onChangeText: pin => this.setState({pin: pin})
            }
          }
          break
        case Page.ConfirmAmount: // provide amount
          inputProps = {
            buttonText: labels.CONFIRM,
            withdrawText: labels.CONFIRM_WITHDRAWAL,
            onButtonPress: () => { this.props.sendTransaction(payeeShortDisplay); this.nextPage() },
            onWithdrawPress: () => {this.props.sendTransaction(payee.fields.cashpointUsername); this.nextPage() },
            amount: this.props.amount,
            payee: payee.display || payee.name || "",
            description: this.props.description,
            onChangeAmount: () => { this.prevPage() },
            accessibilityLabel: labels.CONFIRM
          }
          if (!this.props.connection) {
            inputProps.offlinePaymentLabel = labels.USING_TXT2PAY
            inputProps.onButtonPress = () => { this.prevPage() }
            inputProps.pinInput = {
              keyboardType: 'numeric',
              value: this.state.pin,
              placeholder: labels.PIN,
              maxLength: 4,
              onChangeText: pin => this.setState({pin: pin})
            }
          }
          break
        case Page.MakingPayment: // in progress
          inputProps = {
            buttonText: labels.MAKING_PAYMENT,
            withdrawText: labels.MAKING_WITHDRAWAL,
            loading: true,
            accessibilityLabel: labels.MAKING_PAYMENT
          }
          break
      }
    } else {
      inputProps = {
        buttonText: labels.LOGIN_FOR_PAYMENT,
        withdrawText: labels.LOGIN_TO_WITHDRAW,
        onButtonPress: () => this.props.openLoginForm(true),
        accessibilityLabel: labels.LOGIN_FOR_PAYMENT
      }
    }

    let cashpoint = payee.fields
      ? payee.fields.cashpointUsername
      : null

    return <InputComponent {...inputProps} setOverlayOpen={this.props.setOverlayOpen} cashpoint={cashpoint} />
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...actions, openLoginForm, setOverlayOpen, closeConfirmation }, dispatch)

const mapStateToProps = (state) => {
  const payee = state.business.traderScreenBusiness || state.person.selectedPerson || {}
  const payeeShortDisplay = state.business.traderScreenBusinessId
        ? state.business.businessList[state.business.traderScreenBusinessId].fields.username
        : state.person.selectedPerson
          ? state.person.selectedPerson.shortDisplay
          : ''
  const paymentTypes = payee && payee.paymentTypes || undefined

  return {
    ...state.sendMoney,
    payee,
    payeeShortDisplay,
    paymentTypes,
    balance: state.account.balance,
    loggedIn: state.login.loginStatus === LOGIN_STATUSES.LOGGED_IN,
    connection: state.networkConnection.status
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney)
