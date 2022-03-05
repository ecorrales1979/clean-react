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
import { AddAccount } from '@/domain/usecases'

interface Props {
  validation: Validation
  addAccount: AddAccount
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

const SignUp: React.FC<Props> = ({ addAccount, validation }) => {
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

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    if (state.isLoading || !isValidForm) return
    setState((oldState) => ({ ...oldState, isLoading: true }))
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
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
