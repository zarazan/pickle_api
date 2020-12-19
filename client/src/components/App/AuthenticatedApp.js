import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import pickleApi from '../../services/pickle_api';

import { AUTH_ROUTES, RenderRoutes } from '../../constants/routes'

import { ReactComponent as Logo } from '../../icons/pickle.svg';
import { ReactComponent as Menu } from '../../icons/menu.svg';

export const AuthenticatedApp = () => {
    const history = useHistory();
    const [user, setUser] = useContext(UserContext);
    const [sidebar, setSidebar] = useState(false);

    return (
        <AppWrapper>
            <AppHeader className='global-header'>
                <div className='top-nav'>
                    <div><button className='btn btn-home' onClick={() => history.push('/')}><LogoIcon /></button></div>
                    <div><button className='btn btn-menu' onClick={() => handleSignOut()}><MenuIcon /></button></div>
                </div>
            </AppHeader>
            <AppMain className='content-wrapper'>
                <RenderRoutes routes={AUTH_ROUTES} />
            </AppMain>   
        </AppWrapper>
    );

    /** toggleSidebar: toggles the app sidebar. */
    function toggleSidebar(e) {
        console.log(e.target.id);
        setSidebar(!sidebar);
    }

    /** handleSignout: signs out the current user. */
    function handleSignOut() {
        setUser({});
        pickleApi.signOut();
        // add heap identity
		window.heap.resetIdentity();
        history.push('/sign-in');
    };
};

const AppWrapper = styled.div`
    height: 100vh;
    weight: 100vw;
`;

const AppHeader = styled.header`
    box-sizing: border-box;

    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    & div.top-nav {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        box-sizing: border-box;

        & > div {
            display: flex;
            align-items: center;
            height: 100%;

            & svg {
                margin: 1em 1em 1em 1em;
            }
        }
    }

    & button[class~='btn-home'], button[class~='btn-menu'] {
        background: none;
        border: none;
        outline: none;
    }
`;

const AppMain = styled.main`
    box-sizing: border-box;
    height: 100%;
`;

const GlobalNavigation = styled.nav`
    grid-area: nav;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    position: fixed;
    width: 100vw;
    max-width: 100vw;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    height: 4em;
    box-shadow: rgba(99, 99, 99, 0.2) 0 -3px 8px;
    background: white;
`;

const LogoIcon = styled(Logo)`
    height: 1.5rem;
    width: 1.5rem;
`;

const MenuIcon = styled(Menu)`
    height: 1.5rem;
    width: 1.5rem;
`;

// const HomeIcon = styled(Home)`
//     height: 1.25rem;
//     width: 1.5rem;
// `;

// const PoolIcon = styled(Pool)`
//     height: 1.25rem;
//     width: 1.5rem;
// `;

// const StatsIcon = styled(Stats)`
//     height: 1.25rem;
//     width: 1.5rem;
// `;

// const LobbyIcon = styled(Lobby)`
//     height: 1.25rem;
//     width: 1.5rem;
// `;

const StyledLink = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    & span {
        margin-top: 0.30em;
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.75rem;
        color: black;
    }

    & a {
        color: #a2abb9;
    }

    & a:hover {
        color: #082344;
    }
`;

const AppFooter = styled.footer`
    box-sizing: border-box;
    height: 4rem;

    & > div {
        display: flex;
        justify-content: center;
        margin-bottom: 4em;

        & > svg {
            padding: 1em 0 1em 0;
        }
    }
`;