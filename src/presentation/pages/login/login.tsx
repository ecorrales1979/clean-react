import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Styles from './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header,
  SubmitButton
} from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { InvalidCredentialsError } from '@/domain/errors'

interface Props {
  validation: Validation
  authentication: Authentication
}

interface StateProps {
  isLoading: boolean
  isFormInvalid: boolean
  email: string
  password: string
  emailError: string | null
  passwordError: string | null
  mainError: string | null
}

const Login: React.FC<Props> = ({ authentication, validation }) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  const validate = (field: 'name' | 'email' | 'password' | 'passwordConfirmation'): void => {
    const { email, password } = state
    const formData = { email, password }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, formData)
    }))
  }

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      isFormInvalid: !!state.emailError || !!state.passwordError
    }))
  }, [state.emailError, state.passwordError])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    if (state.isLoading || state.isFormInvalid) return
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }))
      const result = await authentication.auth({ email: state.email, password: state.password })
      if (result) setCurrentAccount(result)
      navigate('/', { replace: true })
    } catch (error: unknown) {
      let errorMsg = 'Erro de autentica????o'
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
    <div className={Styles.loginWrap}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton>Entrar</SubmitButton>
          <Link to="/signup" data-testid="signup-link" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
