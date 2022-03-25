import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'

const Header: React.FC = () => {
  const { getCurrentAccount, setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  const logout = (): void => {
    setCurrentAccount(null as unknown as Authentication.Model)
    navigate('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.infoWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
