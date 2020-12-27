import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { zuluToStringFormat, currencyFormatter } from '../../utilities/helpers';

import { ReactComponent as Football } from '../../icons/american-football.svg';
import { ReactComponent as Check } from '../../icons/check-mark.svg';
import { ReactComponent as Cancel } from '../../icons/error.svg';
import { ReactComponent as Clock } from '../../icons/time.svg';
import { ReactComponent as Calendar } from '../../icons/calendar.svg';
import { ReactComponent as Equal } from '../../icons/equal.svg';
import { ReactComponent as Dot } from '../../icons/black-circle.svg';

const OpenBets = ({ bet }) => {
    return (
        <BetSlip className='betslip'>
            <BetSlipHeader className='header'>
                <div className='header__sport'>
                    <div className='sport-banner'>
                        <FootballIcon className='sport-banner__icon'/>
                        <div>FOOTBALL</div>
                    </div>
                    <div className='sport-league'>NFL</div>
                </div>

                <BetSlipHeaderStatus className='header__info'>
                    <div className={`bet-status 
                        ${!bet.result || bet.result === '' // bet is open
                            ? 'open'
                            : bet.result === 'in-progress' // bet is in progress
                                ? 'in-progress' 
                                : bet.result === 'won' // bet is won
                                    ? 'win' 
                                    : bet.result === 'lost' // bet is lost
                                        ? 'loss'
                                        : 'draw' // bet is a draw
                        }`
                    }>
                        {!bet.result || bet.result === '' // no bet result
                            ? 
                                <>
                                    <span className='bet-status-label'>Scheduled</span>
                                    <Calendar className='bet-status-icon'/>
                                </>
                            : bet.result === 'in-progress'
                                ? 
                                <>
                                    <span className='bet-status-label'>In-Progress</span>
                                    <Clock className='bet-status-icon'/>
                                </>
                                : bet.result === 'won'
                                    ?
                                        <>
                                            <span className='bet-status-label'>Won</span>
                                            <Check className='bet-status-icon'/>
                                        </>
                                    : bet.result === 'lost'
                                        ?
                                            <>
                                                <span className='bet-status-label'>Lost</span>
                                                <Cancel className='bet-status-icon'/>
                                            </>
                                        :
                                            <>
                                                <span className='bet-status-label'>Push</span>
                                                <Equal className='bet-status-icon'/>
                                            </>
                        }
                    </div>
                </BetSlipHeaderStatus>

            </BetSlipHeader>

            <BetSlipContent className='content'>
                {bet.fixtures.map((fix, index) => (
                    <div className='l-column-flex'>
                        <BetSlipGameInfo className='content__header content-row'>
                            <span className='content__game'>{`${fix.awayTeamName} at ${fix.homeTeamName}`} </span>
                            <span className='content__datetime'>{zuluToStringFormat(fix.startTime)}</span>
                        </BetSlipGameInfo>

                        {fix.bets.map((bet, index) => (
                            <div className='l-column-flex l-colum-flex__item'>
    
                                <BetSlipDetails className='content__bet content-row'>
                                    <div className='betslip__bet-type'>
                                        <Dot className={`betslip__sub-bet-status
                                            ${!bet.result || bet.result === '' // bet is open
                                                ? '--open'
                                                : bet.result === 'in-progress' // bet is in progress
                                                    ? '--in-progress' 
                                                    : bet.result === 'won' // bet is won
                                                        ? '--win' 
                                                        : bet.result === 'lost' // bet is lost
                                                            ? '--loss'
                                                            : '--draw' // bet is a draw
                                            }`}
                                        />
                                        {bet.odd.type === 'money_line'
                                            ? <BetTypeLabel className='bet-type-label'>{'M/L'}</BetTypeLabel>
                                            : bet.odd.type === 'spread'
                                                ? <BetTypeLabel className='bet-type-label'>{'P/S'}</BetTypeLabel>
                                                : <BetTypeLabel className='bet-type-label'>{'T/P'}</BetTypeLabel>
                                        }
                                        <div className='betslip__team-name'>
                                            {bet.odd.type === 'over'
                                                ? `Over ${bet.odd.metric}`
                                                : bet.odd.type === 'under'
                                                    ? `Under ${bet.odd.metric}`
                                                    : bet.odd.teamName
                                            }
                                        </div>
                                    </div>
    
                                    <div className='betslip__bet-odds'>
                                        <div className='odds betslip__metric-ratio'>
                                            {bet.odd.type === 'over' || bet.odd.type === 'under'
                                                ? ''
                                                : bet.odd.metric
                                                    ? bet.odd.metric > 0
                                                        ? `+${bet.odd.metric}` 
                                                        : bet.odd.metric
                                                    : ' '
                                            }
                                            {' '}
                                            {bet.odd.american > 0 ? `(+${bet.odd.american})` : `(${bet.odd.american})`}
                                        </div>
                                    </div>
                                </BetSlipDetails>
                            </div>
                        ))}
                    </div>
                ))}

                <BetSlipWager className='content__money content-row'>
                    <div className='betslip__bet-amount'>
                        <span className='content__money-label'>STAKE</span>
                        <span className='content__money-data'>{currencyFormatter.format(bet.amount)}</span>
                    </div>
                    <div className='betslip__bet-payout'>
                        <span className='content__money-label'>TO WIN</span>
                        <span className='content__money-data'>{currencyFormatter.format(bet.payout)}</span>
                    </div>
                    <div className='betslip__cash-out'>
                        <span className='content__money-label'>CASH OUT</span>
                        <button className='bet-cashout' disabled>{`$0.00`}</button>
                    </div>
                </BetSlipWager>
            </BetSlipContent>

        </BetSlip>
    );
};

