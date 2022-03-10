import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const response = await this.httpGetClient.get({ url: this.url })

    if (!response.body) throw new UnexpectedError()

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body
      default:
        throw new UnexpectedError()
    }
  }
}
