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
    const [betMode, setBetMode] = useState('SINGLE');
    const [betAccumulator, setBetAccumulator] = useState([]);
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
            {componentState === 'ERROR' 
                ? <div>{errorMessage}</div>
                : componentState === 'LOADING'
                    ? <FullPageSpinner loading={true} optionalMessage={'Loading Odds'}/>
                    : componentState === 'FINISHED' &&

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
                                    </GameOddsUserInformation>

                                </div>

                                <div className='l-column-flex'>
                                    {toggleBetSlip 
                                        ?
                                            <EnterWager
                                                className='enter-wager-form l-column-flex__item'
                                                currentBets={betAccumulator}
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
        let newBetObject = betObject;
        newBetObject.gameName = `${fixtureObject.awayTeamName} at ${fixtureObject.homeTeamName}`;
        // Set the current bets to pass through as props to the EnterWager component.
        updateBetAccumulatorCache(newBetObject);
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
        
    /*
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
                setState('FINISHED');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('ERROR');
            });
    }

    /**
     * placeBet: Sends Pickle API request for placing a bet.
     * @param {array} betIds - The bet ID to send in the API request.
     * @param {number} betAmount - The bet amount to send in the API request.
     */
    function placeBet(betIds, betAmount) {
        // create response body
        let resp = { bet: {}};
        resp.bet.pool_id = poolId;
        if (betIds.length > 1) {
            resp.bet.odd_ids = betIds
        } else {
            const [ id ] = betIds;
            resp.bet.odd_id = id;
        }
        resp.bet.amount = betAmount;

        pickleApi.createBet(resp)
            .then(data => {
                // Update the bet count.
                setBetCount(betCount + 1);
                // Send the place wager dispatch to update the pool state.
                placeWager(data.amount);
                
                setCurrentFixture(null); // Clear the current fixture.
                setBetMode('SINGLE'); // Reset the bet mode.
                setBetAccumulator([]); // Reset the bet cache.
                setToggleBetSlip(false); // Reset the enter wager form.
                setState('FINISHED');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('ERROR');
            });
    }

    /** closeBetSlip: Toggle the bet slip display and clears the current fixture and bet from state. */
    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip); // Toggle the betslip off.
        setCurrentFixture(null); // Reset the current fixture.
        setBetMode('SINGLE'); // Reset the bet mode.
        setBetAccumulator([]); // Reset the bet cache.
        setCurrentBet(null); // Reset the current bet.
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