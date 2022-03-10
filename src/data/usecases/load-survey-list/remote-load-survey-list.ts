import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  private getResponseBody (body: SurveyModel[] = []): SurveyModel[] {
    return body
  }

  async loadAll (): Promise<SurveyModel[]> {
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
