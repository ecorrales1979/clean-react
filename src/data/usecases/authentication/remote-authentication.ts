import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Authentication.Params, RemoteAuthentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const response = await this.httpPostClient.post({ url: this.url, body: params })

    switch (response.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.success:
        return response.body as Authentication.Model
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
