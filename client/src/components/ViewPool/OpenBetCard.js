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
        <BetSlipWrapper className='c-betslip l-column-flex'>

            <BetSlipHeader className='header l-row-flex l-column-flex__item'>
                <SportBannerWrapper className='l-row-flex l-row-flex__item'>
                    <SportBanner className='l-row-flex l-row-flex__item'>
                        <FootballIcon className='c-betslip__sport-icon'/>
                        <h4 className='c-betslip__sport-name'>Football</h4>
                    </SportBanner>
                    <LeagueBanner className='l-row-flex l-row-flex__item'>
                        <h4 className='c-betslip__league-name'>NFL</h4>
                    </LeagueBanner>
                </SportBannerWrapper>

                <StatusBanner className={`l-row-flex l-row-flex__item
                        ${!bet.result || bet.result === '' // Bet is open.
                            ? 'open'
                            : bet.result === 'in-progress'
                                ? 'in-progress' 
                                : bet.result === 'won'
                                    ? 'win' 
                                    : bet.result === 'lost'
                                        ? 'loss'
                                        : 'draw'
                        }`
                    }>
                        {!bet.result || bet.result === ''
                            ? 
                                <>
                                    <h4 className='c-betslip__bet-status--label'>Scheduled</h4>
                                    <Calendar className='c-betslip__bet-status--icon'/>
                                </>
                            : bet.result === 'in-progress'
                                ? 
                                <>
                                    <h4 className='c-betslip__bet-status--label'>In-Progress</h4>
                                    <Clock className='c-betslip__bet-status--icon'/>
                                </>
                                : bet.result === 'won'
                                    ?
                                        <>
                                            <h4 className='c-betslip__bet-status--label'>Won</h4>
                                            <Check className='c-betslip__bet-status--icon'/>
                                        </>
                                    : bet.result === 'lost'
                                        ?
                                            <>
                                                <h4 className='c-betslip__bet-status--label'>Lost</h4>
                                                <Cancel className='c-betslip__bet-status--icon'/>
                                            </>
                                        :
                                            <>
                                                <h4 className='c-betslip__bet-status--label'>Push</h4>
                                                <Equal className='c-betslip__bet-status--icon'/>
                                            </>
                        }
                </StatusBanner>

            </BetSlipHeader>

            <div className='content l-column-flex l-column-flex__item'>

                {bet.fixtures.map((fix, index) => (
                    
                    <BetSlipRow className='row l-column-flex l-column-flex__item'>
                        
                        <BetSlipGameInfo className='l-column-flex l-column-flex__item'>
                            <h4 className='c-betslip__game-name'>{`${fix.awayTeamName} at ${fix.homeTeamName}`} </h4>
                            <h4 className='c-betslip__game-datetime'>{zuluToStringFormat(fix.startTime)}</h4>
                        </BetSlipGameInfo>

                        {fix.odds.map((odd, index) => (
                            
                            <div className='l-column-flex l-column-flex__item'>
    
                                <OddDetail className='odd-detail l-row-flex l-column-flex__item'>
                                    <div className='l-row-flex l-row-flex__item'>
                                        <Dot className={`c-betslip__odd-status
                                            ${!odd.result || odd.result === ''
                                                ? '--open'
                                                : odd.result === 'in-progress'
                                                    ? '--in-progress' 
                                                    : odd.result === 'won'
                                                        ? '--win' 
                                                        : odd.result === 'lost'
                                                            ? '--loss'
                                                            : '--draw'
                                            }`}
                                        />
                                        {odd.type === 'money_line'
                                            ? <BetTypeLabel className='l-row-flex l-row-flex__item'>{'M/L'}</BetTypeLabel>
                                            : odd.type === 'spread'
                                                ? <BetTypeLabel className='l-row-flex l-row-flex__item'>{'P/S'}</BetTypeLabel>
                                                : <BetTypeLabel className='l-row-flex l-row-flex__item'>{'T/P'}</BetTypeLabel>
                                        }
                                        <span className='betslip__team-name'>
                                            {odd.type === 'over'
                                                ? `Over ${odd.metric}`
                                                : odd.type === 'under'
                                                    ? `Under ${odd.metric}`
                                                    : odd.teamName
                                            }
                                        </span>
                                    </div>
    
                                    <div className='l-row-flex l-row-flex__item'>
                                        <span className='odds betslip__metric-ratio'>
                                            {odd.type === 'over' || odd.type === 'under'
                                                ? ''
                                                : odd.metric
                                                    ? odd.metric > 0
                                                        ? `+${odd.metric}` 
                                                        : odd.metric
                                                    : ' '
                                            }
                                            {' '}
                                            {odd.american > 0 ? `(+${odd.american})` : `(${odd.american})`}
                                        </span>
                                    </div>
                                </OddDetail>
                            </div>
                        ))}
                    </BetSlipRow>
                ))}

                <BetSlipWager className='wager-detail l-grid l-column-flex__item'>
                    <div className='l-column-flex l-grid__item'>
                        <span className='c-betslip__content-label'>STAKE</span>
                        <span className='c-betslip__content-data'>{currencyFormatter.format(bet.amount)}</span>
                    </div>
                    <div className='l-column-flex l-grid__item'>
                        <span className='c-betslip__content-label'>TO WIN</span>
                        <span className='c-betslip__content-data'>{currencyFormatter.format(bet.payout)}</span>
                    </div>
                    <div className='l-column-flex l-grid__item'>
                        <span className='c-betslip__content-label'>CASH OUT</span>
                        <button className='btn c_betslip__cashout-button' disabled>{`$0.00`}</button>
                    </div>
                </BetSlipWager>
            </div>

        </BetSlipWrapper>
    );
};

