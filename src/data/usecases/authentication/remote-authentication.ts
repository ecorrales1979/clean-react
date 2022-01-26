import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domain/usecases/autentication'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

export default class RemoteAuthentication {
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({ url: this.url, body: params })

    switch (response.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.success:
        return await Promise.resolve()
      default:
        throw new UnexpectedError()
    }
  }
}
