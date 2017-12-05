import { getBaseUrl, setBaseUrl } from '../../api/api'
import merge from '../../util/merge'
import Config from '@Config/config'


export const SERVER = {
  DEV:   getBaseUrl('development'),
  STAGE: getBaseUrl('staging')
}

const initialState = {
  server: SERVER.STAGE
}

export const selectServer = (serverId) => ({
  type: 'developerOptions/SELECT_SERVER',
  serverId
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'developerOptions/SELECT_SERVER':
      const server = SERVER[action.serverId]
      setBaseUrl(server)
      state = merge(state, {
        server
      })
      break
  }
  return state
}

export default reducer
