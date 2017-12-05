import merge from '../../util/merge'

const initialState = {
  status: true,
  // a queue of network-related actions that failed. WHen network connection recovers
  // resumes, these can be re-tried
  failedActionsQueue: []
}

export const connectivityChanged = (status) => (dispatch, getState) => {
  if (status) {
    getState().networkConnection.failedActionsQueue.forEach(dispatch)
  }
  dispatch ({
    type: 'networkConnection/CONNECTION_CHANGED',
    status
  })
}

export const addFailedAction = (failedAction) => ({
  type: 'networkConnection/ACTION_FAILED',
  failedAction
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'networkConnection/CONNECTION_CHANGED':
      state = merge(state, {
        status: action.status,
        failedActionsQueue: []
      })
      break
    case 'networkConnection/ACTION_FAILED':
      if (!state.failedActionsQueue.find(a => a.type === action.type)) {
        state = merge(state, {
          failedActionsQueue: [...state.failedActionsQueue, action.failedAction]
        })
      }
      break
  }
  return state
}

export default reducer
