import React, { useState } from 'react'

import './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

interface StatusProps {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StatusProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className="login">
      <Header />
      <FormContext.Provider value={state}>
        <form className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button type="submit" className="btn-submit">Entrar</button>
          <span className="link">Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
