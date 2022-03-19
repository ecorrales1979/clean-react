import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyList } from '@/presentation/pages'

class LoadSurveyListSpy implements LoadSurveyList {
  async loadAll (): Promise<SurveyModel[]> {
    return []
  }
}

interface SutTypes {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  jest.spyOn(loadSurveyListSpy, 'loadAll')
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return { loadSurveyListSpy }
}

describe('SurveyList page', () => {
  it('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })

  it('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
  })
})
