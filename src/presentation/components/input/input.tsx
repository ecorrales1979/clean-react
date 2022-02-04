import React, { useContext } from 'react'

import './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const getTitle = (): string => {
    return error || 'Tudo certo'
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🔵'
  }

  const enableInput = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState: object) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className="input-wrap">
      <input {...props} readOnly onFocus={enableInput} data-testid={props.name} onChange={handleChange} />
      <span title={getTitle()} data-testid={`${props.name}-status`} className="input-status">{getStatus()}</span>
    </div>
  )
}

export default Input
