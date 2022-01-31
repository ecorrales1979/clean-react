import React from 'react'

import './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-status'

const Login: React.FC = () => {
  return (
    <div className="login">
      <LoginHeader />
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
