import React, { useContext } from 'react'

import './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)
  return (
    <div className="loading-wrap" data-testid="loading-wrap">
      {isLoading && <Spinner className="spinner" />}
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
    </div>
  )
}

export default FormStatus
