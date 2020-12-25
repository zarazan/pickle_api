import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import pickleApi from '../../services/pickle_api';
import { usePoolDispatch, usePoolState } from '../../contexts/PoolContext';
import { UserContext } from '../../contexts/UserContext';
import { currencyFormatter } from '../../utilities/helpers';

import BetCard from './BetCard';
import EnterWager from './EnterWager';
import FullPageSpinner from '../App/FullPageSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GameOdds = () => {
    const { poolId } = useParams(); // Pool id from url.
    const history = useHistory();
    const dispatch = usePoolDispatch(); 
    const state = usePoolState();
    const setBankroll = (poolId, bankroll) => dispatch( {type: 'SET_BANKROLL', poolId: poolId, bank: bankroll });
    const placeWager = (amount) => dispatch({ type: 'PLACE_WAGER', wager: amount });

    const [loginInfo] = useContext(UserContext); // The user object for the current user.

    const [componentState, setState] = useState('idle'); // Current tracked state of the component.
    const [errorMessage, setErrorMessage] = useState(''); // Current errors from data requests.

    const [betCount, setBetCount] = useState(0); // Counter for bets made.
    const [currentBet, setCurrentBet] = useState(null); // The current bet for sending bet info to enter wager.
    const [fixtures, setFixtures] = useState([]); // The current array of pool fixtures.
    const [currentFixture, setCurrentFixture] = useState(null); // The current fixture for sending game info to enter wager.
    const [toggleBetSlip, setToggleBetSlip] = useState(false); // Toggle bool for displaying the bet slip entry form.

    /** Scroll the window to the top of the page to avoid jarring the user. */
    useEffect(() => window.scrollTo(0, 0), []);

    /** Fetch and load the pool fixtures. */
    useEffect(() => {
        setState('loading');
        fetchFixtures(poolId);
    }, []);

    /** Initialize the users's bankroll in case they refresh the page. */
    useEffect(() => {
        setState('loading');
        fetchCurrentUser(poolId);
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
                                                            homeScore={fixture.homeScore}
                                                            awayTeamName={fixture.awayTeamName}
                                                            awayTeamId={fixture.awayTeamId}
                                                            awayScore={fixture.awayScore}
                                                            odds={fixture.odds}
                                                            gameDate={fixture.startTime}
                                                            selectBet={selectBet}
                                                            status={fixture.status}
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

    /**
     * selectBet: Adds the selected fixture and bet to state and opens the bet slip wager form.
     * @param {string} fixtureId - The ID for the given fixture.
     * @param {*} betId - The ID for the given bet.
     */
    function selectBet(fixtureId, betId) {
        const [ fixtureObject ] = fixtures.filter(fixture => fixture.id === fixtureId);
        setCurrentFixture(fixtureObject);
        const [ betObject ] = fixtureObject.odds.filter(odd => odd.id === betId);
        setCurrentBet(betObject);
        setToggleBetSlip(!toggleBetSlip);
    }

    /**
     * fetchCurrentUser: Fetches the entries for the pool and filters for the current user.
     * @param {id} poolId - The id for the current pool. 
     */
    function fetchCurrentUser(poolId) {
        pickleApi.getEntries(poolId)
            .then(entries => {
                // Get the entry for the current user by their id.
                const [ currentUser ] = entries.filter(entry => entry.userId === loginInfo.user.id);
                // Send dispatch to update pool context state with the current user's bankroll.
                setBankroll(poolId, currentUser.bank);
                setState('finished');
        })
        .catch(error => {
            console.log(error.toString());
            history.push('/sign-in');
            setErrorMessage(error.toString());
            setState('error');
        });
    }

    /**
     * fetchFixtures: Fetches the fixtures for the pool and add them to state.
     * @param {string} poolId - The id of the current pool.
     */
    function fetchFixtures(poolId) {
        pickleApi.getFixtures(poolId)
            .then(data => {
                // Sort the fixtures by date ascending and set them to state.
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
     * @param {string} betId  - The id of the bet being placed.
     * @param {string} betAmount - The amount of the bet being placed.
     */
    function placeBet(betId, betAmount) {
        // Create response body.
        let resp = {};
        resp.pool_id = poolId;
        resp.odd_id = betId;
        resp.amount = betAmount;

        pickleApi.createBet(resp)
            .then(data => {
                // Update the bet count.
                setBetCount(betCount + 1);
                // Send the place wager dispatch to update the pool state.
                placeWager(data.amount);
                // Toggle the betslip off.
                setToggleBetSlip(false);
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
    }

    /** closeBetSlip: Toggle the bet slip display and clears the current fixture and bet from state. */
    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip); // Toggle the betslip off.
        setCurrentFixture(null); // Reset the current fixture.
        setCurrentBet(null); // Reset the current bet.
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