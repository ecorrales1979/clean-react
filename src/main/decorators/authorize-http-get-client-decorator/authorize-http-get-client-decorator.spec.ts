import { GetStorageSpy, mockGetRequest } from '@/data/mocks'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
