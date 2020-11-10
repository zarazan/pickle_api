import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import pickleApi from '../../services/pickle_api';
import BetCard from './BetCard';
import EnterWager from './EnterWager';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const GameOdds = ({ toggleDisplay, poolId, fixtures, bankroll }) => {
    const [betSlip, setBetSlip] = useState([]);
    // const [multibet, setMultibet] = useState(false);
    const [currentFixture, setCurrentFixture] = useState(null);
    const [currentBet, setCurrentBet] = useState(null);
    const [toggleBetSlip, setToggleBetSlip] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // used for the enter wager display
    const gameName = currentFixture ? `${currentFixture.awayTeamName} vs ${currentFixture.homeTeamName}` : '';

    return (
        <GameOddsWrapper className='game-odds-container'>
            {toggleBetSlip 
                ? (
                    <EnterWager
                        className='enter-wager-form'
                        currentBet={currentBet}
                        gameName={gameName}
                        placeBet={enterBet}
                        closeBetSlip={closeBetSlip}
                        errors={errorMessage}
                    />
                ) : ( 
                    <>
                        <Header className='game-odds-header'>
                            <button className='game-odds__back-nav' onClick={() => toggleDisplay('dashboard')}><FontAwesomeIcon icon={faArrowLeft} size='1x' /></button>
                            <Title className='game-odds__title'>{'SCHEDULE & ODDS'}</Title>
                        </Header>
                        <Bankroll>
                            <h3>{'Bankroll:'}</h3>
                            <FontAwesomeIcon icon={faDollarSign} size='2x' color='#8fd6a9' />
                            <h3 className='user-bankroll'>{bankroll ? bankroll : '0.00'}</h3>
                            {/* <div>
                            </div> */}
                        </Bankroll>
                        <BetSlipTotals className='game-odds-totals'>
                            <div className='totals__bankroll'></div>
                            <div className='totals__headers'>
                                <div className='headers__game header-label'>
                                    <h4>{'GAME'}</h4>
                                </div>
                                <div className='headers__odd-labels'>
                                    <div className='headers__spread header-label'>
                                        <h4>{'POINT'}</h4>
                                        <h4>{'SPREAD'}</h4>
                                    </div>
                                    <div className='headers__points header-label'>
                                        <h4>{'TOTAL'}</h4>
                                        <h4>{'POINTS'}</h4>
                                    </div>
                                    <div className='headers__moneyline header-label'>
                                        <h4>{'MONEY'}</h4>
                                        <h4>{'LINE'}</h4>
                                    </div>
                                </div>
                            </div>
                        </BetSlipTotals>
                        <BetCardList className='game-odds-cardlist'>
                            {(fixtures || []).map((fixture, index) => (
                                <BetCard 
                                    key={index}
                                    id={fixture.id}
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
                )
            }
        </GameOddsWrapper>
    );

    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip);
        setCurrentFixture(null);
        setCurrentBet(null);
    }

    function selectBet(fixtureId, betId) {
        const fixtureObject = fixtures.filter(fixture => fixture.id === fixtureId).pop();
        setCurrentFixture(fixtureObject);
        const betObject = fixtureObject.odds.filter(odd => odd.id === betId).pop();
        setCurrentBet(betObject);
        setToggleBetSlip(!toggleBetSlip)
    }

    /** enterBet: Sends Pickle API request for placing a bet.**/
    function enterBet(betId, betAmount) {
        let resp = {};
        resp.pool_id = poolId;
        resp.odd_id = betId;
        resp.amount = betAmount;

        pickleApi.createBet(resp)
            .then(data => {
                setBetSlip([...betSlip, data]);
                setToggleBetSlip(false);
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
    }
};

GameOdds.propTypes = {
    poolId: PropTypes.string,
    fixtures: PropTypes.array,
};

export default GameOdds; 

const GameOddsWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;

    box-sizing: border-box;
    height: auto;
    overflow: auto;
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
    justify-content: center;
    margin: 1.5rem 0 1rem 0;

    & > * {
        height: 100%;
    }

    & h3 {
        margin: 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1.5rem;
        color: #8fd6a9;
    }

    & > svg {
        margin: 0 0.5rem 0 0.5rem;
    }

    & h3.user-bankroll {
        font-weight: 700;
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