import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { mockSurveyList } from '@/domain/mocks'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyList } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'

class LoadSurveyListSpy implements LoadSurveyList {
  surveys = mockSurveyList(3)
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    return this.surveys
  }
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): void => {
  jest.spyOn(loadSurveyListSpy, 'loadAll')
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
}

describe('SurveyList page', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll')
    makeSut(loadSurveyListSpy)
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('survey-list'))
  })

  it('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  it('Should call LoadSurveyList on reload button click', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload-button'))
    expect(loadSurveyListSpy.loadAll).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByTestId('survey-list'))
  })
})
