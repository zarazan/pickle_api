import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import { formatBetMetric } from '../../utilities/helpers';

import { ReactComponent as Cancel } from '../../icons/cancel.svg';

const betHash = { // A hash for formatting the bets for the user.
    'money_line': 'Money Line',
    'spread': 'Point Spread',
    'over': 'Total Points',
    'under': 'Total Points',
};

const WagerItem = ({ bet, handleBetRemoval }) => {
    return (
        <WagerItemWrapper className='c-wager-item l-grid'>
            <div className='l-grid__item'>
                <p className='c-wager-item__team-name-metric'>
                    {`${bet.type === 'over' || bet.type === 'under' ? '' : bet.teamName} ${formatBetMetric(bet.type, bet.metric)}`}
                </p>
                <p className='c-wager-item__bet-type'>{`${betHash[bet.type]} @ ${bet.american}`}</p>
                <p className='c-wager-item__game-name'>{bet.gameName}</p>
            </div>
            <div className='l-grid__item'>
                <button className='btn c-wager-item__delete' onClick={() => handleBetRemoval(bet)}>
                    <Cancel />
                </button>
            </div>
        </WagerItemWrapper>
    )
}

WagerItem.propTypes = {
    bet: PropTypes.object.isRequired,
    handleBetRemoval: PropTypes.func.isRequired,
}

export default WagerItem

const WagerItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 50px;

    padding: 12px 6px;

    &:not(:last-of-type) {
        border-bottom: 1px solid #F2F2F2;
    }

    & div.l-grid {
        display: grid;
    }

    & p {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        margin: 0;
        color: #404040;
    }

    & .btn[class~='c-wager-item__delete'] {
        height: 100%;
        width: 100%;
        border: none;
        background: none;
        outline: none;

        & svg {
            height: 12px;
            width: 12px;
            fill: #404040;
        }
    }
`;