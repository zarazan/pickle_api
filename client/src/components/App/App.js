import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import useAuthHandler from '../../hooks/AuthHandler';
import { UserContext } from '../../contexts/UserContext'

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnAuthenticatedApp } from './UnAuthenticatedApp';

const App = () => {

    const [loginInfo, setLoginInfo] = useContext(UserContext);
    useAuthHandler(loginInfo, setLoginInfo)

    return (
        <>
            <div className='app' style={{ height: '100vh', width: '100vw', boxSizing: 'border-box' }}>
                {loginInfo.isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp /> }
            </div>
        </>
    );
};

export default App;
