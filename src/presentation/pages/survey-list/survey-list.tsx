import React from 'react'

import './survey-list-styles.scss'
import { Footer, Header, Icon } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className="surveyListWrap">
      <Header />
      <div className="contentWrap">
        <h2>Enquete</h2>
        <ul>
          <li>
            <div className="surveyContent">
              <Icon iconName="thumbUp" className="iconWrap" />
              <time>
                <span className="day">11</span>
                <span className="month">03</span>
                <span className="year">2022</span>
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
