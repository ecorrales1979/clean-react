import axios from 'axios'
import faker from '@faker-js/faker'

export const mockHttpResponse = (): unknown => ({
  status: faker.datatype.number(),
  data: faker.datatype.json()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
