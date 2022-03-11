import React from 'react'

import './survey-list-styles.scss'
import { Footer, Logo } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className="surveyListWrap">
      <header className="headerWrap">
        <div className="headerContent">
          <Logo />
          <div className="infoWrap">
            <span>Meu nome</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <div className="contentWrap">
        <h2>Enquete</h2>
        <ul>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">11</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">11</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
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
