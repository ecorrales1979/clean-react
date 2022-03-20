import React, { useEffect, useState } from 'react'

import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './survey-list-styles.scss'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(oldState => ({ ...oldState, surveys })))
      .catch(error => setState(oldState => ({ ...oldState, error: error.message })))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquete</h2>
        {state.error
          ? (
          <div>
            <span data-testid="error">{state.error}</span>
            <button>Recarregar</button>
          </div>
            )
          : (
          <ul data-testid="survey-list">
            {state.surveys.length
              ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
              : <SurveyItemEmpty />
            }
          </ul>
            )}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
