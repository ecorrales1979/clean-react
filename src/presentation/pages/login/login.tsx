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
import { Authentication } from '@/domain/usecases/authentication'

interface Props {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ authentication, validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      emailError: validation.validate('email', state.email)
    }))
  }, [state.email])

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.password])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    if (state.isLoading || state.emailError || state.passwordError) return
    setState((oldState) => ({ ...oldState, isLoading: true }))
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className="login">
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button
            type="submit"
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError || state.isLoading}
            className="btn-submit"
          >
            Entrar
          </button>
          <span className="link">Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
