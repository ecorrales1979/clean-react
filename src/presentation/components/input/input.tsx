import React, { useContext } from 'react'

import './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

const Input: React.FC<Props> = (props) => {
  const { errorState } = useContext(FormContext)

  const getTitle = (): string => {
    return errorState[props.name]
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const enableInput = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false
  }

  return (
    <div className="input-wrap">
      <input {...props} readOnly onFocus={enableInput} />
      <span title={getTitle()} data-testid={`${props.name}-status`} className="input-status">{getStatus()}</span>
    </div>
  )
}

export default Input
