import React, { memo } from 'react'

import './login-header-styles.scss'
import { Logo } from '@/presentation/components'

const LoginHeader: React.FC = () => (
  <header className="header">
    <Logo />
    <h1>Enquete para programadores</h1>
  </header>
)

export default memo(LoginHeader)
