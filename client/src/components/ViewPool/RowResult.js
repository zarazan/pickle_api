import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { currencyFormatter } from '../../utilities/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RowResult = ({ isUser, rank, avatar, name, bankroll, wagers }) => {
    return (
        <RowWrapper className={`leaderboard-row ${isUser ? 'active-user' : ''}`}>
            <span className='leaderboard-row__telemetry row-item'>{rank}</span>
            <span className='leaderboard-row__avatar row-item'><FontAwesomeIcon icon={!avatar ? faUserCircle : avatar} size='2x'/></span>
            <span className='leaderboard-row__name row-item'>{isUser ? 'You' : truncateName(name)}</span>
            <span className='leaderboard-row__bankroll row-item'>{currencyFormatter.format(parseFloat(bankroll))}</span>
            <span className='leaderboard-row__wagers row-item'>{!wagers ? 'N/A' : currencyFormatter.format(parseFloat(wagers))}</span>
        </RowWrapper>
    );

    /** truncateName: Truncates a user's name to 19 characters. */
    function truncateName(name) {
        return name.slice(0, 19);
    };
};

RowResult.propTypes = {
    isUser: PropTypes.bool.isRequired,
    rank: PropTypes.number.isRequired,
    avatar: PropTypes.object,
    name: PropTypes.string.isRequired,
    bankroll: PropTypes.string.isRequired,
    wager: PropTypes.string,
};

RowResult.defaultProps = {
    avatar: null,
    wagers: 'N/A',
};

export default RowResult;

const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 28px auto 1fr 70px 70px;
    box-sizing: border-box;
    
    margin-bottom: 0.2rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;

    border-radius: 4px;
    font-family: 'Inter', 'Sans Serif';
    font-size: 12px;
    font-weight: 500;
    color: #272627;

    span.row-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    span.leaderboard-row__telemetry {
        color: #aaaaaa;
    }

    span.leaderboard-row__name {
        justify-content: flex-start;
    }

    span.leaderboard-row__avatar {
        box-sizing: border-box;
        padding: 0 0.7em 0 0.5em;
    }

    span.leaderboard-row__bankroll, span.leaderboard-row__wagers {
        font-size: 11px;
        color: #aaaaaa;
        text-align: right;
    }

    &[class~='active-user'] {
        font-weight: 700;
        background-color: #e8edfd;

        span.leaderboard-row__name, span.leaderboard-row__bankroll, span.leaderboard-row__wagers, span.leaderboard-row__telemetry {
            color: #5277e4;
        }
    }
`;
