import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ROUTES, { RenderRoutes} from '../constants/routes';
import styled from 'styled-components';
import { UserProvider } from '../contexts/UserContext'
import { ReactComponent as Logo } from '../icons/pickle.svg';
import { ReactComponent as Menu } from '../icons/menu.svg';
import { ReactComponent as Home } from '../icons/beach-hut.svg';
import { ReactComponent as Pool } from '../icons/pool.svg';
import { ReactComponent as Lobby } from '../icons/boxing-gloves.svg';
import { ReactComponent as Stats } from '../icons/analytics.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faTrophy, faHome } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const history = useHistory();

  return (
    <AppWrapper className='app-wrapper'>
        <UserProvider>
            <AppHeader className='global-header'>
                <div className='top-nav'>
                    <div><LogoIcon /></div>
                    <div><MenuIcon /></div>
                </div>

                {/* <GlobalNavigation className='global-nav'>
                    <StyledLink>
                        <NavLink to='/' className='home'>
                            <HomeIcon />
                        </NavLink>
                        <span>Home</span>
                    </StyledLink>
                    <StyledLink>
                        <NavLink to='/' className='user-pools'>
                            <PoolIcon />
                        </NavLink>
                        <span>Pools</span>
                    </StyledLink>
                    <StyledLink>
                        <NavLink to='/' className='lobby'>
                            <LobbyIcon />
                        </NavLink>
                        <span>Lobby</span>
                    </StyledLink>
                    <StyledLink>
                        <NavLink to='/' className='user-statistics'>
                            <StatsIcon />
                        </NavLink>
                        <span>Stats</span>
                    </StyledLink>
                </GlobalNavigation> */}
                
            </AppHeader>
            <AppMain className='content-wrapper'>
                <RenderRoutes routes={ROUTES} />
            </AppMain>
            {/* <AppFooter>
                <div><LogoIcon /></div>
            </AppFooter> */}
        </UserProvider>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: auto;
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

        & div > {
            display: flex;
            align-items: center;
            height: 100%;

            & svg {
                margin: 1.25em 1em 1.25em 1em;
            }
        }
    }
`;

const AppMain = styled.main`
    box-sizing: border-box;
    padding: 1em 1em 0 1em;
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
    height: 1.75rem;
    width: 1.75rem;
`;

const MenuIcon = styled(Menu)`
    height: 1.25rem;
    width: 1.5rem;
`;

const HomeIcon = styled(Home)`
    height: 1.25rem;
    width: 1.5rem;
`;

const PoolIcon = styled(Pool)`
    height: 1.25rem;
    width: 1.5rem;
`;

const StatsIcon = styled(Stats)`
    height: 1.25rem;
    width: 1.5rem;
`;

const LobbyIcon = styled(Lobby)`
    height: 1.25rem;
    width: 1.5rem;
`;

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