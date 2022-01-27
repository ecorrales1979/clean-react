import faker from '@faker-js/faker'

import { HttpPostParams } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})
