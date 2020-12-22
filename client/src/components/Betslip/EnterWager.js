import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { usePoolState } from '../../contexts/PoolContext';
import { decToAmerican, calculatePayout, currencyFormatter, formatBetMetric } from '../../utilities/helpers';

import WagerItem from './WagerItem';

const EnterWager = ({ currentFixture, currentBet, placeBet, closeBetSlip, currentMode, toggleBetMode }) => { 
    const { bank } = usePoolState();
    const [game, setGame] = useState(''); // The name of the fixture (game) in the format {awayTeam} vs {homeTeam}.
    const [ratio, setRatio] = useState(null); // The converted odd ratio.
    const [wager, setWager] = useState('0'); // The wager in dollars for the current bet.
    const [payout, setPayout] = useState(0); // The payout in dollars for the current bet.
    const [showFullCalculator, setShowFullCalculator] = useState(false); // Bool to indicate whether to show the full calculator.
    
    // A hash for formatting the bets for the user.
    const betHash = {
        'money_line': 'Money Line',
        'spread': 'Point Spread',
        'over': 'Total Points',
        'under': 'Total Points',
    };

    /** Scroll the window to the top of the page to avoid jarring the user. */
    useEffect(() => window.scrollTo(0, 0), []);

    /** Calculate the payout whenever the wager changes. */
    useEffect(() => handlePayout(), [wager]);

    /** Convert the ratio to american odds on component mount. */
    useEffect(() => setRatio(decToAmerican(currentBet.ratio)), []);

    /** Create the game name format for the wager entry form. */
    useEffect(() => setGameName(), []);

    return (
        <EnterWagerWrapper className='c-wager-entry l-column-flex'>

            <WagerSummary className='l-column-flex l-column-flex__item'>
                <div className='l-grid'>
                    <div className='l-grid__item l-column-flex'>
                        <p className='c-wager-entry__label'>{'Odds'}</p>
                        <h3 className='c-wager-entry__text'>{ratio}</h3>
                    </div>
                    <div className='l-grid__item l-column-flex'>
                        <p className='c-wager-entry__label'>{'Wager'}</p>
                        <h3 className='c-wager-entry__text'>{currencyFormatter.format(wager)}</h3>
                    </div>
                    <div className='l-grid__item l-column-flex'>
                        <p className='c-wager-entry__label'>{'Payout'}</p>
                        <h3 className='c-wager-entry__text'>{currencyFormatter.format(payout)}</h3>
                    </div>
                </div>
            </WagerSummary>

            <WagerItemList className='l-column-flex l-column-flex__item'>
                <WagerItem 
                    key={1}
                    teamName={currentBet.type === 'over' || currentBet.type === 'under' ? '' : currentBet.teamName}
                    betType={betHash[currentBet.type]}
                    metric={formatBetMetric(currentBet.type, currentBet.metric)}
                    ratio={currentBet.american > 0 ? `+${currentBet.american}` : currentBet.american}
                />
            </WagerItemList>

            <Calculator4Row className='l-grid l-column-flex__item'>
                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='20' onClick={e => addNumber(e.target.name)}>+$20</CalculatorButton>
                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='50' onClick={e => addNumber(e.target.name)}>+$50</CalculatorButton>
                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='100' onClick={e => addNumber(e.target.name)}>+$100</CalculatorButton>
                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' onClick={() => clearWager()}>Clear</CalculatorButton>
            </Calculator4Row>

            <div className='l-column-flex l-column-flex__item'>
                <button onClick={() => toggleFullCalculator()}>{showFullCalculator ? 'Hide Full Calculator' : 'Show Full Calculator'}</button>
            </div>

            {showFullCalculator
                ?
                    <>
                        <FullCalculator className='l-column-flex l-column-flex__item'>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='1' onClick={e => handleInput(e.target.name)}>1</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='2' onClick={e => handleInput(e.target.name)}>2</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='3' onClick={e => handleInput(e.target.name)}>3</CalculatorButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='4' onClick={e => handleInput(e.target.name)}>4</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='5' onClick={e => handleInput(e.target.name)}>5</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='6' onClick={e => handleInput(e.target.name)}>6</CalculatorButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='7' onClick={e => handleInput(e.target.name)}>7</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='8' onClick={e => handleInput(e.target.name)}>8</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='9' onClick={e => handleInput(e.target.name)}>9</CalculatorButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='.' onClick={e => handleInput(e.target.name)}>.</CalculatorButton>
                                <CalculatorButton className='l-grid__item btn c-wager-entry__calculator-button' name='0' onClick={e => handleInput(e.target.name)}>0</CalculatorButton>
                            </Calculator3Row>
                        </FullCalculator>
                    </>
                : null
            }

            <CalculatorFooter className='l-grid l-column-flex__item'>
                <CalculatorButton
                    className={`l-grid__item btn c-wager-entry__wager-button ${parseFloat(wager) > bank && 'overdraft'}`}
                    disabled={wager && wager !== '0' && parseFloat(wager) <= bank ? false : true}
                    onClick={() => placeBet(currentBet.id, parseFloat(wager))}
                >
                    {parseFloat(wager) <= bank ? `Enter Wager` : `Insufficient Funds!`}
                </CalculatorButton>
                <CalculatorButton 
                    className='l-grid__item btn c-wager-entry__wager-button'
                    onClick={closeBetSlip}
                >
                    Cancel Wager
                </CalculatorButton>
            </CalculatorFooter>

        </EnterWagerWrapper>
    );

    /** setGameName: Sets the name of the game for display. */
    function setGameName() {
        setGame(`${currentFixture.awayTeamName} vs. ${currentFixture.homeTeamName}`);
    };

    /** handleInput: Appends a number on the wager entry. */
    function handleInput(value) {
        let currentWager = wager;

        // wager is initialized at zero
        if(wager === '0') {
            // set the initial wager if not zero or "."
            if(value !== '0' && value !== '.') {
                setWager(value);
            }
        // wager is a non-zero number
        } else { 
            // check if we have already have a decimal
            if (wager.includes('.')) {
                // don't allow additional decimals
                if (value !== '.') {
                    // constrain the remaining digits we can add
                    if (currentWager.slice(currentWager.indexOf('.') + 1).length < 2) {
                        // append the new number
                        currentWager += value;
                        setWager(currentWager);
                    }
                }
            }
            // wager doesn't include a decimal; allow any input
            else {
                currentWager += value;
                setWager(currentWager);
            }
        }
    };

    /** addNumber: Adds a number to the wager entry. */
    function addNumber(amount) {
        let currentWager = parseFloat(wager);
        let currentAmount = parseFloat(amount);
        currentWager += currentAmount;
        setWager(currentWager.toString());
    };

    /** handlePayout: Handle payout based on the odds and entered wager. */
    function handlePayout(){
        setPayout(calculatePayout(parseFloat(wager), ratio))
    };

    /** toggleFullCalculator: Toggles the full calculator display. */
    function toggleFullCalculator() {
        setShowFullCalculator(!showFullCalculator);
    }

    /** clearWager: Resets the wager entry and payout state. */
    function clearWager() {
        setWager('0');
        setPayout(0);
    };
};

