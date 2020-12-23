import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import pickleApi from '../../services/pickle_api';
import { usePoolDispatch, usePoolState } from '../../contexts/PoolContext';
import { currencyFormatter } from '../../utilities/helpers';
import MOCK_FIXTURES from '../../constants/mockFixtures';

import BetCard from './BetCard';
import EnterWager from './EnterWager';
import FullPageSpinner from '../App/FullPageSpinner';

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
    const [fixtures, setFixtures] = useState([MOCK_FIXTURES]); // array of pool fixtures // TODO: default to empty array
    const [currentFixture, setCurrentFixture] = useState(null); // holds the current fixture for sending game info to enter wager
    const [toggleBetSlip, setToggleBetSlip] = useState(false); // used for toggling the bet slip entry form
    
    // parlay bet state
    const [currentBet, setCurrentBet] = useState([]); // holds the current bet for sending bet info to enter wager
    const [betMode, setBetMode] = useState('SINGLE'); // defines the type of bet: single or accumulate
    const [betAccumulator, setBetAccumulator] = useState([]); // { fixture: ID, bet: ID }

    /** Scroll the window to the top of the page to avoid jarring the user. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /** Fetch all fixtures for the pool and add them to state. */
    useEffect(() => {
        setState('loading'); // TODO: undo comment
        // fetchFixtures(poolId); // TODO: undo comment
        setState('finished'); // TODO: remove
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
                                        <h4>{`${state.betCount} BETS`}</h4>
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
                                            currentMode={betMode}
                                            toggleBetMode={toggleBetMode}
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
                                                {fixtures.map((fixture, index) => (
                                                        <BetCard 
                                                            key={index}
                                                            fixture={fixture}
                                                            odds={fixture.odds}
                                                            selectedBets={betAccumulator}
                                                            selectBet={selectBet}
                                                        /> 
                                                ))}
                                            </BetCardList>
                                        </>
                                    }
                                </div>
                                <p>{betAccumulator.join('')}</p>
                            </GameOddsWrapper>
                }
        </>
    );

    /** toggleBetMode: Toggles the betMode and closes the enter wager display. */
    function toggleBetMode() {
        setToggleBetSlip(!toggleBetSlip); // close the bet slip wager form
        setBetMode('ACCUMULATE'); // toggle the betMode state
    };

    /** closeBetSlip: Toggle the bet slip display and clears the current fixture and bet from state. */
    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip); // close the bet slip wager form
        setCurrentFixture(null); // clear the current fixture
        setCurrentBet(null); // clear the current bet
        setBetAccumulator([]);
        setBetMode('SINGLE'); // reset the bet mode
    };

    /** 
     * selectBet: Adds the selected fixture and bet to state and opens the bet slip wager form. 
     * @param {string} fixtureId - The ID for the selected fixture.
     * @param {string} betId - The ID for the selected bet.
     * */
    function selectBet(fixtureId, betId) {
        // Get the fixture object that was selected by the user and set it in state.
        const [ fixtureObject ] = fixtures.filter(fixture => fixture.id === fixtureId);
        setCurrentFixture(fixtureObject);
        // Get the bet object that was selected by the user and set it in state.
        const [ betObject ] = fixtureObject.odds.filter(odd => odd.id === betId);
        // Set the current bet to pass through as props to the EnterWager component.
        setCurrentBet(betObject);
        
        // Cache the selected bet
        updateSelectedBets(betId);
        setToggleBetSlip(!toggleBetSlip);
    }

    /**
     * updateSelectedBets: Updates the selected bets in state.
     * @param {string} betId - The bet ID to add or remove out of the bet cache.
     */
    function updateSelectedBets(betId) {
        let currentBets = [...betAccumulator];
        let newBets;

        // Check to see if the id is already in the array; remove it if so; add it otherwise
        if (currentBets.indexOf(betId) > -1) {
            const indexToRemove = currentBets.indexOf(betId);

            if(indexToRemove === 0) {
                newBets = currentBets.slice(1);
            } else {
                // Remove the existing element
                currentBets.splice(indexToRemove, 1);
                newBets = currentBets;
            }
            // State update
            setBetAccumulator([...newBets]); 
        } else {
            setBetAccumulator([...betAccumulator, betId]);
        }
    }


    /**
     * fetchFixtures: Fetches the fixtures for the pool and add them to state.
     * @param {string} id - The fixture ID to send in the API request.
     */
    function fetchFixtures(id) {
        pickleApi.getFixtures(id)
            .then(data => {
                // sort the fixtures by date
                const sortedFixtures = data.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime));
                setFixtures(sortedFixtures);
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
    }

    /**
     * placeBet: Sends Pickle API request for placing a bet.
     * @param {*} betId - The bet ID to send in the API request.
     * @param {*} betAmount - The bet amount to send in the API request.
     */
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
                
                setCurrentFixture(null); // Clear the current fixture
                setCurrentBet(null); // Clear the current bet
                setBetMode('SINGLE'); // Reset the bet mode
                setBetAccumulator([]); // Reset the bet cache
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
    row-gap: 12px;
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
    margin-top: 1.5rem;

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
        margin: 6px 0 6px 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 24pxrem;
        color: #53DFB5;
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