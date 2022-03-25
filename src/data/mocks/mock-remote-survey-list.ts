import faker from '@faker-js/faker'

import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean()
})

export const mockRemoteSurveyList = (quantity = 1): RemoteLoadSurveyList.Model[] => {
  const models = []
  for (let i = 0; i < quantity; i++) {
    models.push(mockRemoteSurveyModel())
  }
  return models
}
