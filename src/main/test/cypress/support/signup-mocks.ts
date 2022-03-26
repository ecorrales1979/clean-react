import faker from '@faker-js/faker'

import * as Http from './http-mocks'

export const mockEmailInUseError = (delay?: number): void => {
  Http.mockForbiddenError(/signup/, 'POST', delay)
}

export const mockUnexpectedError = (delay?: number): void => {
  Http.mockServerError(/signup/, 'POST', delay)
}

export const mockSuccess = (delay?: number): void => {
  Http.mockSuccess(
    /signup/,
    'POST',
    { accessToken: faker.datatype.uuid(), name: faker.name.findName() },
    delay
  )
}
