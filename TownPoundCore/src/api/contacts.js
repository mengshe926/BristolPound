import { get, post } from './api'

// person can be an id or a username
// 1. add contact
// 2. get updated contact list
export const addContact = (person, dispatch) =>
  post('self/contacts/' + person, { requiresAuthorisation: true }, dispatch, 200)
	.then(() => get('self/contacts', { requiresAuthorisation: true }, dispatch))
