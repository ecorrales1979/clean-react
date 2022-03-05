import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

const SubmitButton: React.FC = ({ children }) => {
  const { state } = useContext(FormContext)

  return (
    <button
      type="submit"
      disabled={state.isFormInvalid || state.isLoading}
      data-testid="submit"
    >
      {children}
    </button>
  )
}

export default SubmitButton
