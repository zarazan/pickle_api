import React, { useContext } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import pickleApi from '../../services/pickle_api';

import { AUTH_ROUTES, RenderRoutes } from '../../constants/routes'

import { ReactComponent as Logo } from '../../icons/pickle.svg';
import { ReactComponent as Menu } from '../../icons/menu.svg';

export const AuthenticatedApp = () => {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useContext(UserContext);
    const user = loginInfo.user;

    return (
        <AppWrapper className='c-app'>
            <AppMain className='c-app__main'>
                <AppNav className='c-app__nav l-row-flex'>
                    <div className='c-row-flex'>
                        <button className='btn c-app__home-button' onClick={() => history.push('/')}><Logo style={{ height: '20px', width: '20px'}} /></button>
                        </div>
                    <div className='c-row-flex'>
                        <button className='btn c-app__logout-button' onClick={() => handleSignOut()}><Menu style={{ height: '20px', width: '20px'}} /></button>
                    </div>
                </AppNav>
                <RenderRoutes routes={AUTH_ROUTES} />
            </AppMain>   
        </AppWrapper>
    );

    /** handleSignout: signs out the current user. */
    function handleSignOut() {
        setLoginInfo({
          user: {},
          isLoading: false,
          isLoggedIn: false,
        })
        pickleApi.signOut();
        // add heap identity
		window.heap.resetIdentity();
        history.push('/sign-in');
    };
};

const AppWrapper = styled.div`
    height: 100vh;
    weight: 100vw;

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
    }
`;

const AppMain = styled.main`
    box-sizing: border-box;
    height: 100%;
`;

const AppNav = styled.div`
    justify-content: space-between;
    align-content: center;
    align-items: center;
    box-sizing: border-box;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    & > div {
        align-items: center;
        height: 100%;

        & > button {
            background: none;
            border: none;
            outline: none;
        }

        & svg {
            margin: 1em 1em 1em 1em;
        }
    }
`;