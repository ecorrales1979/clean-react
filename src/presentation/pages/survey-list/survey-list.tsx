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
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquete</h2>
        <ul data-testid="survey-list">
          {state.surveys.length
            ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
