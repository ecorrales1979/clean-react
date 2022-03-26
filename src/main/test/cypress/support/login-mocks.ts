import faker from '@faker-js/faker'

import * as Helper from './http-mocks'

export const mockInvalidCredentialsError = (delay?: number): void => {
  Helper.mockInvalidCredentialsError(/login/, delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Helper.mockUnexpectedError(/login/, 'POST', delay)
}

export const mockSuccess = (delay?: number): void => {
  Helper.mockSuccess(
    /login/,
    'POST',
    { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
    delay
  )
}
