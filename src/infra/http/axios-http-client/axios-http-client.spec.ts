import faker from '@faker-js/faker'
import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): { sut: AxiosHttpClient } => {
  const sut = new AxiosHttpClient()
  return { sut }
}

describe('AxiosHttpClient', () => {
  it('should call Axios with correct url', async () => {
    const url = faker.internet.url()
    const { sut } = makeSut()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
