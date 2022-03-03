import React, { useEffect, useState } from 'react'

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
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      nameError: validation.validate('name', state.name)
    }))
  }, [state.name])

  return (
    <div className="signup">
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className="form">
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            type="submit"
            className="btn-submit"
            disabled
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
