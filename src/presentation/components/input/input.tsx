import React from 'react'

import './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props) => {
  return (
    <div className="input-wrap">
      <input {...props} />
      <span className="input-status">🔴</span>
    </div>
  )
}

export default Input
