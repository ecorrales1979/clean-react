import React from 'react'

import './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  const enableInput = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false
  }

  return (
    <div className="input-wrap">
      <input {...props} readOnly onFocus={enableInput} />
      <span className="input-status">🔴</span>
    </div>
  )
}

export default Input
