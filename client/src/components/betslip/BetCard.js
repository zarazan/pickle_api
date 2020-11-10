import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BetButton from '../../stories/BetButton';
import BetButtonOverUnder from '../../stories/BetButtonOverUnder';
import { decToAmerican, zuluToStringFormat } from '../../utilities/helpers';

const BetCard = ({ selectBet, homeTeamName, homeTeamId, awayTeamName, awayTeamId, odds, gameDate }) => {
    const [homeOdds, setHomeOdds] = useState({ 'pointSpread': { 'betId': null, 'metric': null, 'ratio': null }, 'moneyLine': { 'betId': null, 'metric': null, 'ratio': null }, 'totalPoints': { 'betId': null, 'metric': null, 'ratio': null } });
    const [awayOdds, setAwayOdds] = useState({ 'pointSpread': { 'betId': null, 'metric': null, 'ratio': null }, 'moneyLine': { 'betId': null, 'metric': null, 'ratio': null }, 'totalPoints': { 'betId': null, 'metric': null, 'ratio': null } });
    
    useEffect(() => {
        // seed state
        let home = createSeedData(odds, 'home', homeTeamId);
        let away = createSeedData(odds, 'away', awayTeamId);
        setHomeOdds(home);
        setAwayOdds(away);
    }, []);

    return (
        <BetCardWrapper className='bet-card'>
            <div className='bet-card__headers'>
                <div className='header date-time'><h3>{zuluToStringFormat(gameDate)}</h3></div>
            </div>
            <div className='card-row bet-card__home'>
                <Team className='team-home'>{homeTeamName}</Team>
                    <OddsContainer className='odds-container'>

                        <BetButton 
                            key={'homeSpread'}
                            className='odd spread'
                            metric={homeOdds.pointSpread.metric}
                            ratio={decToAmerican(homeOdds.pointSpread.ratio)}
                            callback={() => selectBet(odds.fixtureId, homeOdds.pointSpread.betId)}
                        />
                        <BetButtonOverUnder 
                            key={'homeTotal'}
                            className='odd total'
                            which={'over'}
                            metric={homeOdds.totalPoints.metric}
                            ratio={decToAmerican(homeOdds.totalPoints.ratio)}
                            callback={() => selectBet(odds.fixtureId, homeOdds.totalPoints.betId)}
                        />
                        <BetButton 
                            key={'homeMoney'}
                            className='odd money'
                            metric={homeOdds.moneyLine.metric}
                            ratio={decToAmerican(homeOdds.moneyLine.ratio)}
                            callback={() => selectBet(odds.fixtureId, homeOdds.moneyLine.betId)}
                        />

                    </OddsContainer>
            </div>
            <div className='card-row bet-card__away'>
                <Team className='team-away'>{awayTeamName}</Team>
                <OddsContainer className='odds-container'>

                    <BetButton 
                        key={'awaySpread'}
                        className='odd spread'
                        metric={awayOdds.pointSpread.metric}
                        ratio={decToAmerican(awayOdds.pointSpread.ratio)}
                        callback={() => selectBet(odds.fixtureId, awayOdds.pointSpread.betId)}
                    />
                    <BetButtonOverUnder 
                        key={'awayTotal'}
                        className='odd total'
                        which={'under'}
                        metric={awayOdds.totalPoints.metric}
                        ratio={decToAmerican(awayOdds.totalPoints.ratio)}
                        callback={() => selectBet(odds.fixtureId, awayOdds.totalPoints.betId)}
                    />
                    <BetButton 
                        key={'awayMoney'}
                        className='odd money'
                        metric={awayOdds.moneyLine.metric}
                        ratio={decToAmerican(awayOdds.moneyLine.ratio)}
                        callback={() => selectBet(odds.fixtureId, awayOdds.moneyLine.betId)}
                    />

                </OddsContainer>
            </div>
        </BetCardWrapper>
    );

    /** createSeedData: Filters the fixture data and returns the neccessary shape for local bet state. */
    function createSeedData(oddsData, teamType, teamId) {
        let newState = {};
        let totalPoints = { 'betId': null, 'metric': null, 'ratio': null };
  
        // get arrays of odds by home vs. away
        const teamOdds = oddsData.filter(odd => odd.teamId === teamId);
       
        // get each bet type
        const spreadBet = teamOdds.filter(d => d.teamId === teamId && d.type === 'spread').pop();
        const moneyBet = teamOdds.filter(d => d.teamId === teamId && d.type === 'money_line').pop();
        const over = oddsData.filter(d => d.type === 'over').pop();
        const under = oddsData.filter(d => d.type === 'under').pop();
        
        // seed team-based data
        newState.moneyLine = { 'betId': moneyBet.id, 'metric': '', 'ratio': moneyBet.ratio };
        newState.pointSpread = { 'betId': spreadBet.id, 'metric': spreadBet.metric, 'ratio': spreadBet.ratio };
        
        if(teamType === 'home') {            
            totalPoints.betId = over.id;
            totalPoints.metric = over.metric;
            totalPoints.ratio = over.ratio;
            newState.totalPoints = totalPoints;

        } else {
            totalPoints.betId = under.id;
            totalPoints.metric = under.metric;
            totalPoints.ratio = under.ratio;
            newState.totalPoints = totalPoints;
        }
        return newState;
    }
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
    margin-bottom: 0.4rem;

    background-color: white;
    border-radius: 0.2em;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 3px 0px, rgba(60, 64, 67, 0.15) 0px 1px 2px 0px;

    font-family: 'Inter', 'Sans Serif';
    font-size: 0.8rem;

    .bet-card__headers {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0 0 1em;
        font-weight: 700;

        & h3 {
            font-size: 0.8rem;
            margin: 1rem 0 0.5rem 0;
            color: #808080;
        }
    }

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