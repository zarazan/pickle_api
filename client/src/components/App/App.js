import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
// import { darkTheme, lightTheme } from '../co'

import { UserContext } from '../../contexts/UserContext'
import GameOdds from '../Betslip/GameOdds';

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnAuthenticatedApp } from './UnAuthenticatedApp';

const App = () => {
    const [user] = useContext(UserContext);
    return (
        <>
            {/* <div className='app' style={{ height: '100vh', width: '100vw', boxSizing: 'border-box' }}>
                {user && user.name ? <AuthenticatedApp /> : <UnAuthenticatedApp /> }
            </div> */}
            <GameOdds />
        </>
    );
};

export default App;