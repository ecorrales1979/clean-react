import React from 'react'

import './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className="login">
      <LoginHeader />
      <form className="form">
        <h2>Login</h2>
        <div className="input-wrap">
          <input type="email" name="email" className='dfg' placeholder="Digite seu e-mail" />
          <span className="input-status">🔴</span>
        </div>
        <div className="input-wrap">
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className="input-status">🔴</span>
        </div>
        <button type="submit" className="btn-submit">Entrar</button>
        <span className="link">Criar conta</span>
        <div className="loading-wrap">
          <div className="spinner">
            <Spinner />
          </div>
          <div className="error-msg">Erro</div>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
