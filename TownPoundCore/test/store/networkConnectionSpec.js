import reducer from '../../src/store/reducer/networkConnection'
var expect = require('chai').expect

const initialState = {
  	status: true,
  	failedActionsQueue: []
}

describe('NetworkConnection reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal(initialState)
	  })

	it('should handle CONNECTION_CHANGED', () => {
	    expect(
	      	reducer([], {
	        	type: 'networkConnection/CONNECTION_CHANGED',
	        	status: true
	      	})
	    ).to.deep.equal({
		  	status: true,
		  	failedActionsQueue: []
		})
	})

	it('should handle ACTION_FAILED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'networkConnection/ACTION_FAILED',
	        	failedAction: {type: 'Select person'}
	      	})
	    ).to.containSubset({
		  	failedActionsQueue: [{type: 'Select person'}]
		})
	})
})
