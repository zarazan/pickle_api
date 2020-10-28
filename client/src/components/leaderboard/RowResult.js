import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RowResult = ({ key, rank, avatar, name, bankroll }) => {
    return (
        <RowWrapper key={key} className='leaderboard-row'>
            <div className='leaderboard-row__telemetry row-item'>{rank + 1}</div>
            <div className='leaderboard-row__avatar row-item'><FontAwesomeIcon icon={!avatar ? faUserCircle : avatar} size='2x'/></div>
            <div className='leaderboard-row__name row-item'>{name}</div>
            <div className='bankroll row-item'>${bankroll}</div>
        </RowWrapper>
    );
};

RowResult.propTypes = {
    rank: PropTypes.number.isRequired,
    avatar: PropTypes.object,
    name: PropTypes.string.isRequired,
    bankroll: PropTypes.number.isRequired,
};

export default RowResult;


const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 2em auto 1fr 30%;
    font-family: 'Inter', 'Sans Serif';
    font-size: 1em;
    box-sizing: border-box;
    padding: 1em;
    border-radius: 0.4em;
    background-color: white;
    border: 1px solid #d7def2;
    margin-bottom: 0.5em;

    div.row-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.leaderboard-row__name {
        justify-content: flex-start;
    }

    div.leaderboard-row__avatar {
        box-sizing: border-box;
        padding: 0 0.7em 0 0.5em;
    }
`;
