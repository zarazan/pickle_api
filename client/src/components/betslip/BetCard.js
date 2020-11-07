import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BetButton from '../../stories/BetButton';
import decToAmerican from '../../utilities/helpers';

const BetCard = ({ selectBet, homeTeamName, homeTeamId, awayTeamName, awayTeamId, odds, gameDate }) => {
    return (
        <BetCardWrapper className='bet-card'>
            <div className='card-row bet-card__headers'>
                <div className='header date-time'>{gameDate}</div>
            </div>
            <div className='card-row bet-card__home'>
                <Team className='team-home'>{homeTeamName}</Team>
                    <OddsContainer className='odds-container'>
                        {odds
                            .filter(odd => odd.teamId === homeTeamId)
                            .map((odd, index) => (
                                <BetButton
                                    key={index}
                                    className='odd money-line'
                                    value={decToAmerican(odd.ratio)}
                                    callback={() => selectBet(odd.fixtureId, odd.id)}
                                />
                            ))}
                    </OddsContainer>
            </div>
            <div className='card-row bet-card__away'>
                <Team className='team-away'>{awayTeamName}</Team>
                <OddsContainer className='odds-container'>
                    {odds
                        .filter(odd => odd.teamId === awayTeamId)
                        .map((odd, index) => (
                            <BetButton
                                key={index}
                                className='odd money-line'
                                value={decToAmerican(odd.ratio)}
                                callback={() => selectBet(odd.fixtureId, odd.id)}
                            />
                        ))}
                </OddsContainer>
            </div>
        </BetCardWrapper>
    );
};

BetCard.propTypes = {
    selectBet: PropTypes.func.isRequired,
    home: PropTypes.number.isRequired,
    away: PropTypes.number.isRequired,
    odds: PropTypes.array.isRequired,
    gameDate: PropTypes.string,
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