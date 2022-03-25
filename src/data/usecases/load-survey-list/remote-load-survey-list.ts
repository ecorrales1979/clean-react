import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  private getResponseBody (body: LoadSurveyList.Model[] = []): LoadSurveyList.Model[] {
    return body
  }

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpGetClient.get({ url: this.url })

    switch (response.statusCode) {
      case HttpStatusCode.success:
      case HttpStatusCode.noContent:
        return this.getResponseBody(response.body)
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
