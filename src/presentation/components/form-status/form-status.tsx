import React, { useContext } from 'react'

import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state

  return (
    <div className={Styles.loadingWrap} data-testid="loading-wrap">
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <div data-testid="main-error" className={Styles.errorMsg}>
        {mainError}
        </div>
      )}
    </div>
  )
}

export default FormStatus
