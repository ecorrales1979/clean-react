import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import { InvalidCredentialsError } from '@/domain/errors'

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
  const navigate = useNavigate()

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
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }))
      const result = await authentication.auth({ email: state.email, password: state.password })
      if (result) localStorage.setItem('accessToken', result.accessToken)
      navigate('/', { replace: true })
    } catch (error: unknown) {
      let errorMsg = 'Erro de autenticação'
      if (error instanceof InvalidCredentialsError) {
        errorMsg = error.message
      }
      setState(oldState => ({
        ...oldState,
        isLoading: false,
        mainError: errorMsg
      }))
    }
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
          <Link to="/signup" data-testid="signup" className="link">Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
