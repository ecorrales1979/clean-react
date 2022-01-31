import React from 'react'

import './login-styles.scss'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header
} from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className="login">
      <Header />
      <form className="form">
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit" className="btn-submit">Entrar</button>
        <span className="link">Criar conta</span>
        <FormStatus errorMsg="Error" />
      </form>
      <Footer />
    </div>
  )
}

export default Login
