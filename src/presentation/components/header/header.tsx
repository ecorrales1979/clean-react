import React, { memo } from 'react'

import './header-styles.scss'
import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
    <header className="headerWrap">
      <div className="headerContent">
        <Logo />
        <div className="infoWrap">
          <span>Meu nome</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
