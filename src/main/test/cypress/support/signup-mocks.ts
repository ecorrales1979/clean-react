import faker from '@faker-js/faker'

import * as Helper from './http-mocks'

export const mockEmailInUseError = (delay?: number): void => {
  Helper.mockEmailInUseError(/signup/, delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Helper.mockUnexpectedError(/signup/, 'POST', delay)
}

export const mockSuccess = (delay?: number): void => {
  Helper.mockSuccess(
    /signup/,
    'POST',
    { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
    delay
  )
}
