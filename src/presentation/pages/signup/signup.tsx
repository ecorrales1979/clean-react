import React, { useEffect, useMemo, useState } from 'react'

import './signup-styles.scss'
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

interface StateProps {
  isLoading: boolean
  name: string
  email: string
  password: string
  passwordConfirmation: string
  nameError: string | null
  emailError: string | null
  passwordError: string | null
  passwordConfirmationError: string | null
  mainError: string | null
}

const SignUp: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const isValidForm = useMemo(() => {
    return (
      !state.nameError &&
      !state.emailError &&
      !state.passwordError &&
      !state.passwordConfirmationError
    )
  }, [
    state.nameError,
    state.emailError,
    state.passwordError,
    state.passwordConfirmationError
  ])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault()
    setState((oldState) => ({ ...oldState, isLoading: true }))
  }

  return (
    <div className="signup">
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className="form" onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            type="submit"
            className="btn-submit"
            disabled={!isValidForm}
            data-testid="submit"
          >
            Entrar
          </button>
          <span className="link">Voltar</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
