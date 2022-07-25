import React, { useState } from 'react';
import authApi from '../utils/AuthApi';
import { useNavigate } from 'react-router-dom'; 
import { path } from './App';

const Register  = ({
    setAuth, setOpenTooltip,
    setTooltipStatus,
}) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        authApi.register(email, password).then((data) => {
            setTooltipStatus(true)
            navigate(path.LOGIN)                
            setOpenTooltip(true)
        }).catch((e) => {
            setTooltipStatus(false);
            setOpenTooltip(true)
        })
    } 
    
    return (
        <div className='auth'>
            <h2 className='auth__title'>Регистрация</h2>
            <form onSubmit={(e) =>  handleSubmit(e)} className="auth__form form">
                <div>
                    <input className='form__input' placeholder='Email' type="text" name='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className='form__input' placeholder='Пароль' type="password" name='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    className='auth__submit'
                    
                >Зарегистрироваться</button>
            </form>        
            <p>Уже зарегистрированы? <a>Войти</a></p>
        </div>
    );
};

export default Register ;