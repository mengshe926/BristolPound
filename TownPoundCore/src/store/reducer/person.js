import merge from '../../util/merge'
import { getPaymentData } from '../../api/payments'
import { showModal, modalState } from './navigation'
import { updatePayee } from './sendMoney'

const initialState = {
  selectedPerson: undefined
}

const paymentDataReceived = (result) => ({
  type: 'person/PAYMENT_DATA',
  data: result
})

export const openPersonModal = (user) => (dispatch, getState) => {
  dispatch(selectPerson(user))
  getPaymentData(user.id, dispatch)
    .then(result => dispatch(paymentDataReceived(result)))
  dispatch(showModal(modalState.personScreen))
  dispatch(updatePayee(user.id))
}

const selectPerson = (person) => ({
  type: 'person/SELECT_PERSON',
  person
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'person/SELECT_PERSON':
      state = merge(state, {
        selectedPerson: action.person
      })
      break
    case 'person/PAYMENT_DATA':
      var updatedPerson = state.selectedPerson
      updatedPerson.paymentTypes = action.data.paymentTypes
      state = merge(state, {
        selectedPerson: updatedPerson
      })
      break
  }
  return state
}

export default reducer
