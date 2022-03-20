import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/mocks'
import { IconNameEnum } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'

describe('SurveyList component', () => {
  it('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-01-10T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconNameEnum.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jan$/i)
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
