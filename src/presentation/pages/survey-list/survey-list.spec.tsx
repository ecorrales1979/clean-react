import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/mocks'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyList } from '@/presentation/pages'

class LoadSurveyListSpy implements LoadSurveyList {
  surveys = mockSurveyList(3)
  async loadAll (): Promise<SurveyModel[]> {
    return this.surveys
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
  it('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('survey-list'))
  })

  it('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })
})
