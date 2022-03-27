import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Styles from './signup-styles.scss'
import { EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header,
  SubmitButton
} from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

interface Props {
  validation: Validation
  addAccount: AddAccount
}

interface StateProps {
  isLoading: boolean
  isFormInvalid: boolean
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
    isFormInvalid: true,
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
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  const validate = (field: 'name' | 'email' | 'password' | 'passwordConfirmation'): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState((oldState) => ({
      ...oldState,
      [`${field}Error`]: validation.validate(field, formData)
    }))
  }

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  useEffect(() => {
    setState(oldState => ({ ...oldState, isFormInvalid: !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError }))
  }, [state.nameError, state.emailError, state.passwordError, state.passwordConfirmationError])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault()
    if (state.isLoading || state.isFormInvalid) return
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }))
      const result = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      if (result) setCurrentAccount(result)
      navigate('/', { replace: true })
    } catch (error: unknown) {
      let errorMsg = 'Erro criando a conta'
      if (error instanceof EmailInUseError) {
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
    <div className={Styles.signupWrap}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <SubmitButton>Cadastrar</SubmitButton>
          <Link to="/login" data-testid="login" className={Styles.link}>Voltar</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
