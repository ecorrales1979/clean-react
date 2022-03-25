import React, { useEffect, useState } from 'react'

import { SurveyContext, SurveyError, SurveyListItem } from './components'
import Styles from './survey-list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(oldState => ({ ...oldState, surveys })))
      .catch(error => setState(oldState => ({ ...oldState, error: error.message })))
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquete</h2>
        <SurveyContext.Provider value={{ state, setState }}>
        {state.error ? <SurveyError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
