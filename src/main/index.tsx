import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'

import Router from './routes/router'

ReactDOM.render(
  <Router />,
  document.getElementById('main')
)
