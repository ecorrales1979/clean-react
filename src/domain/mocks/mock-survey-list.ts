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
