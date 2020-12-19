import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import pickleApi from '../../services/pickle_api';

import FullPageSpinner from '../App/FullPageSpinner';
import RowResult from './RowResult';
import WinnerCard from './WinnerCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Leaderboard = () => {
    const { poolId } = useParams(); // pool id from url
    const history = useHistory();

    const [componentState, setComponentState] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(''); // used for displaying errors
    const [entries, setEntries] = useState([]); // array of entries

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setComponentState('loading');
        fetchAndSetEntries(poolId);
    }, []);

    return (
        <LeaderboardWrapper className='leaderboard-container'>
            {componentState === 'error'
                ? <div>{errorMessage}</div>
                : componentState === 'loading'
                    ? <FullPageSpinner loading={true} optionalMessage={'Loading Leaderboard'}/>
                    : componentState === 'finished'
                        ? 
                            <>
                                <Header>
                                    <button className='leaderboard__back-nav' onClick={() => history.push(`/pools/${poolId}`)}><FontAwesomeIcon icon={faArrowLeft} size='1x' /></button>
                                    <Title className='leaderboard__title subsection'>LEADERBOARD</Title>
                                </Header>
                                <WinnerCircle className='leaderboard__leader subsection'>
                                    {entries.slice(0, 3).map((result, index) => (
                                        <WinnerCard 
                                            key={index}
                                            rank={index + 1}
                                            avatar={result.image}
                                            name={result.userName}
                                            bankroll={result.bankrollPlusActiveBets}
                                        />
                                    ))}
                                </WinnerCircle>
                                <TitleBar className='leaderboard-title-bar'>
                                    <span className='rank'>Rank</span>
                                    <span className='user'>User</span>
                                    <span className='bankroll'>Bankroll</span>
                                    <span className='wagers'>Wagers</span>
                                </TitleBar>
                                <PlacesList className='leaderboard__places subsection'>
                                    {(entries.slice(3)).map((result, index) => (
                                        <RowResult 
                                            key={index}
                                            rank={index + 4}
                                            avatar={result.image}
                                            name={result.userName}
                                            bankroll={result.bankrollPlusActiveBets}
                                            wagers={null}
                                        />
                                    ))}
                                </PlacesList>
                            </>
                        : null
            }
        </LeaderboardWrapper>
    );

     /** fetchAndSetEntries: Fetches the entries for the pool and adds them to state. */
     function fetchAndSetEntries(id) {
        pickleApi.getEntries(id)
            .then(entries => {
                // add entries to state
                setEntries(entries);
                setComponentState('finished');
        })
        .catch(error => {
            history.push('/sign-in');
            setErrorMessage(error.toString());
            setComponentState('error');
        });
    }
};

export default Leaderboard;

const LeaderboardWrapper = styled.div`
    box-sizing: border-box;
    margin: 1em 1em 0 1em;
    height: 100%;
    overflow: auto;
`;

const Header = styled.header`
    display: grid;
    grid-template-columns: 10% 1fr 10%;
    grid-template-areas:
        'left title right';
    height: 1.75rem;

    & button.leaderboard__back-nav {
        grid-area: left;
        background: none;
        border: none;
        outline: none;
    }
`;

const TitleBar = styled.div`
    display: grid;
    grid-template-columns: 66px 1fr 70px 70px;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 8px;

    background-color: white;
    color: #f2f2f2;
    border-bottom: 1px solid #f2f2f2;

    & span {
        font-family: 'Inter', 'Sans Serif';
        font-size: 12px;
        font-weight: 700;
        color: #151415;
    }

    & span.bankroll, span.wagers {
        text-align: center;
    }
`;

const Title = styled.h3`
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    
    margin: 0;

    font-family: 'Poppins', 'Sans Serif';
    font-size: .8125rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;

const WinnerCircle = styled.div`
    display: grid;
    grid-template-columns: 30% 1fr 30%;
    grid-template-areas:
        'second first third';
    box-sizing: border-box;
    margin: 1em 0 1em 0;

    .trophy {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .winner-card-1 {
        grid-area: first;
    }

    .winner-card-2 {
        grid-area: second;
    }

    .winner-card-3 {
        grid-area: third;
    }
`;

const PlacesList = styled.div`
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    padding: 0 0.1rem 0.75rem 0.1rem;
`;