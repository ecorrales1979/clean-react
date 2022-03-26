import faker from '@faker-js/faker'

import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyList = (): LoadSurveyList.Model[] => {
  return [
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
  ]
}

export class LoadSurveyListSpy implements LoadSurveyList {
  surveys = mockSurveyList()
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    return this.surveys
  }
}
