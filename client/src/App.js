import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Routes from './Routes';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faTrophy, faHome } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <AppWrapper className='app'>
      <Router>
        <AppNavigation>
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
        </AppNavigation>
        <AppMain>
          <Routes />
        </AppMain>
      </Router>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: 4em auto;
  grid-template-areas:
    'nav'
    'main';
  height: 100vh;
  box-sizing: border-box;
`;

const AppNavigation = styled.nav`
  grid-area: nav;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  padding: 0.75em;

  background: white;
  border-bottom: 1px solid #cccccc;
`;

const AppMain = styled.main`
  grid-area: main;
  background: #ffffff;
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