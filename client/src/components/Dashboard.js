import React, { useContext } from 'react';
import styled from 'styled-components';
import MyPools from './MyPools';
import StatCardLite from './StatCardLite';
import { UserContext } from '../contexts/UserContext';
import useAuthHandler from '../hooks/AuthHandler';

import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

const SAMPLE_STATS = [
    {
        index: 1,
        title: 'Bet Win %',
        value: '48%',
        icon: faArrowCircleUp,
        telemetry: '+2%',
        timespan: 'vs last week',
        color: '#43aa8b',
    },
    {
        index: 2,
        title: 'Pool Win %',
        value: '62%',
        icon: faArrowCircleUp,
        telemetry: '+10%',
        timespan: 'vs last week',
        color: '#43aa8b',
    },
    {
        index: 3,
        title: 'Rank',
        value: '13th',
        icon: faArrowCircleDown,
        telemetry: '-2',
        timespan: 'vs last week',
        color: '#f94144',
    },
];

const Dashboard = () => {

    const [user, setUser] = useContext(UserContext);
    const isLoadingUser = useAuthHandler(user, setUser);

    return (
        <DashboardWrapper className='dashboard'>
            <Welcome className='welcome'>
                <span className='welcome__intro'>Welcome back, </span>
                <span className='welcome__name'>{user.name}</span>
            </Welcome>
            <StatsWrapper className='stats'>
                <StatsHeader className='stats__header'>My Stats</StatsHeader>
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
    height: 100vh;
    box-sizing: border-box;
    padding: 1em 1em 0em 1em;
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
    margin-bottom: 2em;
    
    & .stats__cardlist {
        border: 2px solid #ebeff4;
        border-radius: 0.5em;
    }
`;

const StatsHeader = styled.h2`
    font-family: 'Poppins', 'Sans Serif';
    font-size: 1em;
    color: #121621;

    margin-bottom: 1em;
`;

const MainWrapper = styled.section`
    grid-area: main;
`;