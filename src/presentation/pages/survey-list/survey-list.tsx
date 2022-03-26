import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SurveyContext, SurveyError, SurveyListItem } from './components'
import Styles from './survey-list-styles.scss'
import { AccessDeniedError } from '@/domain/errors'
import { Authentication, LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

interface Props {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(oldState => ({ ...oldState, surveys })))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(null as unknown as Authentication.Model)
          navigate('/login')
        } else {
          setState(oldState => ({ ...oldState, error: error.message }))
        }
      })
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
