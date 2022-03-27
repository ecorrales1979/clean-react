import * as Http from './http-mocks'

export const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(/surveys/, 'GET', delay)
}

export const mockAccessDeniedError = (delay?: number): void => {
  Http.mockForbiddenError(/surveys/, 'GET', delay)
}
