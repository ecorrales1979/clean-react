import * as Helper from './http-mocks'

export const mockEmailInUseError = (delay?: number): void => {
  Helper.mockEmailInUseError(/signup/, delay)
}
