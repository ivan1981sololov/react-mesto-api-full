import React, { useState } from 'react';
import * as authApi from '../utils/AuthApi';
import { useNavigate } from 'react-router-dom'; 
import InfoTooltip from './InfoTooltip';


const Login = ({
    setAuth, setOpenTooltip, setTooltipStatus
}) => {

    const navigate = useNavigate()
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        authApi.authorize(password, email)
        .then(data => {
                setAuth(data.token)
                navigate('/')
        })
        .catch((e) => {        
                setTooltipStatus(false);
                setOpenTooltip(true)
        })

    }

    return (
        <div className='auth'>
            <h2 className='auth__title'>Войти</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="auth__form form">
                <div>
                    <input className='form__input' placeholder='Email' type="text" name='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className='form__input' placeholder='Пароль' type="password" name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button 
                    className='auth__submit'
                >Войти</button>
            </form>        
        </div>
    );
};

export default Login;