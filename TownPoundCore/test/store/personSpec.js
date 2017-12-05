import reducer from '../../src/store/reducer/person'
var expect = require('chai').expect

describe('Person reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal( {selectedPerson: undefined} )
	})

	it('should handle SELECT_PERSON', () => {
	    expect(
	      	reducer([], {
	        	type: 'person/SELECT_PERSON',
	        	person: {'name': 'Bob'}
	      	})
	    ).to.deep.equal( {selectedPerson: {'name': 'Bob'}} )
	})

	it('should handle changing SELECT_PERSON', () => {
	    expect(
	      	reducer({selectedPerson: {'name': 'Bob'}}, {
	        	type: 'person/SELECT_PERSON',
	        	person: {'name': 'Alice'}
	      	})
	    ).to.deep.equal( {selectedPerson: {'name': 'Alice'}} )
	})
})
