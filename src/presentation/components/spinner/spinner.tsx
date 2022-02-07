import React from 'react'

import './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

const spinner: React.FC<Props> = (props) => {
  const styles = ['lds-ellipsis', props.className].join(' ')

  return (
    <div {...props} data-testid="spinner" className={styles}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default spinner
