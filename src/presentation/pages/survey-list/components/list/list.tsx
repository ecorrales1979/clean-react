import React, { useContext } from 'react'

import Styles from './list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
