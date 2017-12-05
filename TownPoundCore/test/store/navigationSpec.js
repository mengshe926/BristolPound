import reducer from '../../src/store/reducer/navigation'
var expect = require('chai').expect

const modalState = {
  none: 'none',
  traderScreen: 'traderScreen',
  personScreen: 'personScreen',
  developerOptions: 'developerOptions'
}

const mainComponent = {
  onboarding: 'onboarding',
  returningLogin: 'returningLogin',
  tabs: 'tabs'
}

const initialState = {
  tabIndex: 0,
  modalState: modalState.none,
  mainComponent: mainComponent.onboarding,
  overlayVisible: false,
  stateInitialised: false,
  modalVisible: false,
  modalOpen: false,
  confirmationOpen: false,
  coverApp: false
}

describe('Navigation reducer', () => {

	it('should return the initial state', () => {
	    expect(
	      	reducer(undefined, {})
	    ).to.deep.equal(initialState)
	})

	it('should handle NAVIGATE_TO_TAB', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/NAVIGATE_TO_TAB',
	        	tabIndex: 1
	      	})
	    ).to.deep.equal({
		  	tabIndex: 1,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle SHOW_MODAL', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/SHOW_MODAL',
	        	modalState: modalState.traderScreen
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.traderScreen,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: true,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle HIDE_MODAL', () => {
	    expect(
	      	reducer({
			  	tabIndex: 0,
			  	modalState: modalState.traderScreen,
			  	mainComponent: mainComponent.onboarding,
			  	overlayVisible: false,
			  	stateInitialised: false,
			  	modalVisible: true,
			  	modalOpen: true,
			  	confirmationOpen: false
			}, {
	        	type: 'navigation/HIDE_MODAL'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false
		})
	})

	it('should handle login/LOGGED_IN', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'login/LOGGED_IN'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.tabs,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle login/LOGGED_OUT', () => {
	    expect(
	      	reducer({
          tabIndex: 0,
          modalState: modalState.none,
          mainComponent: mainComponent.tabs,
          overlayVisible: false,
          stateInitialised: false,
          modalVisible: false,
          modalOpen: false,
          confirmationOpen: false,
          coverApp: false
        }, {
	        	type: 'login/LOGGED_OUT'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.tabs,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle SELECT_MAIN_COMPONENT', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/SELECT_MAIN_COMPONENT',
	        	componentName: mainComponent.returningLogin
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.returningLogin,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle STATE_INITIALIZED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/STATE_INITIALIZED'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: true,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
 		 	coverApp: false
		})
	})

	it('should handle sendMoney/TRANSACTION_COMPLETE', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'sendMoney/TRANSACTION_COMPLETE',
	        	success: true
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: true,
  			coverApp: false
		})
	})

	it('should handle login/LOGIN_IN_PROGRESS', () => {
	    expect(
	      	reducer({
			  	tabIndex: 0,
			  	modalState: modalState.none,
			  	mainComponent: mainComponent.onboarding,
			  	overlayVisible: true,
			  	stateInitialised: false,
			  	modalVisible: false,
			  	modalOpen: false,
			  	confirmationOpen: false
			}, {
	        	type: 'login/LOGIN_IN_PROGRESS'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false
		})
	})

	it('should handle login/OPEN_LOGIN_FORM', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'login/OPEN_LOGIN_FORM',
	        	open: true
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: true,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle OVERLAY_VISIBLE', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/OVERLAY_VISIBLE',
	        	value: true
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: true,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

	it('should handle CLOSE_CONFIRMATION', () => {
	    expect(
	      	reducer({
			  	tabIndex: 0,
			  	modalState: modalState.none,
			  	mainComponent: mainComponent.onboarding,
			  	overlayVisible: false,
			  	stateInitialised: false,
			  	modalVisible: false,
			  	modalOpen: false,
			  	confirmationOpen: true
			}, {
	        	type: 'navigation/CLOSE_CONFIRMATION'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: false,
		  	confirmationOpen: false
		})
	})

	it('should handle MODAL_OPENED', () => {
	    expect(
	      	reducer(initialState, {
	        	type: 'navigation/MODAL_OPENED'
	      	})
	    ).to.deep.equal({
		  	tabIndex: 0,
		  	modalState: modalState.none,
		  	mainComponent: mainComponent.onboarding,
		  	overlayVisible: false,
		  	stateInitialised: false,
		  	modalVisible: false,
		  	modalOpen: true,
		  	confirmationOpen: false,
  			coverApp: false
		})
	})

})
