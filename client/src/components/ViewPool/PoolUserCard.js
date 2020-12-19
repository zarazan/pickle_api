import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as Bank } from '../../icons/money-bag.svg';
import { ReactComponent as Chip } from '../../icons/poker-chip.svg';
import { ReactComponent as Slot } from '../../icons/slot-machine.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PoolUserCard = ({ name, avatar, bankroll, potentialPayout, outlay }) => {
    return (
        <CardWrapper className='pool-user-card'>
            {/* <CardHeader className='pool-user-card__header'>
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
            </CardFooter> */}
            <CardHeader className='pool-user-card__header'>
                
                <span className='pool-user-card__avatar'>{avatar ? avatar : <FontAwesomeIcon icon={faUserCircle} size='3x' />}</span>
                <span className='pool-user-card__name'>{name}</span>
            </CardHeader>
            <CardFooter className='pool-user-card__footer'>
                <div className='stat-column bankroll'>
                    <Bank />
                    <span className='column-heading'>Bankroll</span>
                    <div className='column-metric'>
                        <h2 className='pool-user-card__bankroll-dollars'>{getDollars(bankroll)}</h2>
                        <h4 className='pool-user-card_bankroll-cents'>{getCents(bankroll)}</h4>
                    </div>
                </div>
                <div className='stat-column open-bets'>
                    <Chip />
                    <span className='column-heading'>Wagers</span>
                    <div className='column-metric'>
                        <h2 className='pool-user-card__outlay-dollars'>{getDollars(outlay)}</h2>
                        <h4 className='pool-user-card_outlay-cents'>{getCents(outlay)}</h4>
                    </div>
                </div>
                <div className='stat-column payout'>
                    <Slot />
                    <span className='column-heading'>Payout</span>
                    <div className='column-metric'>
                        <h2 className='pool-user-card__payout-dollars'>{getDollars(potentialPayout)}</h2>
                        <h4 className='pool-user-card_payout-cents'>{getCents(potentialPayout)}</h4>
                    </div>
                </div>  
            </CardFooter>
        </CardWrapper>
    );
    
    /** getDollars: Returns the full dollar portion of a currency. */
    function getDollars(amount) {
        return amount.slice(0, amount.indexOf('.'));
    };

    /** getCents: Returns the cents portion of a currency. */
    function getCents(amount) {
        return amount.slice(amount.indexOf('.'));
    };
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
    grid-template-columns: repeat(3, 33%);
    column-gap: 8px;
    width: 100%;

    & div[class~='stat-column'] {
        display: grid;
        grid-template-columns: 24px 1fr;
        grid-template-rows: 66% 1fr;
        grid-template-areas:
            'logo metric'
            'empty footer';

        & svg {
            grid-area: logo;
            height: 16px;
            width: auto;
        }

        & span {
            grid-area: footer;
            font-family: 'Inter', 'Sans Serif';
            font-size: 14px;
            color: #aaaaaa;
        }

        & div.column-metric {
            grid-area: metric;
            display: flex;
        }

        & h2 {
            font-family: 'Poppins', 'Sans Serif';
            font-size: 16px;
            font-weight: 600;
            color: #272627;
            margin: 0 0 4px 0;
        }

        & h4 {
            font-family: 'Poppins', 'Sans Serif';
            font-size: 10px;
            font-weight: 600;
            color: #272627;
            margin: 2px 0 0 0;
        }
    }
`;