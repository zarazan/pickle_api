import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PoolUserCard = ({ name, avatar, bankroll }) => {
    return (
        <CardWrapper className='pool-user-card'>
            <span className='pool-user-card__avatar'>{avatar ? avatar : <FontAwesomeIcon icon={faUserCircle} size='3x' />}</span>
            <h2 className='pool-user-card__name'>{name ? name : 'Lorem Ipsum'}</h2>
            <span className='pool-user-card__bankroll'>{bankroll ? bankroll : '$0'}</span>
        </CardWrapper>
    );
};

PoolUserCard.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.object,
    bankroll: PropTypes.string,
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

    & h2 {
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1.25rem;
        margin: 0.75rem 0 0.5rem 0;
    }
`;