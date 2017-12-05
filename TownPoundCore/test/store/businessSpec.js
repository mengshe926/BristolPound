import reducer, { MapViewport } from '../../src/store/reducer/business'
var chai = require('chai')
var expect = chai.expect
var chaiSubset = require('chai-subset')
chai.use(chaiSubset)

const initialState = {
	activeFilters: [],
  	businessList: [],
	categories: [],
  	businessListTimestamp: null,
  	selectedBusinessId: undefined,
  	closestBusinesses: [],
  	filteredBusinesses: [],
  	mapViewport: MapViewport,
	forceRegion: MapViewport,
	tabMode: 'default',
	traderScreenBusinessId: undefined,
  	traderScreenBusiness: undefined,
	geolocationStatus: null,
	businessListRef: null
}

describe('Business reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal(initialState)
	  })

	it('should handle BUSINESS_LIST_RECEIVED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/BUSINESS_LIST_RECEIVED',
	        	businessList: []
	      	})
	    ).to.containSubset({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null
		})
	})

	it('should handle SELECTED_BUSINESS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/SELECTED_BUSINESS',
	        	businessId: 0
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: 0,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null
		})
	})

	it('should handle SELECT_CLOSEST_BUSINESS', () => {
	    expect(
	      	reducer({
				activeFilters: [],
			  	businessList: [],
				categories: [],
			  	businessListTimestamp: null,
			  	selectedBusinessId: 0,
			  	closestBusinesses: [{id: 1}, {id: 4}],
  				filteredBusinesses: [],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
		  		tabMode: 'default',
			  	traderScreenBusinessId: undefined,
  				traderScreenBusiness: undefined,
			  	geolocationStatus: null,
			  	businessListRef: null
			}, {
	        	type: 'business/SELECT_CLOSEST_BUSINESS'
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: 1,
		  	closestBusinesses: [{id: 1}, {id: 4}],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null
		})
	})

	it('should handle RESET_BUSINESSES', () => {
	    expect(
	      	reducer({
				activeFilters: [],
			  	businessList: [{id: 0}, {id: 1}],
				categories: [],
			  	businessListTimestamp: null,
			  	selectedBusinessId: undefined,
			  	closestBusinesses: [{id: 1}, {id: 4}],
  				filteredBusinesses: [],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
		  		tabMode: 'default',
			  	traderScreenBusinessId: 4,
  				traderScreenBusiness: {name: 'business'},
			  	geolocationStatus: null,
			  	businessListRef: null
			}, {
	        	type: 'business/RESET_BUSINESSES'
	      	})
	    ).to.deep.equal(initialState)
	})

	it('should handle SET_TRADER_SCREEN_ID', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/SET_TRADER_SCREEN_ID',
	        	id: 1
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: 1,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null
		})
	})

	it('should handle UPDATE_TAB_MODE', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/UPDATE_TAB_MODE',
	        	mode: 'search'
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'search',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: null
		})
	})

	it('should handle GEOLOCATION_FAILED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/GEOLOCATION_FAILED'
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: false,
		  	businessListRef: null
		})
	})

	it('should handle GEOLOCATION_SUCCESS', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/GEOLOCATION_SUCCESS',
	        	location: 'here'
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: 'here',
		  	businessListRef: null
		})
	})

	it('should handle REGISTER_BUSINESS_LIST', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'business/REGISTER_BUSINESS_LIST',
	        	ref: 'here'
	      	})
	    ).to.deep.equal({
			activeFilters: [],
		  	businessList: [],
			categories: [],
		  	businessListTimestamp: null,
		  	selectedBusinessId: undefined,
		  	closestBusinesses: [],
  			filteredBusinesses: [],
		  	mapViewport: MapViewport,
		  	forceRegion: MapViewport,
		  	tabMode: 'default',
		  	traderScreenBusinessId: undefined,
  			traderScreenBusiness: undefined,
		  	geolocationStatus: null,
		  	businessListRef: 'here'
		})
	})

	it('should handle navigation/NAVIGATE_TO_TAB', () => {
	    expect(
	      	reducer({
				activeFilters: [],
			  	businessList: [],
				categories: [],
			  	businessListTimestamp: null,
			  	selectedBusinessId: undefined,
			  	closestBusinesses: [],
  				filteredBusinesses: [],
			  	mapViewport: MapViewport,
			  	forceRegion: MapViewport,
			  	tabMode: 'search',
			  	traderScreenBusinessId: undefined,
  				traderScreenBusiness: undefined,
			  	geolocationStatus: null,
			  	businessListRef: null
			}, {
	        	type: 'navigation/NAVIGATE_TO_TAB'
	      	})
	    ).to.deep.equal(initialState)
	})
})
