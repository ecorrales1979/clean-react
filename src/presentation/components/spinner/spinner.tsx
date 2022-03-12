import React from 'react'

import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

const spinner: React.FC<Props> = (props) => {
  const styles = [Styles.ldsEllipsis, props.className].join(' ')

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
