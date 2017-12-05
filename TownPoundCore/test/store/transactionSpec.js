import reducer from '../../src/store/reducer/transaction'
var chai = require('chai')
var expect = chai.expect
var chaiSubset = require('chai-subset')
chai.use(chaiSubset)

const initialState = {
  	refreshing: false,
  	selectedMonthIndex: 0,
  	loadingTransactions: false,
  	transactions: [],
  	monthlyTotalSpent: [],
  	spendingListRef: null
}

describe('Transaction reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.containSubset(initialState)
	})

	it('should handle LOADING_TRANSACTIONS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'transaction/LOADING_TRANSACTIONS'
	      	})
	    ).to.containSubset({
		  	refreshing: false,
		  	selectedMonthIndex: 0,
		  	loadingTransactions: true,
		  	transactions: [],
		  	monthlyTotalSpent: [],
		  	spendingListRef: null
		})
	})

	it('should handle UPDATE_REFRESHING', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'transaction/UPDATE_REFRESHING'
	      	})
	    ).to.containSubset({
		  	refreshing: true,
		  	selectedMonthIndex: 0,
		  	loadingTransactions: false,
		  	transactions: [],
		  	monthlyTotalSpent: [],
		  	spendingListRef: null
		})
	})

	it('should handle SELECT_MONTH', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'transaction/SELECT_MONTH',
	        	monthIndex: 0
	      	})
	    ).to.containSubset(initialState)
	})

	it('should handle RESET_TRANSACTIONS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'transaction/RESET_TRANSACTIONS'
	      	})
	    ).to.containSubset(initialState)
	})

	it('should handle FAILED_TO_LOAD', () => {
	    expect(
	      	reducer({
			  	refreshing: true,
			  	selectedMonthIndex: 0,
			  	loadingTransactions: true,
			  	transactions: [],
			  	monthlyTotalSpent: [],
		  		spendingListRef: null
			}, {
	        	type: 'transaction/FAILED_TO_LOAD'
	      	})
	    ).to.containSubset(initialState)
	})

	it('should handle REGISTER_SPENDING_LIST', () => {
		expect(
			reducer(initialState, {
				type: 'transaction/REGISTER_SPENDING_LIST',
				ref: 'spending-list'
			})
		).to.containSubset({
			spendingListRef: 'spending-list'
		})
	})
})
