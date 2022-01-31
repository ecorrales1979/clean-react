import React from 'react'

import './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'

const Login: React.FC = () => {
  return (
    <div className="login">
      <header className="header">
        <svg width="120px" height="87px" viewBox="0 0 120 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Login" transform="translate(-452.000000, -79.000000)" fill="#FFFFFF" fillRule="nonzero">
              <g id="Group-Copy" transform="translate(452.000000, 79.000000)">
                <path d="M46.4646465,-2.13162821e-14 L78.0617386,-2.13162821e-14 C103.903004,-2.13162821e-14 119.191919,15.7122157 119.191919,43.2236432 C119.191919,70.7350707 103.96296,86.8686869 78.0617386,86.8686869 L46.4646465,86.8686869 L46.4646465,-2.13162821e-14 Z M61.9334316,13.1236131 L61.9334316,73.7450737 L76.4429122,73.7450737 C93.8303064,73.7450737 103.423351,63.0896631 103.423351,43.2838433 C103.423351,23.8392238 93.7103933,13.1236131 76.4429122,13.1236131 L61.9334316,13.1236131 Z" id="D"></path>
                <path d="M45.1410658,86.8686869 L45.1410658,70.4340704 L0,70.4340704 L0,57.0696571 C7.8369906,42.8624429 17.9310345,27.3910274 37.5548589,-2.13162821e-14 L60.5642633,-2.13162821e-14 L60.5642633,57.7318577 L72.7272727,57.7318577 L72.7272727,70.4340704 L60.5642633,70.4340704 L60.5642633,86.8686869 L45.1410658,86.8686869 Z M14.6708464,57.6716577 L14.6708464,58.0930581 L45.3918495,58.0930581 L45.3918495,11.4982115 L45.1410658,11.4982115 C30.5329154,31.8458318 21.8808777,44.6684447 14.6708464,57.6716577 Z" id="4"></path>
              </g>
            </g>
          </g>
        </svg>
        <h1>Enquete para programadores</h1>
      </header>
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
      <footer className="footer" />
    </div>
  )
}

export default Login
