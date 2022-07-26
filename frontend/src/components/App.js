import React, { useEffect, useState } from 'react';
import Login from './Login';
import Header from './Header';
import Content from './Content';
import Register from './Register';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import authApi from '../utils/AuthApi';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';


export const path = {
    MAIN: '/',
    LOGIN: '/sign-in',
    REGISTER: '/sign-up'
}

function App() {
    const [auth, setAuth] = useState(null);

    const [tooltipStatus, setTooltipStatus] = useState(false);
    const [openTooltip, setOpenTooltip] = useState(false);

    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        setAuth(null)
        navigate(path.LOGIN);
    }

    useEffect(() => {
        if (auth) {
            localStorage.setItem('jwt', auth);
        }
    }, [auth]);

    useEffect(() => {
        const JWT = localStorage.getItem('jwt')
        if (JWT !== 'undefined') {
            setAuth(JWT)
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (auth) {
            api.getUserInfo()
                .then((user) => {
                    setCurrentUser({
                        name: user.name,
                        about: user.about,
                        avatar: user.avatar,
                        email: user.email,
                        _id: user._id,
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [auth]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Header logOut={logOut} auth={auth} />
            <Routes >
                <Route path={path.REGISTER} element={<Register setOpenTooltip={setOpenTooltip} setTooltipStatus={setTooltipStatus} setAuth={setAuth} />} />
                <Route path={path.LOGIN} element={<Login setOpenTooltip={setOpenTooltip} setTooltipStatus={setTooltipStatus} setAuth={setAuth} />} />
                <Route
                    exact
                    path={path.MAIN}
                    element={
                        <ProtectedRoute status={auth} components={<Content auth={auth} />} />
                    }>
                    <Route exact path={path.MAIN} element={<Content auth={auth} />} />
                </Route>
                <Route path="*" element={<Login setAuth={setAuth} />} />
            </Routes>
            <InfoTooltip setOpen={setOpenTooltip} isOpen={openTooltip} status={tooltipStatus} />
        </CurrentUserContext.Provider>
    )
}

export default App;