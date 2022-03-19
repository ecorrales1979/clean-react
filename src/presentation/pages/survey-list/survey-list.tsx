import React, { useEffect } from 'react'

import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './survey-list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    loadSurveyList.loadAll().catch(error => console.error(error))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquete</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
