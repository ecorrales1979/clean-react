import React from 'react'

import Styles from './survey-list-styles.scss'
import { Footer, Header, Icon } from '@/presentation/components'

const SurveyList: React.FC = () => {
  console.log('styles', Styles)
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquete</h2>
        <ul>
          <li>
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
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
