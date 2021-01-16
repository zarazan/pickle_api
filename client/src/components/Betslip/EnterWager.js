import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { usePoolState } from '../../contexts/PoolContext';
import { calculatePayout, currencyFormatter, decToAmerican } from '../../utilities/helpers';

import WagerItem from './WagerItem';
import { ReactComponent as Show } from '../../icons/show.svg';
import { ReactComponent as Hide } from '../../icons/hide.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';

const EnterWager = ({ currentBets, placeBet, closeBetSlip, toggleBetMode, updateBetAccumulatorCache }) => { 
    const { bank } = usePoolState();
    const [betCount, setBetCount] = useState(0); // The number of bets currently in the form.
    const [odd, setOdd] = useState(0.00);
    const [wager, setWager] = useState('0'); // The wager in dollars for the current bet.
    const [payout, setPayout] = useState(0); // The payout in dollars for the current bet.
    const [showFullCalculator, setShowFullCalculator] = useState(false); // Bool to indicate whether to show the full calculator.

    /** Scroll the window to the top of the page to avoid jarring the user. */
    useEffect(() => window.scrollTo(0, 0), []);

    /** Calculate the payout whenever the wager changes. */
    useEffect(() => handlePayout(), [wager]);

    /** Use the single bet odd or create a cumulative if parlay or teaser. */
    useEffect(() => handleOddCalculation(), []);

    /** Set the bet count. */
    useEffect(() => setBetCount(currentBets.length) ,[]);

    /** Calculate the aggregate odd. */
    useEffect(() => handleOddCalculation(), [betCount]);

    return (
        <EnterWagerWrapper className='c-wager-entry l-column-flex'>

            <WagerSummary className='l-column-flex l-column-flex__item'>
                <div className='l-grid'>
                    <div className='l-grid__item l-column-flex'>
                        <h4 className='c-wager-entry__label'>{'Odds'}</h4>
                        <h3 className='c-wager-entry__text'>{parseInt(odd, 10) > 0 ? `+${odd}` : odd }</h3>
                    </div>
                    <div className='l-grid__item l-column-flex'>
                        <h4 className='c-wager-entry__label'>{'Wager'}</h4>
                        <h3 className='c-wager-entry__text'>{currencyFormatter.format(wager)}</h3>
                    </div>
                    <div className='l-grid__item l-column-flex'>
                        <h4 className='c-wager-entry__label'>{'Payout'}</h4>
                        <h3 className='c-wager-entry__text'>{currencyFormatter.format(payout)}</h3>
                    </div>
                </div>
            </WagerSummary>

            <AddMoreBetsBanner className='l-row-flex l-column-flex__item'>
                <WagerButton
                    className='l-row-flex__item btn c-wager-entry__add-more-button'
                    onClick={() => toggleBetMode()}
                >
                    <p>Add More Bets</p>
                    <Plus />
                </WagerButton>
            </AddMoreBetsBanner>

            <WagerItemList className='l-column-flex l-column-flex__item'>
                {currentBets.map((bet, index) => (
                    <WagerItem 
                        key={index}
                        bet={bet}
                        handleBetRemoval={handleBetRemoval}
                    />
                 ))}
            </WagerItemList>

            <Calculator4Row className='l-grid l-column-flex__item'>
                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='20' onClick={e => addNumber(e.target.name)}>+$20</WagerButton>
                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='50' onClick={e => addNumber(e.target.name)}>+$50</WagerButton>
                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='100' onClick={e => addNumber(e.target.name)}>+$100</WagerButton>
                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' onClick={() => clearWager()}>Clear</WagerButton>
            </Calculator4Row>

            <div className='l-column-flex l-column-flex__item'>
                <WagerButton
                    className='l-column-flex__item btn c-wager-entry__show-hide-button'
                    onClick={() => toggleFullCalculator()}
                >
                    {showFullCalculator ? <Hide /> : <Show />}
                    {showFullCalculator ? 'Hide Full Calculator' : 'Show Full Calculator'}
                </WagerButton>
            </div>

            {showFullCalculator
                ?
                    <>
                        <FullCalculator className='l-column-flex l-column-flex__item'>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='1' onClick={e => handleInput(e.target.name)}>1</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='2' onClick={e => handleInput(e.target.name)}>2</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='3' onClick={e => handleInput(e.target.name)}>3</WagerButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='4' onClick={e => handleInput(e.target.name)}>4</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='5' onClick={e => handleInput(e.target.name)}>5</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='6' onClick={e => handleInput(e.target.name)}>6</WagerButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='7' onClick={e => handleInput(e.target.name)}>7</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='8' onClick={e => handleInput(e.target.name)}>8</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='9' onClick={e => handleInput(e.target.name)}>9</WagerButton>
                            </Calculator3Row>
                            <Calculator3Row className='l-grid l-column-flex__item'>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='.' onClick={e => handleInput(e.target.name)}>.</WagerButton>
                                <WagerButton className='l-grid__item btn c-wager-entry__calculator-button' name='0' onClick={e => handleInput(e.target.name)}>0</WagerButton>
                            </Calculator3Row>
                        </FullCalculator>
                    </>
                : null
            }

            <CalculatorFooter className='l-grid l-column-flex__item'>
                <WagerButton
                    className={`l-grid__item btn c-wager-entry__wager-button ${parseFloat(wager) > bank && 'overdraft'}`}
                    disabled={wager && wager !== '0' && parseFloat(wager) <= bank ? false : true}
                    onClick={() => postBet()}
                >
                    {parseFloat(wager) <= bank ? `Enter Wager` : `Insufficient Funds!`}
                </WagerButton>
                <WagerButton 
                    className='l-grid__item btn c-wager-entry__wager-button'
                    onClick={closeBetSlip}
                >
                    Cancel Wager
                </WagerButton>
            </CalculatorFooter>

        </EnterWagerWrapper>
    );

    /** postBet: Posts a bet. */
    function postBet() {
        // Gather the current bets and create an array of ids
        const bets = [ ...currentBets ];
        let betIds = bets.map(betObject => betObject.id);
        // Send request to parent
        placeBet(betIds, parseFloat(wager));
    }

    /** handlePayout: Handle payout based on the odds and entered wager. */
    function handlePayout(){
        setPayout(calculatePayout(parseFloat(wager), odd));
    }

    /** handleOddCalculation: Calculates a cumulative odd if more than 1 exists. */
    function handleOddCalculation() {
        // Gather the current bets
        const bets = [ ...currentBets ];
        // Create the aggregate odd
        setOdd(decToAmerican(parseFloat(bets.reduce((acc, cur) => acc * parseFloat(cur.ratio), 1.00).toPrecision(4))));
    }

    /**
     * handleInput: Appends a number on the wager entry.
     * @param {string} value - The numerical value to add to the wager.
     */
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
    }

    /**
     * addNumber: Adds a number to the wager entry.
     * @param {integer} amount 
     */
    function addNumber(amount) {
        let currentWager = parseFloat(wager);
        let currentAmount = parseFloat(amount);
        currentWager += currentAmount;
        setWager(currentWager.toString());
    }
    
    /** toggleFullCalculator: Toggles the full calculator display. */
    function toggleFullCalculator() {
        setShowFullCalculator(!showFullCalculator);
    }

    /**
     * handleBetRemoval: Removes a bet from the selected bet cache.
     * @param {*} betObj 
     */
    function handleBetRemoval(betObj) {
        setBetCount(betCount - 1);
        updateBetAccumulatorCache(betObj);

        if (betCount - 1 === 0) {
            closeBetSlip();
        }
    }

    /** clearWager: Resets the wager entry and payout state. */
    function clearWager() {
        setWager('0');
        setPayout(0);
    }
};

