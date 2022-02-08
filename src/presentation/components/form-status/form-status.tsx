import React, { useContext } from 'react'

import './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state
  return (
    <div className="loading-wrap" data-testid="loading-wrap">
      {isLoading && <Spinner className="spinner" />}
      {mainError && <div data-testid="main-error" className="error-msg">{mainError}</div>}
    </div>
  )
}

export default FormStatus
