import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import useAuthHandler from '../../hooks/AuthHandler';
import { UserContext } from '../../contexts/UserContext'

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnAuthenticatedApp } from './UnAuthenticatedApp';
import FullPageSpinner from '../App/FullPageSpinner';

const App = () => {

    const [loginInfo, setLoginInfo] = useContext(UserContext);
    useAuthHandler(loginInfo, setLoginInfo)

    function renderComponent() {
        if(loginInfo.isLoading) {
            return <FullPageSpinner loading={true} optionalMessage={'Logging In...'}/>
        } else if(loginInfo.isLoggedIn) {
            return <AuthenticatedApp />
        } else {
            return <UnAuthenticatedApp />
        }
    }

    return (
        <div className='app' style={{ height: '100vh', width: '100vw', boxSizing: 'border-box' }}>
            {renderComponent()}
        </div>
    );
};

export default App;
