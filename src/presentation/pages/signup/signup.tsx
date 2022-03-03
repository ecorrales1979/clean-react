import React from 'react'
import { Link } from 'react-router-dom'

import './signup-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const SignUp: React.FC = () => {
  return (
    <div className="signup">
      <Header />
      <FormContext.Provider value={{ state: {} }}>
        <form className="form">
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            type="submit"
            className="btn-submit"
          >
            Entrar
          </button>
          <Link to="/login" className="link">Voltar</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
