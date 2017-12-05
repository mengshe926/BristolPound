import _ from 'lodash'
import {encode} from 'base-64'
import merge from '../util/merge'
import cyclosUrl from '../util/config'
import { APIError, throwErrorOnUnexpectedResponse, UNEXPECTED_DATA, UNEXPECTED_ERROR } from './apiError'
import Config from '@Config/config'
import { flavour, default_config, configurations } from '@Config/config'

let globalSessionToken = ''

export const setSessionToken = (newToken) => {
  globalSessionToken = newToken
}

export const deleteSessionToken = () => globalSessionToken = ''

export const getBaseUrl = (flavourRequested) => {

    const selectedConfig = (!flavourRequested || flavourRequested == flavour)
        ? Config
        : _.has(configurations, flavourRequested)
        ? configurations[flavourRequested]
        : cyclosUrl(_.merge({}, default_config))

    return selectedConfig.CYCLOS.url
}

let BASE_URL = getBaseUrl()

export const setBaseUrl = newUrl => {
  BASE_URL = newUrl
}

const httpCommonHeaders = (isPIN) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (Config.CYCLOS.channel) {
      const channel = Config.CYCLOS.channel.replace('{CHANNEL_SECRET}', Config.secrets.CHANNEL_SECRET) + (isPIN ? '_PIN' : '')
      headers.append('Channel', channel)
  }
  return headers
}

const httpHeaders = (requiresAuthorisation) => {
  const headers = httpCommonHeaders()
  if (globalSessionToken && requiresAuthorisation) {
    headers.append('Session-Token', globalSessionToken)
  }
  return headers
}

const basicAuthHeaders = (username, password, isPIN) => {
  const headers = httpCommonHeaders(isPIN)
  headers.append('Authorization', 'Basic ' + encode(username + ':' + password))
  return headers
}

const querystring = params =>
  Object.keys(params).map(key => key + '=' + params[key]).join('&')

const processResponse = (dispatch, expectedResponse = 200) => (response) => {
  throwErrorOnUnexpectedResponse(response, expectedResponse)
  return response.json()
}


export const get = (url, params, dispatch) => {
  const apiMethod = BASE_URL + url + (params ? '?' + querystring(params) : '')
  return fetch(apiMethod, {headers: httpHeaders(params.requiresAuthorisation)})
    // if the API request was successful, dispatch a message that indicates we have good API connectivity
    .then(processResponse(dispatch))
}

// Will continually load pages of a get request until successCriteria is met.
// successCriteria - should be a function with takes the result of the get request
//                   and returns a boolean as to whether the request is complete. It
//                   will be called on each individual get request.
export const getPages = (config) => {

  let {pageSize, url, params, dispatch, successCriteria, pageNo = 0} = config
  params = merge(params, { page: pageNo })

  return new Promise(function (resolve, reject) {
    get(url, params, dispatch)
      .then(results => {
        if (results.length < pageSize || successCriteria === undefined || successCriteria(results, pageNo)) {
          resolve(results)
        } else {
          getPages(merge(config, {pageNo: pageNo + 1}))
            .then(nextResults => resolve(results.concat(nextResults)))
            .catch(reject)
        }
      })
      .catch(reject)
  })
}

export const post = (url, params, dispatch, expectedResponse = 201) =>
  fetch(BASE_URL + url, merge({ headers: httpHeaders(params.requiresAuthorisation) },
		{ method: 'POST', body: JSON.stringify(params) }))
    .then(processResponse(dispatch, expectedResponse))

export const authenticate = (username, password, dispatch) =>
  fetch(BASE_URL + 'auth/session', {
    headers: basicAuthHeaders(username, password),
    method: 'POST'
  })
  .then(processResponse(dispatch))
  .then((results) => {
    globalSessionToken = results.sessionToken
    return results.sessionToken
  })

export const checkPassword = (username, password) => {
  return fetch(BASE_URL + 'self/passwords?fields=type.name&fields=status', {
    headers: basicAuthHeaders(username, password)
  })
  // 403 with '{"code":"inaccessibleChannel"}' is returned upon correct PIN
  // 401 with '{"code":"login"}' is returened on incorrect username/PIN combination
  // 401 with '{"code":"login","passwordStatus":"temporarilyBlocked"}' is returned when PIN blocked, be it correct or incorrect
  .then((response) => {
    throwErrorOnUnexpectedResponse(response, 200)
    return response.json()
    .then(json => {
      return true
    })
  })
}

export const checkPin = (username, PIN) => {
  return fetch(BASE_URL + 'auth', {
    headers: basicAuthHeaders(username, PIN, true)
  })
  // 403 with '{"code":"inaccessibleChannel"}' is returned upon correct PIN (because channel is disabled for every user)
  // 401 with '{"code":"login"}' is returened on incorrect username/PIN combination
  // 401 with '{"code":"login","passwordStatus":"temporarilyBlocked"}' is returned when PIN blocked, be it correct or incorrect
    .then((response) => {
      throwErrorOnUnexpectedResponse(response, 403)
      return response.json()
        .then(json => {
          if (json.code && json.code == 'inaccessibleChannel')          {
            return true
          }

          const e = json.code ? UNEXPECTED_ERROR : UNEXPECTED_DATA
          if (!json.code)          {
            json = {code: UNEXPECTED_DATA, data: json}
          }

          // restore the json() method
          response.json = () => Promise.resolve(json)
          response.text = () => Promise.resolve(JSON.stringify(json))
          throw new APIError(e, response)
        })
    })
}
