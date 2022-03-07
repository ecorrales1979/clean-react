import * as Helper from './http-mocks'

export const mockEmailInUseError = (delay?: number): void => {
  Helper.mockEmailInUseError(/signup/, delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Helper.mockUnexpectedError(/signup/, 'POST', delay)
}

export const mockSuccess = (response: any, delay?: number): void => {
  Helper.mockSuccess(/signup/, 'POST', response, delay)
}
