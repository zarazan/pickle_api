import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PoolUserCard = ({ name, avatar, bankroll, potentialPayout, outlay }) => {
    return (
        <CardWrapper className='pool-user-card'>
            <CardHeader className='pool-user-card__header'>
                <span className='pool-user-card__avatar'>{avatar ? avatar : <FontAwesomeIcon icon={faUserCircle} size='3x' />}</span>
                <span className='pool-user-card__name'>{name}</span>
            </CardHeader>
            <CardFooter className='pool-user-card__footer'>
                <div className='stat-column bankroll'>
                    <span className='column-heading'>Bankroll</span>
                    <h2 className='pool-user-card__bankroll'>{bankroll}</h2>
                </div>
                <div className='stat-column open-bets'>
                    <span className='column-heading'>Wagers</span>
                    <h2 className='pool-user-card__total-outlay'>{`${outlay}`}</h2>
                </div>
                <div className='stat-column payout'>
                    <span className='column-heading'>Payout</span>
                    <h2 className='pool-user-card__potential-payout'>{`${potentialPayout}`}</h2>
                </div>  
            </CardFooter>
        </CardWrapper>
    );
};

PoolUserCard.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.object,
    bankroll: PropTypes.string.isRequired,
    potentialPayout: PropTypes.string,
    outlay: PropTypes.string,
};

PoolUserCard.defaultProps = {
    avatar: null,
    potentialPayout: 0,
    outlay: 0,
}

export default PoolUserCard;

const CardWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem;

    border-radius: 0.2rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;    
`;

const CardHeader = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 1.5rem;

    font-family: 'Inter', 'Sans Serif';
    font-size: 1rem;

    & svg {
        margin-bottom: 0.5rem;
    }
`;

const CardFooter = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;

    & div[class~='stat-column'] {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        & span {
            font-family: 'Inter', 'Sans Serif';
            font-size: 14px;
            color: #aaaaaa;
            text-align: center;
        }

        & h2 {
            font-family: 'Poppins', 'Sans Serif';
            font-size: 16px;
            font-weight: 600;
            color: #242423;
            margin: 0.75rem 0 0.5rem 0;
        }
    }
`;