OpenBets.propTypes = {
    bet: PropTypes.object.isRequired,
};

OpenBets.defaultProps = {
    gameDateTime: '2020-12-14T18:34:07.532Z',
}

export default OpenBets;

const BetSlipWrapper = styled.div`
    box-sizing: border-box;

    & div.l-grid {
        display: grid;
        box-sizing: border-box;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        flex-flow: column nowrap;
        box-sizing: border-box;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
        box-sizing: border-box;
    }

    margin-bottom: 0.5rem;
    font-family: 'Inter', 'Sans Serif';
    border-bottom: 1px solid #F2F2F2;

    & h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
    }

    & h4 {
        font-size: 13px;
        font-weight: 300;
        margin: 0;
    }
`;
    
const BetSlipHeader = styled.div`
    justify-content: space-between;
    align-items: flex-end;
`;

const SportBannerWrapper = styled.div`
    & > div {
        align-items: center;
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
        
    }
`;

const LeagueBanner = styled.div`
    align-items: center;
    background: #f2f2f2;
    color: #8C8C8C;
`;

const SportBanner = styled.div`
    background: #D9D9D9;
    color: #8C8C8C;

    & > svg {
        margin-right: 0.5rem;
        fill: #8C8C8C;
    }
`;

const StatusBanner = styled.div`
    align-items: center;
    
    & svg.c-betslip__bet-status--icon {
        height: 16px;
        width: auto;
        margin-left: 8px;
    }

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
`;

const BetSlipRow = styled.div`
    & > div.l-column-flex__item:first-of-type {
        margin-bottom: 12px;
    }

    & > div.l-column-flex__item {
        margin-bottom: 6px;
    }
`;

const BetSlipGameInfo = styled.div`
    color: #aaaaaa;
    margin: 12px 0 12px 0;

    & h4 {
        color: #404040;
        font-weight: 700;

        &.c-betslip__game-datetime {
            margin-top: 3px;
            color: #8C8C8C;
        }
    }
`;

const OddDetail = styled.div`
    justify-content: space-between;
    
    & > div {
        align-items: center;
    }

    & > div:not(:last-of-type) {
        margin-bottom: 6px;
    }

    & svg.c-betslip__odd-status {
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

const BetTypeLabel = styled.div`
    justify-content: center;
    align-items: center;

    padding: 0.2rem;
    margin-right: 0.5rem;

    border: 1px solid #8b8c8f;
    border-radius: 2px;
    font-size: 0.6rem;
    letter-spacing: .0625em;
    color: #8b8c8f;
`;


const BetSlipWager = styled.div`
    grid-template-columns: repeat(3, 33%);
    grid-template-areas: 'stake payout cashout';
    margin-bottom: 12px;

    & > .l-grid__item {
        align-items: center;
    }

    .c-betslip__content-label {
        font-size: 11px;
        color: #8C8C8C;
        margin-bottom: 6px;
    };

    .c-betslip__content-label {
        font-size: 13px;
        color: #404040;
        margin: 6px 0 6px 0;
    };

    button.c_betslip__cashout-button {
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

const FootballIcon = styled(Football)`
    height: 0.75rem;
    width: 0.75rem;
`;