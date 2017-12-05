import _ from 'lodash'
import merge from '../../util/merge'
import { openTraderModal } from './business'
import { moveMap, selectClosestBusiness } from './business'
import { openPersonModal } from './person'
import { screenHeight } from '../../util/ScreenSizes'

export const modalState = {
  none: 'none',
  traderScreen: 'traderScreen',
  personScreen: 'personScreen',
  developerOptions: 'developerOptions',
}

export const mainComponent = {
  onboarding: 'onboarding',
  returningLogin: 'returningLogin',
  tabs: 'tabs',
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

export const navigateToTab = (tabIndex) =>
  (dispatch, getState) => {
    const { businessListRef } = getState().business
    businessListRef && businessListRef.resetToInitalState()

    const { spendingListRef } = getState().transaction
    spendingListRef && spendingListRef.scrollTo({ y: 0, animated: false })

    dispatch ({
      type: 'navigation/NAVIGATE_TO_TAB',
      tabIndex
    })
  }

export const setOverlayOpen = (value) => ({
  type: 'navigation/OVERLAY_VISIBLE',
  value
})

export const modalOpened = () => ({
  type: 'navigation/MODAL_OPENED'
})

export const setKeyboardHeight = () => ({
  type: 'navigation/SET_KEYBOARD_HEIGHT',
  height
})

export const selectMainComponent = (componentName) => ({
  type: 'navigation/SELECT_MAIN_COMPONENT',
  componentName
})

export const stateInitialised = () => ({
  type: 'navigation/STATE_INITIALIZED'
})

export const closeConfirmation = () => ({
  type: 'navigation/CLOSE_CONFIRMATION'
})

export const showModal = (modalState) => ({
  type: 'navigation/SHOW_MODAL',
  modalState
})

export const setCoverApp = (value) => ({
  type: 'navigation/COVER_APP',
  value
})

export const openDetailsModal = (user) =>
  (dispatch, getState) => {
    // it is not possible to determine whether an id related to a trader (i.e. a BP user)
    // or a contact from the transaction. As a result we have to look up the id in the business
    // list in order to determine the type
    if (getState().business.businessList[user.id]) {
      dispatch(openTraderModal(user.id))
    } else {
      // Open Person screen
      dispatch(openPersonModal(user))
    }
  }

export const hideModal = () => ({
  type: 'navigation/HIDE_MODAL',
})

export const goToLocation = (location) =>
  (dispatch) => {
    dispatch(moveMap(location))
    dispatch(selectClosestBusiness())
    dispatch(navigateToTab(0))
    dispatch(hideModal())
  }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'navigation/NAVIGATE_TO_TAB':
      state = merge(state, {
        tabIndex: action.tabIndex
      })
      break
    case 'navigation/SHOW_MODAL':
      state = merge(state, {
        modalState: action.modalState,
        modalVisible: true,
      })
      break
    case 'navigation/HIDE_MODAL':
      state = merge(state, {
        modalVisible: false,
        modalOpen: false,
        modalState: modalState.none
      })
      break
    case 'login/LOGGED_OUT':
      break
    case 'login/JUST_BROWSING':
      state = merge(state, {
        mainComponent: mainComponent.tabs
      })
      break
    case 'login/LOGGED_IN':
      state = merge(state, {
        mainComponent: mainComponent.tabs
      })
      break
    case 'navigation/SELECT_MAIN_COMPONENT':
      state = merge(state, {
        mainComponent: action.componentName
      })
      break
    case 'navigation/STATE_INITIALIZED':
      state = merge(state, {
        stateInitialised: true
      })
      break
    case 'sendMoney/TRANSACTION_COMPLETE':
      state = merge(state, {
        overlayVisible: false,
        confirmationOpen: action.success,
      })
      break
    case 'login/LOGIN_IN_PROGRESS':
      state = merge(state, {
        overlayVisible: false
      })
      break
    case 'login/OPEN_LOGIN_FORM':
      state = merge(state, {
        overlayVisible: action.open
      })
      break
    case 'navigation/OVERLAY_VISIBLE':
      state = merge(state, {
          overlayVisible: action.value
      })
      break
    case 'navigation/CLOSE_CONFIRMATION':
      state = merge(state, {
          confirmationOpen: false
      })
      break
    case 'navigation/COVER_APP':
      state = merge(state, {
        coverApp: action.value
      })
      break
    case 'navigation/MODAL_OPENED':
      state = merge(state, {
        modalOpen: true
      })
  }
  return state
}

export default reducer