EnterWager.propTypes = {
    currentBets: PropTypes.array.isRequired, 
    placeBet: PropTypes.func.isRequired, 
    closeBetSlip: PropTypes.func.isRequired, 
    toggleBetMode: PropTypes.func.isRequired, 
    updateBetAccumulatorCache: PropTypes.func.isRequired, 
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
        margin-bottom: 16px;
    }

    & > div[class~='l-column-flex__item']:first-of-type {
        margin-top: 12px;
    }

    & p.c-wager-entry__label {
        font-family: 'Inter', 'Sans Serif';
        font-size: 12px;
        font-weight: 400;
        letter-spacing: .0625rem;
        color: #8b8c8f;
        margin: 0;
    }

    & h3.c-wager-entry__text {
        font-family: 'Inter', 'Sans Serif';
        font-size: 20px;
        font-weight: 700;
        color: black;
        margin: 6px 0 0 0;
    }
`;

const WagerSummary = styled.div`
    div.l-grid {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 16px;

        & .l-grid__item {
            & h3, h4 { text-align: center };
        }

        & h4 {
            color: #a4b0bb;
        }
    }
`;

const WagerItemList = styled.div`
    & > div {
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
    }

    & > div:first-of-type {
        border-bottom: none;
    }

    & > div:last-of-type {
        border-top: none;
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

const AddMoreBetsBanner = styled.div`
    justify-content: center;

    & > button {
        margin: 3px 0 6px 0;
    }
`;

const WagerButton = styled.button`
    box-sizing: border-box;
    padding: 10px 0 10px 0;

    background: #FFFFFF;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 1px #DDD;
    font-family: 'Inter', 'Sans Serif';
    font-size: 14px;
    outline: none;

    &:active {
        background: #8fd6a9;
        color: white;
    }

    &.c-wager-entry__show-hide-button {
        display: flex;
        justify-content: center;
        font-size: 10px;

        & svg {
            margin-right: 12px;
            height: 12px;
            width: 12px;
        }
    }

    &.c-wager-entry__add-more-button {
        display: flex;
        align-items: center;
        padding: 6px;
        
        font-size: 13px;
        color: #53DFB5;
        box-shadow: 0px 1px 2px 1px #C5E9DE;

        & p {
            margin: 0;
        }

        & svg {
            height: 18px;
            width: 18px;
            margin-left: 12px;
            fill: #53DFB5;
        }
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