import React from 'react'

import Styles from './survey-item-styles.scss'
import { SurveyModel } from '@/domain/models'
import { Icon } from '@/presentation/components'

interface Props {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName="thumbUp" className={Styles.iconWrap} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
