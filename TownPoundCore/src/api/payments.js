import { get, post } from './api'

export const makePayment = (payment, dispatch) =>
  get('self/payments/data-for-perform', {
      to: payment.subject,
      fields: 'paymentTypes.id',
      requiresAuthorisation: true
  }, dispatch)
  .then((results) => post('self/payments', {
      ...payment,
      type: results.paymentTypes[0].id,
      requiresAuthorisation: true
    }, dispatch))

export const getPaymentData = (id, dispatch) =>
  get('self/payments/data-for-perform', {
      to: id,
      fields: 'paymentTypes.id',
      requiresAuthorisation: true
  }, dispatch)
