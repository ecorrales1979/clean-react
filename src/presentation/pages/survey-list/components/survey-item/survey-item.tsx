import React from 'react'

import Styles from './survey-item-styles.scss'
import { Icon } from '@/presentation/components'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName="thumbUp" className={Styles.iconWrap} />
        <time>
          <span className={Styles.day}>11</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2022</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
