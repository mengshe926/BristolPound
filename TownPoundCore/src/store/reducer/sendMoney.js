import moment from 'moment'

import { makePayment } from '../../api/payments'
import merge from '../../util/merge'
import { loadMoreTransactions, updateTransactions } from './transaction'
import { UNEXPECTED_ERROR, UNAUTHORIZED_ACCESS } from '../../api/apiError'
import { navigateToTab } from './navigation'
import { logout } from './login'

const initialState = {
  payeeId: '',
  amount: '',
  amountPaid: '',
  description: '',
  loading: false,
  success: undefined,
  message: '',
  timestamp: undefined,
  inputPage: 0,
  transactionNumber: -1,
  transactionType: undefined,
  resetClipboard: false,
  alertShouldPopUp: false
}

const Page = {
  Ready: 0,
  EnterAmount: 1,
  ConfirmAmount: 2,
  MakingPayment: 3,
  PaymentComplete: 4
}

export const resetForm = () => ({
  type: 'sendMoney/RESET_FORM'
})

export const updatePayee = (payeeId) => ({
  type: 'sendMoney/UPDATE_PAYEE',
  payeeId
})

export const updatePage = (page) => ({
  type: 'sendMoney/UPDATE_PAGE',
  page
})

export const updateAmount = (amount) => ({
  type: 'sendMoney/UPDATE_AMOUNT',
  amount
})

export const updateDescription = (description) => ({
  type: 'sendMoney/UPDATE_DESCRIPTION',
  description
})

export const returnToPayment = () => ({
  type: 'sendMoney/RETURN_TO_PAYMENT'
})

export const resetPayment = () => ({
  type: 'sendMoney/RESET_PAYMENT'
})

const setLoading = () => ({
  type: 'sendMoney/SET_LOADING'
})

const transactionComplete = (success, message, amountPaid, timestamp, transactionNumber, transactionType = null) => ({
  type: 'sendMoney/TRANSACTION_COMPLETE',
  success,
  message,
  amountPaid,
  timestamp,
  transactionNumber,
  transactionType
})

export const askToContinuePayment = (value) => ({
  type: 'sendMoney/ASK_CONTINUE_PAYMENT',
  value
})

export const sendTransaction = (username) =>
  (dispatch, getState) => {
    if (getState().sendMoney.loading) {
      return
    }
    dispatch(setLoading())
    const { amount, description } = getState().sendMoney
    makePayment({
        subject: username,
        description: description,
        amount: amount
      }, dispatch)
      .then((result) => {
        dispatch(updateTransactions())
        dispatch(updatePayee(result.toUser.id))
        dispatch(transactionComplete(true, 'Transaction complete', amount,
            moment(result.date).format('MMMM Do YYYY, h:mm:ss a'),
            result.transactionNumber, result.type.to.internalName)
        )
        dispatch(navigateToTab(0))
      })
      .catch(err => {
        if (err.type === UNAUTHORIZED_ACCESS) {
            dispatch(transactionComplete(false, 'Session expired', 0, null, null))
            dispatch(logout())
            dispatch(askToContinuePayment(true))
        } else if (err.type === UNEXPECTED_ERROR) {
          err.response.json()
            .then(json => {
              if (json && json.code === 'dailyAmountExceeded') {
                dispatch(transactionComplete(false, 'Daily amount has been exceeded.', 0, null, null))
              } else if (json && json.code === 'insufficientBalance') {
                dispatch(transactionComplete(false, 'Payment failed.', 0, null, null))
              } else {
                dispatch(transactionComplete(false, 'Error on sending transaction.', 0, null, null))
              }
            })
            .catch(() => dispatch(transactionComplete(false, 'Error on sending transaction.', 0, null, null)))
        } else {
          dispatch(transactionComplete(false, 'Error on sending transaction.', 0, null, null))
        }
      })
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'sendMoney/RESET_FORM':
      state = initialState
      break
    case 'sendMoney/RESET_PAYMENT':
      state = merge(state, {
        amount: '',
        description: '',
        amountPaid: '',
        loading: false,
        success: undefined,
        message: '',
        timestamp: undefined,
        inputPage: 0,
        transactionNumber: -1,
        transactionType: undefined,
        resetClipboard: false,
        alertShouldPopUp: false
      })
      break
    case 'sendMoney/UPDATE_PAYEE':
      state = merge(state, {
        payeeId: action.payeeId
      })
      break
    case 'sendMoney/UPDATE_AMOUNT':
      state = merge(state, {
        amount: action.amount
      })
      break
    case 'sendMoney/UPDATE_DESCRIPTION':
      state = merge(state, {
        description: action.description
      })
      break
    case 'sendMoney/SET_LOADING':
      state = merge(state, {
        loading: true
      })
      break
    case 'sendMoney/UPDATE_PAGE':
      state = merge(state, {
        inputPage: action.page,
        resetClipboard: false
      })
      break
    case 'sendMoney/TRANSACTION_COMPLETE':
      var stateToUpdate = {
        success: action.success,
        message: action.message,
        amountPaid: action.amountPaid,
        timestamp: action.timestamp,
        loading: false,
        transactionNumber: action.transactionNumber,
        transactionType: action.transactionType
      }
      if (action.message !== 'Session expired') {
        stateToUpdate.amount = ''
        stateToUpdate.description = ''
        stateToUpdate.inputPage = Page.PaymentComplete
      }
      state = merge(state, stateToUpdate)
      break
    case 'sendMoney/RETURN_TO_PAYMENT':
      state = merge(state, {
        inputPage: Page.ConfirmAmount
      })
      break
    case 'navigation/OVERLAY_VISIBLE':
    // if the user dismissed the overlay/keyboard in enter amount
    //  the input component should reset to Page Ready
      if (action.value === false && state.inputPage===Page.EnterAmount) {
        state = merge(state, {
          inputPage: Page.Ready,
          resetClipboard: true
        })
      }
      break
    case 'navigation/SHOW_MODAL':
      if (action.modalState === 'traderScreen') {
        state = merge(state, {
          inputPage: Page.Ready
        })
      }
      break
    case 'sendMoney/ASK_CONTINUE_PAYMENT':
      state = merge(state, {
        alertShouldPopUp: action.value
      })
  }
  return state
}

export default reducer
