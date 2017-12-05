import { combineReducers } from 'redux'
import { NetInfo } from 'react-native'

import transaction from './reducer/transaction'
import business, { loadBusinessList, geolocationChanged, geolocationFailed } from './reducer/business'
import person from './reducer/person'
import navigation, { selectMainComponent, mainComponent, stateInitialised } from './reducer/navigation'
import login, { generateAUID, setStorePassword } from './reducer/login'
import sendMoney from './reducer/sendMoney'
import account from './reducer/account'
import networkConnection, {connectivityChanged} from './reducer/networkConnection'
import developerOptions from './reducer/developerOptions'
import statusMessage from './reducer/statusMessage'
import { setBaseUrl } from '../api/api'
import { Location, Permissions } from 'expo'

export const reducer = combineReducers({
  transaction,
  business,
  person,
  navigation,
  login,
  sendMoney,
  account,
  networkConnection,
  developerOptions,
  statusMessage
})

export const initialise = (store) => {
  NetInfo.isConnected.fetch()
    .then((status) => status && store.dispatch(connectivityChanged(true)))
    .then(() => NetInfo.isConnected.addEventListener(
      'connectionChange',
      (status) => store.dispatch(connectivityChanged(status))
    ))


  store.dispatch(loadBusinessList())

  let _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      alert('Unable to get location. Are location services enabled?')
      store.dispatch(geolocationFailed())
    }

    let location = await Location.getCurrentPositionAsync({})
    geolocationChanged(location.coords, store.dispatch)
  }

  _getLocationAsync()

  store.dispatch(stateInitialised())
  if (store.getState().login.loggedInUsername) {
    store.dispatch(selectMainComponent(mainComponent.returningLogin))
  }
  if (!store.getState().login.AUID) {
    store.dispatch(generateAUID())
  }
  // If there is no stored password (encrypted) then store password should
  // revert to false - in case a PIN is set and disclaimer agreed then
  // the app is closed and opened before logging in
  if (store.getState().login.encryptedPassword === '') {
    store.dispatch(setStorePassword(false))
  }
}
