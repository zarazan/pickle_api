import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import pickleApi from '../../services/pickle_api';
import { usePoolDispatch, usePoolState } from '../../contexts/PoolContext';
import { currencyFormatter } from '../../utilities/helpers';

import BetCard from './BetCard';
import EnterWager from './EnterWager';
import FullPageSpinner from '../FullPageSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GameOdds = () => {
    const { poolId } = useParams(); // pool id from url
    const history = useHistory();
    const dispatch = usePoolDispatch();
    const state = usePoolState();
    const placeWager = (amount) => dispatch({ type: 'PLACE_WAGER', wager: amount });

    const [componentState, setState] = useState('idle'); // used for component state tracking
    const [errorMessage, setErrorMessage] = useState(''); // used for displaying errors

    const [betCount, setBetCount] = useState(0); // counter for bets made
    const [currentBet, setCurrentBet] = useState(null); // holds the current bet for sending bet info to enter wager
    const [fixtures, setFixtures] = useState([]); // array of pool fixtures
    const [currentFixture, setCurrentFixture] = useState(null); // holds the current fixture for sending game info to enter wager
    const [toggleBetSlip, setToggleBetSlip] = useState(false); // used for toggling the bet slip entry form

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setState('loading');
        fetchFixtures(poolId);
    }, []);

    return (
        <>
            {componentState === 'error' 
                ? <div>{errorMessage}</div>
                : componentState === 'loading'
                    ? <FullPageSpinner loading={true} optionalMessage={'Loading Odds'}/>
                    : componentState === 'finished' &&
                            <GameOddsWrapper className='game-odds-container'>
                                <div className='game-odds-info'>
                                    <Header className='game-odds-header'>
                                        <button 
                                            className='game-odds__back-nav' 
                                            onClick={() =>history.push(`/pools/${poolId}`)}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} size='lg' />
                                        </button>
                                        <Title className='game-odds__title'>{'SCHEDULE & ODDS'}</Title>
                                    </Header>
                                    <Bankroll className='user-bankroll'>
                                        <h3>{'YOUR BANKROLL'}</h3>
                                        <h2 className='user-bankroll'>{currencyFormatter.format(state.bank)}</h2>
                                        <h4>{`${state.betCount} OPEN BETS`}</h4>
                                    </Bankroll>

                                </div>
                                <div className='game-odds-main'>
                                    {toggleBetSlip 
                                    ?
                                        <EnterWager
                                            className='enter-wager-form'
                                            currentBet={currentBet}
                                            currentFixture={currentFixture}
                                            placeBet={placeBet}
                                            closeBetSlip={closeBetSlip}
                                            errors={errorMessage}
                                        />
                                    :
                                        <>
                                            <BetSlipTotals className='game-odds-totals'>
                                                <div className='totals__bankroll'></div>
                                                <div className='totals__headers'>
                                                    <div className='headers__game header-label'>
                                                        <h4>{'GAME'}</h4>
                                                    </div>
                                                    <div className='headers__odd-labels'>
                                                        <div className='headers__spread header-label'>
                                                            <h4>{'POINT'}</h4><h4>{'SPREAD'}</h4>
                                                        </div>
                                                        <div className='headers__points header-label'>
                                                            <h4>{'TOTAL'}</h4><h4>{'POINTS'}</h4>
                                                        </div>
                                                        <div className='headers__moneyline header-label'>
                                                            <h4>{'MONEY'}</h4><h4>{'LINE'}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </BetSlipTotals>
                                            <BetCardList className='game-odds-cardlist'>
                                                {(fixtures || [])
                                                    .map((fixture, index) => (
                                                        <BetCard 
                                                            key={index}
                                                            fixtureId={fixture.id}
                                                            locked={fixture.locked}
                                                            homeTeamName={fixture.homeTeamName}
                                                            homeTeamId={fixture.homeTeamId}
                                                            awayTeamName={fixture.awayTeamName}
                                                            awayTeamId={fixture.awayTeamId}
                                                            odds={fixture.odds}
                                                            gameDate={fixture.startTime}
                                                            selectBet={selectBet}
                                                        /> 
                                                ))}
                                            </BetCardList>
                                        </>
                                    }

                                </div>
                            </GameOddsWrapper>
                }
        </>
    );

    /** closeBetSlip: Toggle the bet slip display and clears the current fixture and bet from state. */
    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip);
        setCurrentFixture(null);
        setCurrentBet(null);
    }

    /** selectBet: Adds the selected fixture and bet to state and opens the bet slip wager form. */
    function selectBet(fixtureId, betId) {
        const [ fixtureObject ] = fixtures.filter(fixture => fixture.id === fixtureId);
        setCurrentFixture(fixtureObject);
        const [ betObject ] = fixtureObject.odds.filter(odd => odd.id === betId);
        setCurrentBet(betObject);
        setToggleBetSlip(!toggleBetSlip);
    }

    /** fetchFixtures: Fetches the fixtures for the pool and add them to state. */
    function fetchFixtures(id) {
        pickleApi.getFixtures(id)
            .then(data => {
                setFixtures(data);
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
    }

    /** placeBet: Sends Pickle API request for placing a bet.**/
    function placeBet(betId, betAmount) {
        // create response body
        let resp = {};
        resp.pool_id = poolId;
        resp.odd_id = betId;
        resp.amount = betAmount;

        pickleApi.createBet(resp)
            .then(data => {
                setBetCount(betCount + 1);
                placeWager(data.amount);
                
                setToggleBetSlip(false);
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
    }
};

export default GameOdds; 

const GameOddsWrapper = styled.section`
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-row-gap: 1rem;
    box-sizing: border-box;

    height: 100%;
    margin: 1em 1em 0 1em;

    & > div {
        display: flex;
        flex-flow: column nowrap;
    }
`;

const BetCardList = styled.div`
    padding: 0 0.1em 0 0.1rem;
`;

const Header = styled.header`
    display: grid;
    grid-template-columns: 10% 1fr 10%;
    grid-template-areas:
        'left title right';
    height: 1.75rem;

    & button.game-odds__back-nav {
        grid-area: left;
        background: none;
        border: none;
        outline: none;
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

const Bankroll = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 1.5rem 0 1rem 0;

    & h4 {
        margin: 0;
        font-family: 'Inter', 'Sans Serif';
        font-size: .7rem;
        font-weight: 300;
        color: black;
    }

    & h3 {
        margin: 0;
        font-size: .8125rem;
        font-family: 'Inter', 'Sans Serif';
        letter-spacing: 0.6125;
        color: #8b8c8f;
    }

    & h2 {
        margin: 0.7rem 0 0.3rem 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 2.5rem;
        color: #8fd6a9;
    }
`;

const BetSlipTotals = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 1rem 0 1rem 0;

    font-family: 'Inter', 'Sans Serif';

    & .totals__bankroll {
        display: flex;
        justify-content: flex-end;
        padding-right: 1rem;
    }

    & .totals__headers {
        display: grid;
        grid-template-columns: 45% 1fr;

        & .headers__game {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            align-content: center;
            padding-left: 1rem;
        }

        & .header-label {
            & > h4 {
                margin: 0;
                font-size: .7rem;
                font-weight: 400;
                letter-spacing: .0625em;
                color: #8b8c8f;
            }
        }

        & .headers__odd-labels {
            display: grid;
            flex-flow: column nowrap;
            box-sizing: border-box;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.2em;

            & .headers__spread, .headers__points, .headers__moneyline {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            }
        }
    }
`;