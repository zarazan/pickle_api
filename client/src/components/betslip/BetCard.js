import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BetButton from '../../stories/BetButton'

const BetCard = ({ toggleBetCart }) => {
    return (
        <BetCardWrapper className='bet-card'>
            <div className='card-row bet-card__headers'>
                <div className='header date-time'>Sun 11:00 AM</div>
            </div>
            <div className='card-row bet-card__home'>
                <Team className='team-home'>TEN Titans</Team>
                <OddsContainer className='odds-container'>
                    <BetButton
                        className='odd point-spread'
                        value='-6'
                        callback={toggleBetCart}
                    />
                    <Odd className='odd total-points'>O 54.5</Odd>
                    <Odd className='odd money-line'>-250</Odd>
                </OddsContainer>
            </div>
            <div className='card-row bet-card__away'>
                <Team className='team-away'>CIN Bengals</Team>
                <OddsContainer className='odds-container'>
                    <Odd className='odd point-spread'>+6</Odd>
                    <Odd className='odd total-points'>U 54.5</Odd>
                    <Odd className='odd money-line'>+215</Odd>
                </OddsContainer>
            </div>
        </BetCardWrapper>
    );
};

BetCard.propTypes = {
    
};

export default BetCard;

const BetCardWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-flow: column nowrap;
    width: 100%;

    background-color: white;
    border-radius: 0.5em;
    border: 1px solid #d7def2;

    font-family: 'Inter', 'Sans Serif';
    font-size: 0.9em;

    & .card-row:not(:last-of-type) {
        margin-bottom: 0.2em;
    }

    & .card-row:last-of-type {
        margin-bottom: 0.5em;
    }

    .card-row {
        display: grid;
        grid-template-columns: 45% 1fr;
        grid-template-rows: 3em;

        .date-time {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0 0 1em;
            font-weight: 700;
        }
    }
`;

const OddsContainer = styled.div`
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.2em;
    margin-right: 0.5em;
`;

const Team = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 0 1em;
    font-weight: 500;
`;

const Odd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: #eaf3fd;
    color: #5698d6;
    border-radius: 0.4em;
    padding: 0;
`;