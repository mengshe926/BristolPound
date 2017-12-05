import reducer from '../../src/store/reducer/account'
var expect = require('chai').expect

const initialState = {
  loadingBalance: true,
  loadingDetails: true,
  balance: undefined,
  details: {}
}

describe('Account reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal(initialState)
	  })

	it('should handle ACCOUNT_BALANCE', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'account/ACCOUNT_BALANCE',
	        	account: [{'status': {'balance': 200}}]
	      	})
	    ).to.deep.equal({
		  	loadingBalance: false,
		  	loadingDetails: true,
		  	balance: 200,
		  	details: {}
		})
	})

	it('should handle ACCOUNT_DETAILS_RECEIVED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'account/ACCOUNT_DETAILS_RECEIVED',
	        	details: 'These are the account details'
	      	})
	    ).to.deep.equal({
		  	loadingBalance: true,
		  	loadingDetails: false,
		  	balance: undefined,
		  	details: 'These are the account details'
		})
	})

	it('should handle RESET', () => {
	    expect(
	      	reducer({
			  	loadingBalance: false,
			  	loadingDetails: false,
			  	balance: 200,
			  	details: 'These are the account details'
			}, {
	        	type: 'account/RESET'
	      	})
	    ).to.deep.equal(initialState)
	})
})
