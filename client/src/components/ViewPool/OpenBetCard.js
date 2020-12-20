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

const OpenBets = ({ gameName, gameDateTime, bet }) => {
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
                <BetSlipGameInfo>
                    <span>{gameName}</span>
                    <span>{zuluToStringFormat(gameDateTime)}</span>
                </BetSlipGameInfo>

                <BetSlipDetails className='content__bet content-row'>
                    <div className='betslip__bet-type'>
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

                <BetSlipWager className='content__game content-row'>
                    <div className='betslip__bet-amount'>{`STAKE: ${currencyFormatter.format(bet.amount)}`}</div>
                    <div className='betslip__bet-payout'>{`TO WIN: ${currencyFormatter.format(bet.payout)}`}</div>
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
`;

// .game-date {
//     display: flex;
//     margin: 0.5rem 1rem 0.3rem 0;
//     font-size: 0.7rem;
//     color: #8b8c8f;
// }

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

`;

const BetSlipDetails = styled.div`

`;

const BetSlipGameInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 300;
    color: #aaaaaa;
`;

const FootballIcon = styled(Football)`
    height: 0.75rem;
    width: 0.75rem;
`;