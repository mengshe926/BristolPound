export const UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS'
export const PERMISSION_DENIED = 'PERMISSION_DENIED'
export const UNEXPECTED_DATA = 'UNEXPECTED_DATA'
export const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
export const INPUT_ERROR = 'INPUT_ERROR'
export const UNEXPECTED_HTTP_RESPONSE = 'UNEXPECTED_HTTP_RESPONSE'

export const APIError = function (type, response) {
  Error.call(this)
  this.message = 'An error response was returned from the Cyclos API'
  this.name = 'APIError'
  this.type = type
  this.response = response
}

APIError.prototype.__proto__ = Error.prototype

export const throwErrorOnUnexpectedResponse = (response, expectedResponse) => {
  if (response.status !== expectedResponse) {
    if (response.status === 401) {
      throw new APIError(UNAUTHORIZED_ACCESS, response)
    } else if (response.status === 403) {
      throw new APIError(PERMISSION_DENIED, response)
    } else if (response.status === 404) {
      throw new APIError(UNEXPECTED_DATA, response)
    } else if (response.status === 500) {
      throw new APIError(UNEXPECTED_ERROR, response)
    } else if (response.status === 422) {
      throw new APIError(INPUT_ERROR, response)
    } else {
      throw new APIError(UNEXPECTED_HTTP_RESPONSE, response)
    }
  }
  return response
}

export default APIError
