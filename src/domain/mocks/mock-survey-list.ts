import faker from '@faker-js/faker'

import { SurveyModel } from '@/domain/models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words(5)
    }
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyList = (quantity = 1): SurveyModel[] => {
  const models = []
  for (let i = 0; i < quantity; i++) {
    models.push(mockSurveyModel())
  }
  return models
}
