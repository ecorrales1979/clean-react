import React from 'react'

import './form-status-styles.scss'
import { Spinner } from '@/presentation/components'

interface Props {
  errorMsg: string
}

const FormStatus: React.FC<Props> = (props) => {
  return (
    <div className="loading-wrap">
      <Spinner className="spinner" />
      <div className="error-msg">Erro</div>
    </div>
  )
}

export default FormStatus
