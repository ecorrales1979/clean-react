export interface SurveyModel {
  id: string
  question: string
  answers: Array<{
    image?: string
    answer: string
  }>
  date: string
  didAnswer: boolean
}