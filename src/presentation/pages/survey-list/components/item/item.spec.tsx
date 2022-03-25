import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/mocks'
import { LoadSurveyList } from '@/domain/usecases'
import { IconNameEnum } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'

interface SutTypes {
  survey: LoadSurveyList.Model
}

const makeSut = (data: Partial<LoadSurveyList.Model>): SutTypes => {
  const survey = mockSurveyModel()
  Object.assign(survey, data)
  render(<SurveyItem survey={survey} />)
  return { survey }
}

describe('SurveyList component', () => {
  it('Should render with correct values', () => {
    const { survey } = makeSut({
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconNameEnum.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jan$/i)
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  it('Should render with correct day and icon', () => {
    makeSut({
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconNameEnum.thumbDown)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent(/^mai$/i)
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
