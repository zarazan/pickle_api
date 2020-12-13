import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PoolUserCard = ({ name, avatar, bankroll, potentialPayout }) => {
    return (
        <CardWrapper className='pool-user-card'>
            <span className='pool-user-card__avatar'>{avatar ? avatar : <FontAwesomeIcon icon={faUserCircle} size='3x' />}</span>
            <span className='pool-user-card__name'>{name}</span>
            <h2 className='pool-user-card__bankroll'>{bankroll}</h2>
            <h3 className='pool-user-card__potential-payout'>{`Potential ${potentialPayout}`}</h3>
        </CardWrapper>
    );
};

PoolUserCard.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.object,
    bankroll: PropTypes.string,
    potentialPayout: PropTypes.string
};

export default PoolUserCard;

const CardWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem;

    border-radius: 0.2rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    font-family: 'Inter', 'Sans Serif';
    font-size: 1rem;

    & svg {
        margin-bottom: 0.5rem;
    }

    & .pool-user-card__bankroll {
        font-family: 'Poppins', 'Sans Serif';
        font-size: 2rem;
        font-weight: 700;
        color: #8fd6a9;
        margin: 0.75rem 0 0.5rem 0;
    }

    & h3 {
        font-family: 'Inter', 'Sans Serif';
        font-size: 1rem;
        font-weight: 300;
        color: #bfbfbf;
        margin: 0;
    }
`;