import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { currencyFormatter } from '../../utilities/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCrown } from '@fortawesome/free-solid-svg-icons';

const WinnerCard = ({ rank, avatar, name, bankroll }) => {
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => (
        determineIfLeader(rank)
    ), [rank]);

    return (
        <WinnerCardWrapper className={`winner-card-${rank}`}>
            <div className='winner-card__rank'>{isLeader ? <FontAwesomeIcon icon={faCrown} size='2x' /> : rank}</div>
            <div className='winner-card__avatar'>{!avatar ? <FontAwesomeIcon icon={faUserCircle} size={isLeader ? '3x' : '2x'} /> : avatar}</div>
            <h3 className='winner-card__bankroll'>{currencyFormatter.format(bankroll)}</h3>
            <h4 className='winner-card__name'>{name}</h4>
        </WinnerCardWrapper>
    );

    function determineIfLeader(number) {
        if(number === 1) {
            setIsLeader(true);
        }
    }
};

WinnerCard.propTypes = {
    rank: PropTypes.number,
    avatar: PropTypes.object,
    bankroll: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default WinnerCard;

const WinnerCardWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    font-family: 'Inter', 'Sans Serif';
    font-size: 1rem;

    & .winner-card__rank {
        & > svg {
            color: #ffa008;
        }
    }

    & .winner-card__avatar {
        box-sizing: border-box;
        margin-top: 0.7em;
    }

    & .winner-card__bankroll {
        margin: 0.7rem 0 0.2rem 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 16px;
        color: #202122;
        text-align: center;
    }

    & .winner-card__name {
        font-family: 'Poppins', 'Sans Serif';
        font-size: 12px;
        color: #202122;
        font-weight: 300;
        text-align: center;
    }
`;