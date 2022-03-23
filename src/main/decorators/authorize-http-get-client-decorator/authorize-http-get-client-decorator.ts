import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClientSpy: HttpGetClient<any>
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.getStorage.get('account')
    await this.httpGetClientSpy.get(params)
    return await Promise.resolve({} as unknown as HttpResponse<any>)
  }
}
