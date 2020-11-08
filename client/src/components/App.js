import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ROUTES, { RenderRoutes} from '../constants/routes';
import styled from 'styled-components';
import { UserProvider } from '../contexts/UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faTrophy, faHome } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const history = useHistory();

  return (
    <AppWrapper className='app-wrapper'>
      <UserProvider>

      <AppHeader className='global-header'>

        <GlobalNavigation className='global-nav'>
            <StyledLink>
                <NavLink to='/' className='home'>
                <FontAwesomeIcon icon={faHome} size='lg' />
                </NavLink>
                <span>Home</span>
            </StyledLink>
            <StyledLink>
                <NavLink to='/' className='user-pools'>
                <FontAwesomeIcon icon={faTrophy} size='lg' />
                </NavLink>
                <span>Pools</span>
            </StyledLink>
            <StyledLink>
                <NavLink to='/' className='user-statistics'>
                <FontAwesomeIcon icon={faChartLine} size='lg' />
                </NavLink>
                <span>Stats</span>
            </StyledLink>
            <StyledLink>
                <NavLink to='/' className='user-profile'>
                <FontAwesomeIcon icon={faUser} size='lg' />
                </NavLink>
                <span>Profile</span>
            </StyledLink>
            {/* <button onClick={() => history.push('/sign-in')}>Sign In</button> */}
        </GlobalNavigation>

      </AppHeader>

        {/* <AppNavigation>
        </AppNavigation> */}

        <AppMain className='content-wrapper'>
          <RenderRoutes routes={ROUTES} />
        </AppMain>
        
      </UserProvider>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
    display: grid;
    grid-template-rows: 4em 1fr;
    grid-template-areas:
      'header'
      'main';
    height: 100vh;
`;
  
  const AppHeader = styled.header`
    grid-area: header;
    box-sizing: border-box;
    margin-bottom: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const AppMain = styled.main`
  grid-area: main;
  margin-top: 1em;
  padding: 0 1em 0 1em;
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
    box-shadow: rgba(99, 99, 99, 0.2) 0 -3px 10px;
    background: white;
`;



const StyledLink = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  & span {
    margin-top: 0.30em;
    font-size: 0.75em;
    color: #a2abb9;
  }

  & a {
    color: #a2abb9;
  }

  & a:hover {
    color: #082344;
  }
`;