import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import MyPools from './MyPools';
import PickleApi from '../services/pickle_api';

const Dashboard = props => {

    const [pools, setPools] = useState([]);

    useEffect(() => {
        var api = new PickleApi();
        api.signIn();
        const attributes = {
            name: 'Pool Two'
        }
        api.createPool(attributes).then(data => console.log(data));

        api.getPools().then(data => setPools(data));
    }, []);

    return (
        <PageWrapper>
            <HeaderWrapper>
                <Welcome/>
                <FontAwesomeIcon icon={faUser} size="2x"/>
            </HeaderWrapper>
            <StatsWrapper>
                {pools.map(pool => pool.name).join(' ')}
            </StatsWrapper>
            <MainWrapper>
                <MyPools />
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
    box-sizing: border-box;
`;

const HeaderWrapper = styled.header`
    grid-area: "header";
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: space-between;
    align-items: flex-start;

    margin: 2em;
    box-sizing: border-box;
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