import React from 'react';
import styled from 'styled-components';
import MyPools from './MyPools';

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <StatsWrapper>
                {'future stats'}
            </StatsWrapper>
            <MainWrapper>
                <MyPools />
            </MainWrapper>
        </DashboardWrapper>
    );
}

export default Dashboard;

const DashboardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3em 10em auto 3em;
    grid-template-areas:
        "top-nav"
        "stats"
        "main";
    height: 100vh;
    box-sizing: border-box;
`;

const StatsWrapper = styled.section`
    grid-area: "stats";

    padding: 1em;
`;

const MainWrapper = styled.main`
    grid-area: "main"
`;