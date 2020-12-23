import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import { formatBetMetric } from '../../utilities/helpers';

import { ReactComponent as Cancel } from '../../icons/cancel.svg';

function WagerItem(props) {
    // A hash for formatting the bets for the user.
    const betHash = {
        'money_line': 'Money Line',
        'spread': 'Point Spread',
        'over': 'Total Points',
        'under': 'Total Points',
    };

    return (
        <WagerItemWrapper className='c-wager-item l-grid'>
            <div className='l-grid__item'>
                <p className='c-wager-item__team-name-metric'>
                    {`${props.bet.type === 'over' || props.bet.type === 'under' ? '' : props.bet.teamName} ${formatBetMetric(props.bet.type, props.bet.metric)}`}
                </p>
                <p className='c-wager-item__bet-type'>{`${betHash[props.bet.type]} @ ${props.bet.american}`}</p>
                <p className='c-wager-item__game-name'>{props.bet.gameName}</p>
            </div>
            <div className='l-grid__item'>
                <button className='btn c-wager-item__delete' onClick={() => props.handleBetRemoval(props.bet)}>
                    <Cancel />
                </button>
            </div>
        </WagerItemWrapper>
    )
}

WagerItem.propTypes = {
    props: PropTypes.objectOf({
        bet: PropTypes.object.isRequired,
        handleBetRemoval: PropTypes.func.isRequired,
    }),
}

WagerItem.defaultProps = {
    gameName: 'Test!',
}

export default WagerItem

const WagerItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 50px;

    padding: 12px 6px;
    border-top: 1px solid #F2F2F2;

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
        height: 70%;
        width: 70%;
        border: none;
        background: none;
        box-shadow: 0px 1px 2px 1px #DDD;
        border-radius: 4px;
        outline: none;

        & svg {
            height: 12px;
            width: 12px;
            fill: #404040;
        }
    }
`;