EnterWager.propTypes = {
    currentFixture: PropTypes.object.isRequired, 
    currentBet: PropTypes.object.isRequired, 
    placeBet: PropTypes.func.isRequired, 
    closeBetSlip: PropTypes.func.isRequired, 
    currentMode: PropTypes.string.isRequired,
    toggleBetMode: PropTypes.func.isRequired, 
};

export default EnterWager;

const EnterWagerWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    height: 100%;
    width: 100%;

    & div.l-grid {
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

    & h3.c-wager-entry__heading {
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.7em;
        color: orange;
    }

    & div[class~='l-column-flex__item'] {
        margin-bottom: 12px;
    }

    & p.c-wager-entry__label {
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.7em;
        color: red;
        margin: 0;
    }

    & h3.c-wager-entry__text {
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.7em;
        color: green;
        margin: 0;
    }
`;

const WagerSummary = styled.div`
    div.l-grid {
        grid-template-columns: repeat(3, 1fr);

        & .l-grid__item {
            & p, h3 { text-align: center };
        }
    }
`;

const WagerItemList = styled.div`
    & > div {
        margin-bottom: 8px;
    }
`;

const FullCalculator = styled.div`
    display: flex;
    flex-flow: column nowrap;

    & div[class~='l-column-flex__item']:not(:last-of-type) {
        margin-bottom: 4px;
    }
`;

const Calculator4Row = styled.div`
    grid-template-columns: repeat(4, 1fr);
    column-gap: 4px;
    width: 100%;
`;

const Calculator3Row = styled.div`
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4px;
    width: 100%;
`;

const CalculatorButton = styled.button`
    box-sizing: border-box;
    padding: 0.5em 0 0.5em 0;

    background: #F2F2F2;
    border: none;
    border-radius: 4px;
    font-family: 'Inter', 'Sans Serif';
    font-size: 14px;
    outline: none;

    &:active {
        background: #8fd6a9;
        color: white;
    }

    &.c-wager-entry__wager-button {
        padding: 1em 0 1em 0;

        background-color: #ECF8FE;
        color: #3DB8F5;

        &:disabled {
            background: #eee;
            color: #b3b3b3;
        }

        &[class~='overdraft'] {
            background: #f03b58;
            color: white;
        }
    }
`;

const CalculatorFooter = styled.div`
    grid-template-columns: 66% 33%;
    column-gap: 4px;
    box-sizing: border-box;
    width: 100%;
`;