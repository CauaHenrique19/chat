import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'

import './style.css'

const Login = () => {

    const history = useHistory()
    const { setUser, setToken } = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        const user = { email, password }

        try {
            const { data } = await api.post('login', user)

            setUser(data.user)
            setToken(data.token)

            localStorage.setItem('chat_token', data.token)
            localStorage.setItem('chat_user', JSON.stringify(data.user))

            history.push('/chat')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className="header-login">
                    <h1>Entrar</h1>
                    <p>Você está muito perto de se conectar.</p>
                </div>
                <div className="form-login">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="usuario@email.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin}>Entrar<ion-icon name="enter-outline" role="img" className="md hydrated" aria-label="enter outline"></ion-icon></button>
                    <Link to="#">Não tem uma conta?Cadastre-se</Link>
                </div>
            </div>
            <div className="image-container"></div>
        </div>
    )
}

export default Login