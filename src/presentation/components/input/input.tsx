import React, { useContext, useMemo } from 'react'

import './input-styles.scss'
import { FormContext } from '@/presentation/contexts'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

const Input: React.FC<Props> = (props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const elementId = useMemo(() => {
    return props.id ?? props.name
  }, [props.id, props.name])

  return (
    <div className="input-wrap">
      <input
        {...props}
        id={elementId}
        placeholder=" "
        readOnly
        onFocus={(ev) => { ev.target.readOnly = false }}
        data-testid={props.name}
        onChange={(ev) => {
          setState((prevState: object) => ({
            ...prevState,
            [ev.target.name]: ev.target.value
          }))
        }}
      />
      <label htmlFor={elementId}>{props.placeholder}</label>
      <span
        title={error || 'Tudo certo'}
        data-testid={`${props.name}-status`}
        className="input-status"
      >
        {error ? '🔴' : '🔵'}
      </span>
    </div>
  )
}

export default Input
