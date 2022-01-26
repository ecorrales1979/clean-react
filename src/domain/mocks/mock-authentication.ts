import faker from '@faker-js/faker'

import { AuthenticationParams } from '../usecases/autentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
