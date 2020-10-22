import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MyPools from './MyPools';

const Dashboard = ({ user }) => {
    const [userName, setUserName] = useState(user);

    return (
        <PageWrapper>
            <HeaderWrapper>
                <Welcome/>
                <FontAwesomeIcon icon={faUser} size="2x"/>
            </HeaderWrapper>
            <StatsWrapper>
                Stats
            </StatsWrapper>
            <MainWrapper>
                <MyPools/>
            </MainWrapper>
        </PageWrapper>
    );
}

export default Dashboard;

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3em 10em auto;
    grid-template-areas:
        "header"
        "stats"
        "main";
    height: 100vh;
`;

const HeaderWrapper = styled.header`
    grid-area: "header";
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: space-between;
    align-items: flex-start;

    margin: 1em;
`;

const StatsWrapper = styled.section`
    grid-area: "stats";

    padding: 1em;
`;

const MainWrapper = styled.main`
    grid-area: "main"
`;

const Welcome = styled.div`
    font-size: 24px;
`;