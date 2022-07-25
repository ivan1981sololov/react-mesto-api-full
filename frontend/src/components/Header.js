import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../utils/AuthApi';
import { path } from './App';

const Header = ({
    auth,
    logOut
}) => {
 
    const [inf, setInf] = useState(null)
    useEffect(() => {
        if(auth !== null) {
            authApi.getUserInf(auth).then(data => {
                setInf(data.data)
            }).catch((e) => console.log(e))
        } else {
            setInf(null)
        }
    }, [auth])

    
    const getFloatLink = () => {
        if(window.location.pathname === path.REGISTER){
            return <Link className='header__link' to={path.LOGIN}>Войти</Link>
        } 
        if(window.location.pathname === path.LOGIN || !(window.location.pathname === path.REGISTER && window.location.pathname === path.MAIN)){
            return <Link className='header__link' to={path.REGISTER}>Регистрация</Link>
        }
    }
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__right">
                {
                    inf ? (
                        <>
                            <a className='header__mail'>{inf.email}</a>
                            <button className='header__link' onClick={logOut}>Выйти</button>
                        </>
                    ) : getFloatLink()
                }
            </div>
        </header>
    );
};

export default Header;


