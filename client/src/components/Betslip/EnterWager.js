import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { usePoolState } from '../../contexts/PoolContext';
import { decToAmerican, calculatePayout } from '../../utilities/helpers';

const EnterWager = ({ currentFixture, currentBet, placeBet, closeBetSlip, betCount, errors }) => { 
    const [wager, setWager] = useState(0);
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
            <CalculatorHeader className='wager-row header'>
                {/* <div className='enter-wager__counter'>
                    <div className='counter__number'>{betCount ? betCount : 1}</div>
                    <div>Bet Slip</div>
                </div>
                <div className='enter-wager__toggle-multibet'>
                    <AddMoreButton disabled>+ Add More</AddMoreButton>
                </div> */}
            </CalculatorHeader>            
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
                        <input disabled type='number' value={`${parseInt(wager, 10).toFixed(2)}`} onChange={() => calculatePayout()}/>
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
                    <CalculatorButton className='btn calculator__button' name='1' onClick={e => appendNumber(e.target.name)}>1</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='2' onClick={e => appendNumber(e.target.name)}>2</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='3' onClick={e => appendNumber(e.target.name)}>3</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='4' onClick={e => appendNumber(e.target.name)}>4</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='5' onClick={e => appendNumber(e.target.name)}>5</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='6' onClick={e => appendNumber(e.target.name)}>6</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' name='7' onClick={e => appendNumber(e.target.name)}>7</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='8' onClick={e => appendNumber(e.target.name)}>8</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='9' onClick={e => appendNumber(e.target.name)}>9</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton className='btn calculator__button' disabled>.</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' name='0' onClick={e => appendNumber(e.target.name)}>0</CalculatorButton>
                    <CalculatorButton className='btn calculator__button' onClick={() => clearWager()}>Clear</CalculatorButton>
                </CalculatorRow>
            </Calculator>            
            <CalculatorFooter className='wager-row complete-cancel'>
                <CalculatorButton
                    className={`btn complete complete-cancel__button ${wager > bank && 'overdraft'}`}
                    disabled={wager && wager !== 0 && wager <= bank ? false : true}
                    onClick={() => placeBet(currentBet.id, wager)}
                >
                    {wager <= bank ? `Enter Wager Amount` : `Insufficient Funds!`}
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

    /** appendNumber: Appends a number on the wager entry. */
    function appendNumber(amount) {
        let currentWager = wager;
        // console.log(`appendNumber: initial wager: ${currentWager}`);
        if(wager === 0) {
            setWager(parseInt(amount, 10))
            return;
        }
        currentWager += '' + amount;
        // console.log(`appendNumber: after append: ${currentWager}`);
        setWager(parseInt(currentWager, 10));
    };

    /** addNumber: Adds a number to the wager entry. */
    function addNumber(amount) {
        let currentWager = wager;
        // console.log(`addNumber: initial wager: ${currentWager}`);
        currentWager += parseInt(amount, 10);
        // console.log(`appendNumber: after add: ${currentWager}`);
        setWager(parseInt(currentWager, 10));
    };

    /** handlePayout: Handle payout based on the odds and entered wager. */
    function handlePayout(){
        setPayout(calculatePayout(wager, ratio))
    };

    /** clearWager: Resets the wager entry and payout state. */
    function clearWager() {
        setWager(0);
        setPayout(0);
    };
};

EnterWager.propTypes = {

};

export default EnterWager;

const EnterWagerWrapper = styled.div`
    display: grid;
    grid-template-rows: 2em 1fr auto 4m;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
`;

const CalculatorHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    font-family: 'Poppins', 'Sans Serif';
    font-size: 0.7em;
    padding: 1em 0 1em 0;
    margin-bottom: 2em;
    border-bottom: 1px solid lightgrey;

    & .enter-wager__counter {
        display: flex;

        & > * {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & .counter__number {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            width: 2em;
            height: 2em;
            border-radius: 1em;
            background: green;
            color: white;
        }

        & div:last-of-type{
            margin-left: 1em;
            font-weight: 700;
        }
    }
    
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

const AddMoreButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: 'Inter', 'Sans Serif';
    color: green;
    font-weight: 700;
    border: none;
    outline: none;
    background: white;
    font-size: 1em;
`;

const CalculatorButton = styled.button`
    font-family: 'Inter', 'Sans Serif';
    font-size: 1em;
    padding: 0.5em 0 0.5em 0;
    background: white;
    border: 1px solid lightgrey;
    box-sizing: border-box;
    outline: none;

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