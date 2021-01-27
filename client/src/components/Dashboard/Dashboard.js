import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import { SAMPLE_STATS } from '../../constants/mockStats';

import MyPools from './MyPools';
import StatCardLite from './StatCardLite';
import { ReactComponent as Stats } from '../../icons/stats.svg';

const Dashboard = () => {
    const [{user}] = useContext(UserContext);
    const [userStats, setUserStats] = useState([]);
    const history = useHistory();

    return (
        <DashboardWrapper className='dashboard'>
            <Welcome className='welcome'>
                <span className='welcome__intro'>Welcome back, </span>
                <span className='welcome__name'>{user.name}</span>
            </Welcome>
            <StatsWrapper className='stats'>
                <StatsHeader className='stats__header'>My Stats</StatsHeader>
                    {!userStats || userStats.length < 1
                        ?
                            <StatsNullState className='null-state'>
                                <Stats className='null-state__icon'/>
                                <span className='null-state__message'>No Stats Generated Yet</span>
                            </StatsNullState>
                        :
                            <div className='stats__cardlist'>
                                {
                                    userStats.map((s) => (
                                        <StatCardLite 
                                            key={s.index}
                                            title={s.title}
                                            value={s.value}
                                            icon={s.icon}
                                            telemetry={s.telemetry}
                                            timespan={s.timespan}
                                            color={s.color}
                                        />
                                    ))
                                }
                            </div>
                    }
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
    grid-template-rows: 5em auto 1fr;
    grid-template-areas:
        'welcome'
        'stats'
        'main';
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    margin: 1em 1em 0 1em;
`;

const Welcome = styled.section`
    grid-area: welcome;
    display: flex;
    flex-flow: column nowrap;
    margin-top: 1rem;

    font-family: 'Poppins', 'Sans Serif';
    font-size: 1em;
    color: #7e858c;

    & .welcome__name {
        font-weight: 700;
        color: #101315;
    }
`;

const StatsWrapper = styled.section`
    grid-area: stats;
    display: flex;
    flex-flow: column nowrap;
    
    & .stats__cardlist {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 2px solid #ebeff4;
        border-radius: 0.5em;
    }
`;

const StatsHeader = styled.h3`
    font-family: 'Poppins', 'Sans Serif';
    font-size: 1rem;
    font-weight: 500;
    color: #101315;
    margin: 0;
`;

const StatsNullState = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items center;
    padding: 32px;

    & > svg.null-state__icon {
        height: 1.25rem;
        width: 1.25rem;
        fill: #bfbfbf;
        margin-bottom: 1rem;
    }

    & > span {
        margin: 0 0 0 0.5rem;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 0.8125rem;
        color: #bfbfbf;
    }
`;

const MainWrapper = styled.section`
    grid-area: main;
`;