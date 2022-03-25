import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
    AddAccount.Params,
    AddAccount.Model
    >
  ) {}

  async add (params: AddAccount.Params): Promise<RemoteAddAccount.Model> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      case HttpStatusCode.success:
        return response.body as AddAccount.Model
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