OpenBets.propTypes = {
    gameName: PropTypes.string.isRequired,
    gameDateTime: PropTypes.string,
    bet: PropTypes.object.isRequired,
};

OpenBets.defaultProps = {
    gameDateTime: '2020-12-14T18:34:07.532Z',
}

export default OpenBets;

const BetSlip = styled.div`
    margin-bottom: 0.5rem;
    font-family: 'Inter', 'Sans Serif';
    box-sizing: border-box;

    border-bottom: 1px solid #F2F2F2;
`;
    
const BetSlipHeader = styled.div`
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
            background: #D9D9D9;
            color: #8C8C8C;

            & > svg {
                margin-right: 0.5rem;
                fill: #8C8C8C;
            }
        }

        & .sport-league {
            background: #f2f2f2;
            color: #8C8C8C;
        }
    }
`;

const BetSlipContent = styled.div`
    box-sizing: border-box;

    & .content-row {
        margin-bottom: 16px;
    }
    
    & .betslip__bet-type {
        display: flex;
        align-items: center;

        & .betslip__team-name {
            font-size: 1rem;
            font-family: 'Poppins', 'Sans Serif';
        }
    }

    & svg.betslip__sub-bet-status {
        height: 6px;
        width: 6px;
        margin-right: 8px;
        
        &[class$='--open'] {
            fill: #AAAAAA;
        }
        &[class$='--in-progress'] {
            fill: #F4A261;
        }
        &[class$='--win'] {
            fill: #49DEB2;
        }
        &[class$='--loss'] {
            fill: #F03B58;
        }
        &[class$='--draw'] {
            fill: #49BCF6;
        }
    }
`;

const BetSlipHeaderStatus = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    
    & svg[class='bet-status-icon'] {
        height: 16px;
        width: auto;
        margin-left: 8px;
    }

    & div[class~='bet-status'] {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        
        &[class~='open'] {
            color: #8C8C8C;
            & svg { fill: #8C8C8C; }
        }

        &[class~='in-progress'] {
            color: #F4A261;
            & svg { fill: #F4A261; }
        }

        &[class~='win'] {
            color: #49DEB2;
            & svg { fill: #49DEB2; }
        }

        &[class~='loss'] {
            color: #F03B58;
            & svg { fill: #F03B58; }
        }

        &[class~='draw'] {
            color: #49BCF6;
            & svg { fill: #49BCF6; }
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
    border-radius: 2px;
    font-size: 0.6rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;

const BetSlipWager = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-template-areas: 'stake payout cashout';

    & > div {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .content__money-label {
        font-size: 11px;
        color: #8C8C8C;
        margin-bottom: 6px;
    };

    .content__money-data {
        font-size: 13px;
        color: #404040;
        margin: 6px 0 6px 0;
    };

    button.bet-cashout {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        border: none;
        outline: none;
        border-radius: 4px;
        box-shadow: 0px 2px 6px 1px #F2F2F2;
        background-color: #FFFFFF;

        height: 100%;
        width: 80%;
        padding: 6px 8px;
    }
`;

const BetSlipDetails = styled.div`
    display: flex;
    justify-content: space-between;

    & .betslip__bet-type {
        display: flex;
        align-items: center;

        & .betslip__team-name {
            font-size: 1rem;
            font-family: 'Poppins', 'Sans Serif';
        }
    }
`;

const BetSlipGameInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    font-size: 11px;
    font-weight: 300;
    color: #aaaaaa;

    & span.content__game {
        color: #404040;
        font-size: 13px;
        font-weight: 700;
        margin: 10px 0 3px 0;
    }
`;

const FootballIcon = styled(Football)`
    height: 0.75rem;
    width: 0.75rem;
`;