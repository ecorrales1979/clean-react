import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (delay?: number): void => {
  Helper.mockInvalidCredentialsError(/login/, delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Helper.mockUnexpectedError(/login/, 'POST', delay)
}

export const mockSuccess = (response: any, delay?: number): void => {
  Helper.mockSuccess(/login/, 'POST', response, delay)
}
