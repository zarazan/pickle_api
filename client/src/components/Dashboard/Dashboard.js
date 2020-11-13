import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import { SAMPLE_STATS } from '../../constants/mockStats';

import MyPools from './MyPools';
import StatCardLite from './StatCardLite';

const Dashboard = () => {
    const [ user ] = useContext(UserContext);
    const history = useHistory();

    return (
        <DashboardWrapper className='dashboard'>
            <Welcome className='welcome'>
                <span className='welcome__intro'>Welcome back, </span>
                <span className='welcome__name'>{user.name}</span>
            </Welcome>
            <StatsWrapper className='stats'>
                <StatsHeader className='stats__header'>MY STATS</StatsHeader>
                <div className='stats__cardlist'>
                    {SAMPLE_STATS.map((s) => (
                        <StatCardLite 
                            key={s.index}
                            title={s.title}
                            value={s.value}
                            icon={s.icon}
                            telemetry={s.telemetry}
                            timespan={s.timespan}
                            color={s.color}
                        />
                    ))}
                </div>
            </StatsWrapper>
            <MainWrapper>
                <PoolsHeader className='my-pools__header'>MY POOLS</PoolsHeader>
                <CreatePoolButton
                    onClick={() => history.push('/create-pool')}>Create Pool
                </CreatePoolButton>

                <MyPools />
            </MainWrapper>
        </DashboardWrapper>
    );
}

export default Dashboard;

const DashboardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4em auto 1fr;
    grid-template-areas:
        'welcome'
        'stats'
        'main';
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    margin: 1em;
`;

const Welcome = styled.section`
    grid-area: welcome;
    display: flex;
    flex-flow: column nowrap;

    font-family: 'Poppins', 'Sans Serif';
    font-size: 1.25em;
    color: #7e858c;

    & .welcome__name {
        color: #47515d;
    }
`;

const StatsWrapper = styled.section`
    grid-area: stats;
    display: flex;
    flex-flow: column nowrap;
    
    & .stats__cardlist {
        border: 2px solid #ebeff4;
        border-radius: 0.5em;
    }
`;

const StatsHeader = styled.h3`
    font-family: 'Poppins', 'Sans Serif';
    font-size: .8125rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;

const MainWrapper = styled.section`
    grid-area: main;
`;

const PoolsHeader = styled.h3`
    font-family: 'Poppins', 'Sans Serif';
    font-size: .8125rem;
    letter-spacing: .0625em;
    color: #8b8c8f;

    margin: 1.25rem 0 1.25rem 0;
`;

const CreatePoolButton = styled.button`
    box-sizing: border-box;
    padding: 1rem 0 1rem;
    width: 100%;
    background: none;
    border: 1px solid #8b8c8f;
    border-radius: 0.2rem;
    outline: none;
    font-family: 'Inter', 'Sans Serif';
    font-size: .8125rem;
    color: #8fd6a9;
`;