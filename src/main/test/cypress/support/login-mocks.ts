import faker from '@faker-js/faker'

import * as Http from './http-mocks'

export const mockInvalidCredentialsError = (delay?: number): void => {
  Http.mockUnauthorizedError(/login/, delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(/login/, 'POST', delay)
}

export const mockSuccess = (delay?: number): void => {
  Http.mockSuccess(
    /login/,
    'POST',
    { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
    delay
  )
}
