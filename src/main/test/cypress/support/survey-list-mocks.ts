import * as Http from './http-mocks'

export const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(/surveys/, 'GET', delay)
}
