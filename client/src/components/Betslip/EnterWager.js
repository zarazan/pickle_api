import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { usePoolState } from '../../contexts/PoolContext';
import { decToAmerican, calculatePayout } from '../../utilities/helpers';

const EnterWager = ({ currentFixture, currentBet, placeBet, closeBetSlip }) => { 
    const [wager, setWager] = useState('0');
    const [payout, setPayout] = useState(0);
    const [ratio, setRatio] = useState(null);
    const [game, setGame] = useState('');

    const { bank } = usePoolState();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });

    const betHash = {
        'money_line': 'Money Line',
        'spread': 'Point Spread',
        'over': 'Total Points',
        'under': 'Total Points',
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => (
        handlePayout()
    ), [wager]);

    useEffect(() => (
        setRatio(decToAmerican(currentBet.ratio))
    ), []);

    useEffect(() => (
        setGameName()
    ), []);

    return (
        <EnterWagerWrapper className='enter-wager-container'>   
            <CalculatorSummary className='wager-row summary'>
                <div className='enter-wager__bet-summary summary-item'>
                    <div className=''>
                        <span>{currentBet.teamName} </span>
                        <span>
                            {currentBet.metric
                                ? currentBet.type === 'over' || currentBet.type === 'under'
                                    ? currentBet.type === 'over'
                                        ? `Over ${currentBet.metric}`
                                        : `Under ${currentBet.metric}`
                                : currentBet.metric > 0 
                                    ? `+${currentBet.metric}`
                                    : currentBet.metric
                            : ''}
                        </span>
                    </div>
                    <div className=''>{betHash[currentBet.type]}</div>
                    <div className=''>{game}</div>
                </div>    
                <div className='enter-wager__bet-total summary-item'>
                    <div className=''>
                        {ratio > 0
                            ? `+${ratio}`
                            : ratio
                        }
                    </div>
                    <div className='wager'>
                        <span>$</span>
                        <input disabled type='text' value={wager === '' ? 0 : `${parseFloat(wager).toFixed(2)}`} onChange={() => calculatePayout()}/>
                    </div>
                    <div className=''>{`Payout: ${formatter.format(payout)}`}</div>
                </div>    
            </CalculatorSummary>            
            <Calculator className='wager-row calculator'>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='1' onClick={e => addNumber(e.target.name)}>+$1</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='5' onClick={e => addNumber(e.target.name)}>+$5</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='20' onClick={e => addNumber(e.target.name)}>+$20</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='1' onClick={e => handleInput(e.target.name)}>1</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='2' onClick={e => handleInput(e.target.name)}>2</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='3' onClick={e => handleInput(e.target.name)}>3</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='4' onClick={e => handleInput(e.target.name)}>4</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='5' onClick={e => handleInput(e.target.name)}>5</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='6' onClick={e => handleInput(e.target.name)}>6</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='7' onClick={e => handleInput(e.target.name)}>7</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='8' onClick={e => handleInput(e.target.name)}>8</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='9' onClick={e => handleInput(e.target.name)}>9</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='.' onClick={e => handleInput(e.target.name)}>.</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='0' onClick={e => handleInput(e.target.name)}>0</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' onClick={() => clearWager()}>Clear</CalculatorButton>
                </CalculatorRow>
            </Calculator>            
            <CalculatorFooter className='wager-row complete-cancel'>
                <CalculatorButton
                    className={`btn complete complete-cancel__button ${parseFloat(wager) > bank && 'overdraft'}`}
                    disabled={wager && wager !== '0' && parseFloat(wager) <= bank ? false : true}
                    onClick={() => placeBet(currentBet.id, parseFloat(wager))}
                >
                    {parseFloat(wager) <= bank ? `Enter Wager Amount` : `Insufficient Funds!`}
                </CalculatorButton>
                <CalculatorButton 
                    className='btn cancel complete-cancel__button'
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
};

export default EnterWager;

const EnterWagerWrapper = styled.div`
    display: grid;
    grid-template-rows: 4rem min-content 4rem;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
`;

const CalculatorSummary = styled.div`
    display: grid;
    grid-template-columns: 66% 33%;
    font-family: 'Inter', 'Sans Serif';
    font-size: 0.7em;
    height: 100%;
    margin-bottom: 2em;

    .summary-item {
        display: flex;
        flex-flow: column nowrap;

        & > div {
            box-sizing: border-box;
            margin-bottom: 0.2em;
        }
    }

    .enter-wager__bet-total {
        align-items: flex-end;
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.7rem;

        & input {
            box-sizing: border-box;
            width: 100%;
            text-align: right;
            font-family: 'Inter', 'Sans Serif';
            color: lightgrey;
            background: white;
            border: 1px solid lightgrey;
            font-size: 0.7rem;
        }

        & .wager {
            display: grid;
            grid-template-columns: 2em 1fr;

            & > span {
                text-align: center;
                border-top: 1px solid lightgrey;
                border-left: 1px solid lightgrey;
                border-bottom: 1px solid lightgrey;
            }

            & * {
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
            }
        }
    }
`;

const Calculator = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const CalculatorRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    &:first-of-type {
        margin-bottom: 0.5em;
    }
`;

const CalculatorFooter = styled.div`
    display: grid;
    grid-template-columns: 66% auto;
    grid-column-gap: 0.5em;
    margin-top: 1em;
    box-sizing: border-box;
`;

const CalculatorButton = styled.button`
    font-family: 'Inter', 'Sans Serif';
    font-size: 1em;
    padding: 0.5em 0 0.5em 0;
    background: white;
    border: 1px solid lightgrey;
    box-sizing: border-box;
    outline: none;

    &:active {
        background: #8fd6a9;
        color: white;
    }

    &.complete-cancel__button {
        padding: 1em 0 1em 0;

        border: none;
        border-radius: 0.4em;
        background-color: #eaf3fd;
        color: #5698d6;
        font-size: 0.8rem;

        &[class~='complete'] {
            background: #34b25e;
            color: white;
        }

        &:disabled {
            background: #eee;
            color: #b3b3b3;
        }

        &[class~='overdraft'] {
            background: #e44242;
            color: white;
        }
    }
`;