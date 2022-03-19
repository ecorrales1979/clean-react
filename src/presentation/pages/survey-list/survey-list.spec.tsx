import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyList page', () => {
  it('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })
})
