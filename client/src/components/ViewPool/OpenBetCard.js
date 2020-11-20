import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { decToAmerican, zuluToStringFormat, calculatePayout, currencyFormatter } from '../../utilities/helpers';

import { ReactComponent as Football } from '../../icons/american-football.svg';

const OpenBets = ({ gameName, bet, result }) => {
    const [ratio, setRatio] = useState(null);

    useEffect(() => (
        setRatio(decToAmerican(bet.odd.ratio))
    ), []);

    return (
        <BetSlip className='betslip'>

            <div className='header'>
                <div className='header__sport'>
                    <div className='sport-banner'>
                        <FootballIcon className='sport-banner__icon'/>
                        <div>FOOTBALL</div>
                    </div>
                    <div className='sport-league'>NFL</div>
                </div>
                <div className='header__info'>
                    <div className='game-date'>{zuluToStringFormat(bet.createdAt)}</div>
                    <div className={`bet-status 
                        ${!bet.result 
                            ? 'in-progress' 
                            : bet.result === 'W'
                                ? 'win'
                                : bet.result === 'L'
                                    ? 'loss'
                                    : 'tie'
                        }`
                    }>
                        {!bet.result 
                            ? 'O' 
                            : bet.result === 'W'
                                ? 'W'
                                : bet.result === 'L'
                                    ? 'L'
                                    : 'T'}
                    </div>
                </div>
            </div>

            <div className='content'>
                <div className='content__bet content-row'>
                    <div className='betslip__bet-type'>
                        {bet.odd.type === 'money_line'
                        ? <BetTypeLabel className='bet-type-label'>{'M/L'}</BetTypeLabel>
                        : bet.odd.type === 'spread'
                            ? <BetTypeLabel className='bet-type-label'>{'P/S'}</BetTypeLabel>
                            : <BetTypeLabel className='bet-type-label'>{'T/P'}</BetTypeLabel>
                        }
                        <div className='betslip__team-name'>{bet.odd.teamName}</div>
                    </div>
                    <div className='betslip__bet-odds'>
                        <div className='odds betslip__metric-ratio'>
                            {bet.odd.metric 
                            ? bet.odd.metric > 0 
                                ? `+${bet.odd.metric}` 
                                : bet.odd.metric
                            : ''}
                            {`(${ratio})`}
                        </div>
                    </div>
                </div>
                <div className='content__game content-row'>
                    <div className='betslip__bet-amount'>{`STAKE: ${currencyFormatter.format(bet.amount)}`}</div>
                    <div className='betslip__bet-payout'>{`TO WIN: ${currencyFormatter.format(calculatePayout(bet.amount, decToAmerican(bet.odd.ratio)))}`}</div>
                </div>

            </div>

        </BetSlip>
    );
};

OpenBets.propTypes = {
    bet: PropTypes.object.isRequired,
};

export default OpenBets;

const BetSlip = styled.div`
    margin-bottom: 0.5rem;
    font-family: 'Inter', 'Sans Serif';
    font-size: 0.85rem;
    box-sizing: border-box;
    border-radius: 0.2em;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 3px 0px, rgba(60, 64, 67, 0.15) 0px 1px 2px 0px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 0.4rem;

        .header__sport {
            display: flex;
            margin-top: 0.5rem;
    
            & .sport-banner, .sport-league {
                display: flex;
                flex-flow: row nowrap;
                box-sizing: border-box;
                padding: 0.2rem 0.4rem 0.2rem 0.4rem;
                font-size: 0.7rem;
            }
            
            & .sport-banner {
                align-items: center;
                background: #c7ead4;
                color: #379559;
    
                & > svg {
                    margin-right: 0.5rem;
                    fill: #379559;
                }
            }
    
            & .sport-league {
                background: #f2f2f2;
                color: #808080;
            }
        }

        .header__info {
            display: flex;
            align-items: center;
            margin-right: 0.5rem;

            .game-date {
                display: flex;
                margin: 0.5rem 1rem 0.3rem 0;
                font-size: 0.7rem;
                color: #8b8c8f;
            }

            .bet-status {
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                border-radius: 0.15rem;
                padding: 0.1rem 0.2rem 0.1em 0.2rem;
                color: white;
                font-size: 0.8rem;
                
                &[class~='in-progress'] {
                    background: #cfd6db;
                }

                &[class~='win'] {
                    background: #34b25e;
                }

                &[class~='loss'] {
                    background: #e44242;
                }

                &[class~='tie'] {
                    background: #31a0fe;
                }
            }
        }
    }

    .content {
        box-sizing: border-box;
        margin: 0 0.5rem; 0 0.5rem;

        & .content-row {
            margin-bottom: 0.3rem;
        }

        & .content__bet {
            display: flex;
            justify-content: space-between;

            & .betslip__bet-odds {
                display: flex;
                align-items: center;
            }
        }

        & .content__game {
            display: flex;
            flex-flow: column nowrap;
            box-sizing: border-box;
            margin-top: 0.5rem;
            padding: 0.5rem 0 0.5rem 0;

            border-top: 1px solid #f0f3f4;
            font-size: 0.7rem;
            font-weight: 500;
            
            & .betslip__bet-amount {
                margin-bottom: 0.25rem
            }
        }
        
        & .betslip__bet-type {
            display: flex;
            align-items: center;

            & .betslip__team-name {
                font-size: 1rem;
                font-family: 'Poppins', 'Sans Serif';
            }
        }
    }

`;

const BetTypeLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0.2rem;
    margin-right: 0.5rem;

    border: 1px solid #8b8c8f;
    font-size: 0.6rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;

const FootballIcon = styled(Football)`
    height: 0.75rem;
    width: 0.75rem;
`;