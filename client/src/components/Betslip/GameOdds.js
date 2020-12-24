import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

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
    useEffect(() => window.scrollTo(0, 0), []);

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

                            <GameOddsWrapper className='c-game-odds l-grid'>
                                <div className='l-grid__item'>

                                    <GameOddsHeader className='l-grid'>
                                        <button 
                                            className='btn c-game-odds__back-button l-grid__item' 
                                            onClick={() =>history.push(`/pools/${poolId}`)}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} size='lg' />
                                        </button>
                                        <h3 className='c-game-odds__title l-grid__item'>{'SCHEDULE & ODDS'}</h3>
                                    </GameOddsHeader>

                                    <GameOddsUserInformation className='l-column-flex'>
                                        <h4 className='c-game-odds__label'>{'Bankroll'}</h4>
                                        <h2 className='c-game-odds__text'>{currencyFormatter.format(state.bank)}</h2>
                                        {/* <h4>{`${state.betCount} BETS`}</h4> */}
                                    </GameOddsUserInformation>

                                </div>

                                <div className='l-column-flex'>
                                    {toggleBetSlip 
                                        ?
                                            <EnterWager
                                                className='enter-wager-form l-column-flex__item'
                                                currentBets={betAccumulator}
                                                currentFixture={currentFixture}
                                                placeBet={placeBet}
                                                closeBetSlip={closeBetSlip}
                                                errors={errorMessage}
                                                toggleBetMode={toggleBetMode}
                                                updateBetAccumulatorCache={updateBetAccumulatorCache}
                                            />
                                        :
                                            <>
                                                {betMode === 'ACCUMULATE'
                                                    ?
                                                        <>
                                                            <AccumulatorBanner className='l-row-flex l-column-flex__item'>
                                                                <button 
                                                                    className='c-game-odds__accumulator-view-betslip' 
                                                                    onClick={() => handleAccumulatorViewBetSlip()}
                                                                >
                                                                    <p className='c-game-odds__accumulator-text'>View Bet Slip</p>
                                                                    <div className='l-row-flex'>
                                                                        <p className='c-game-odds__accumulator-text'>{`${betAccumulator.length}`}</p>
                                                                    </div>
                                                                </button>
                                                            </AccumulatorBanner>
                                                        </>
                                                    : null
                                                }
                                                <GameOddsColumnHeaders className='l-grid l-column-flex__item'>
                                                    <h4 className='c-game-odds__column-heading l-grid__item'>{`Game \n Summary`}</h4>
                                                    <ColumnRow className='l-grid'>
                                                        <h4 className='c-game-odds__column-heading l-grid__item'>{`Point \n Spread`}</h4>
                                                        <h4 className='c-game-odds__column-heading l-grid__item'>{`Total \n Points`}</h4>
                                                        <h4 className='c-game-odds__column-heading l-grid__item'>{`Money \n Line`}</h4>
                                                    </ColumnRow>
                                                </GameOddsColumnHeaders>
                                                
                                                <BetCardList className='game-odds-cardlist l-column-flex__item'>
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
                            </GameOddsWrapper>
                }
        </>
    );

    /** handleAccumulatorViewBetSlip:  */
    function handleAccumulatorViewBetSlip() {
        // Show the beslip with all added bets
        setToggleBetSlip(true); // Open the bet slip wager form.
    }

    /** toggleBetMode: Toggles the betMode and closes the enter wager display. */
    function toggleBetMode() {
        setToggleBetSlip(!toggleBetSlip); // close the bet slip wager form
        setBetMode('ACCUMULATE'); // toggle the betMode state
    };

    /** closeBetSlip: Toggle the bet slip display and clears the current fixture and bet from state. */
    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip); // Close the bet slip wager form.
        setCurrentFixture(null); // Reset the current fixture.
        setBetAccumulator([]); // Reset the bet accumulator.
        setBetMode('SINGLE'); // Reset the bet mode.
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

        // Set the current bets to pass through as props to the EnterWager component.
        updateBetAccumulatorCache(betObject);
        // Don't toggle the Enter Wager form if we're in accumulating mode
        if (betMode === 'SINGLE') {
            setToggleBetSlip(!toggleBetSlip);
        }
    }

    /**
     * updateCurrentBetObjectCache: Updates the selected bet objects in state.
     * @param {object} betObject - A bet object.
     */
    function updateBetAccumulatorCache(betObject) {
        let oldBets = [...betAccumulator];
        let newBets;

        // Find the index of the object if it exists
        let indexToRemove = oldBets.findIndex(b => b.id === betObject.id);
        // Check to see if the id is already in the array; remove it if so; add it otherwise
        if (indexToRemove > -1) {
            // Item is found at the first position
            if(indexToRemove === 0) {
                newBets = oldBets.slice(1);
            // Item is found at some position other than the first
            } else {
                oldBets.splice(indexToRemove, 1);
                newBets = oldBets;
            }
            // State update
            setBetAccumulator([...newBets]); 
        } else {
            setBetAccumulator([...betAccumulator, betObject]);
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
     * @param {array} betIds - The bet ID to send in the API request.
     * @param {number} betAmount - The bet amount to send in the API request.
     */
    function placeBet(betIds, betAmount) {
        // create response body
        let resp = {};
        resp.pool_id = poolId;
        resp.odd_id = betIds;
        resp.amount = betAmount;

        // TODO: uncomment to post data
        // pickleApi.createBet(resp)
        //     .then(data => {
        //         setBetCount(betCount + 1);
        //         placeWager(data.amount);
                
        //         setCurrentFixture(null); // Clear the current fixture.
        //         setBetMode('SINGLE'); // Reset the bet mode.
        //         setBetAccumulator([]); // Reset the bet cache.
        //         setToggleBetSlip(false); // Reset the enter wager form.
        //         setState('finished');
        //     })
        //     .catch(error => {
        //         history.push('/sign-in');
        //         setErrorMessage(error.toString());
        //         setState('error');
        //     });
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

    & div.l-grid, header.l-grid {
        display: grid;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
    }

    & > div {
        display: flex;
        flex-flow: column nowrap;
    }

    & h4 {
        font-family: 'Inter', 'Sans Serif';
        font-size: 12px;
        font-weight: 400;
        margin: 0;
        letter-spacing: .0625em;
    }
`;

const GameOddsHeader = styled.header`
    grid-template-columns: 20px 1fr 20px;
    grid-template-areas:
        'left title right';

    & button.c-game-odds__back-button {
        grid-area: left;
        background: none;
        border: none;
        outline: none;

        & svg {
            height: 16px;
            width: 16px;
        }
    }

    & h3.c-game-odds__title {
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
    }
`;

const GameOddsUserInformation = styled.div`
    margin: 24px 6px 0 6px;

    & h4 {
        color: #a4b0bb;
    }

    & h2 {
        margin: 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 24px;
        color: #53DFB5;
    }
`;

const GameOddsColumnHeaders = styled.div`
    grid-template-columns: 45% 1fr;
    margin: 0 0 1rem 0;

    & h4:first-of-type {
        margin-left: 6px;
    }

    & h4:not(:first-of-type) {
        text-align: center;
    }

    & h4 {
        color: #a4b0bb;
        font-size: 12px;
    }
`;

const ColumnRow = styled.div`
    grid-template-columns: repeat(3, 1fr);
    column-gap: 6px;

    font-family: 'Inter', 'Sans Serif';

    & > .l-grid__item {
        display: flex;
        justify-content: center;
    }

    & > h4 {
        align-text: center;
    }
`;

const AccumulatorBanner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 16px 0;

    & > button.c-game-odds__accumulator-view-betslip {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        outline: none;
        padding: 6px;
        border-radius: 5px;
        box-shadow: 0px 1px 2px 1px #C5E9DE;

        & > div {
            justify-content: center;
            align-items: center;
            background: #53DFB5;
            color: white;
            border-radius: 3px;
            height: 18px;
            width: 18px;
            margin-left: 12px;
            font-family: 'Inter', 'Sans Serif';
            font-size: 13px;
            font-weight: 600;
        }

        & > .c-game-odds__accumulator-text {
            font-family: 'Inter', 'Sans Serif';
            margin: 0;
            font-size: 13px;
            color: #53DFB5;
        }
    }
`;

const BetCardList = styled.div`
    padding: 0 0.1em 0 0.1rem;
`;