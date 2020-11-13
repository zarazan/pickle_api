import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RowResult = ({ rank, avatar, name, bankroll }) => {
    return (
        <RowWrapper className='leaderboard-row'>
            <div className='leaderboard-row__telemetry row-item'>{rank + 1}</div>
            <div className='leaderboard-row__avatar row-item'><FontAwesomeIcon icon={!avatar ? faUserCircle : avatar} size='2x'/></div>
            <div className='leaderboard-row__name row-item'>{name ? name : 'Lorem Ipsum'}</div>
            <div className='leaderboard-row__bankroll row-item'>${bankroll ? bankroll : '$999'}</div>
        </RowWrapper>
    );
};

RowResult.propTypes = {
    rank: PropTypes.number.isRequired,
    avatar: PropTypes.object,
    name: PropTypes.string.isRequired,
    bankroll: PropTypes.string.isRequired,
};

export default RowResult;


const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 3em auto 1fr 25%;
    box-sizing: border-box;
    
    margin-bottom: 0.2rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;

    border-radius: 0.2rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 3px 0px, rgba(60, 64, 67, 0.15) 0px 1px 2px 0px;
    font-family: 'Inter', 'Sans Serif';
    font-size: .85rem;
    font-weight: 500;

    div.row-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.leaderboard-row__name {
        justify-content: flex-start;
    }

    div.leaderboard-row__bankroll {
        font-weight: 300;
    }

    div.leaderboard-row__avatar {
        box-sizing: border-box;
        padding: 0 0.7em 0 0.5em;
    }
`;
