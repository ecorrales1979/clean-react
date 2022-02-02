import React, { useEffect, useState } from 'react'

import './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

interface Props {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  useEffect(() => {
    validation.validate({ password: state.password })
  }, [state.password])

  return (
    <div className="login">
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button type="submit" data-testid="submit" disabled className="btn-submit">Entrar</button>
          <span className="link">Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
