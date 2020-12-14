import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { decToAmerican, zuluToStringFormat } from '../../utilities/helpers';

import BetButton from '../../stories/BetButton';
import BetButtonOverUnder from '../../stories/BetButtonOverUnder';
import { ReactComponent as Lock } from '../../icons/padlock.svg';

const BetCard = ({ 
    fixtureId, 
    locked, 
    homeTeamName, 
    homeTeamId, 
    homeScore, 
    awayTeamName, 
    awayTeamId, 
    awayScore, 
    odds, 
    gameDate, 
    selectBet, 
    status 
}) => {
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
        <BetCardWrapper className={`bet-card${locked && ' locked'}`}>
            <div className='bet-card__headers'>
                <h3>{zuluToStringFormat(gameDate)}</h3>
                <h4>{`${awayTeamName} vs ${homeTeamName}`}</h4>
            </div>
            {status === 'home_win' || status === 'away_win'
                ? 
                    <FinalScoreMessage className='final-status'>
                        <h3 className='final-status__message'>
                            {`${awayTeamName} ${awayScore} - ${homeTeamName} ${homeScore}`}
                        </h3>
                    </FinalScoreMessage>
                : locked && (status === 'scheduled' || status === 'in-progress')
                    ?
                        <LockedMessage className='locked-status'>
                            <Lock className='locked-status__icon'/>
                            <h3 className='locked-status__message'>{'Game Locked'}</h3>
                        </LockedMessage>
                    :
                        <>
                            <div className='card-row bet-card__home'>
                                <Team className='team-home'>{homeTeamName}</Team>
                                    <OddsContainer className='odds-container'>

                                        <BetButton 
                                            key={'homeSpread'}
                                            className='odd spread'
                                            metric={homeOdds.pointSpread.metric}
                                            ratio={decToAmerican(homeOdds.pointSpread.ratio)}
                                            callback={() => selectBet(fixtureId, homeOdds.pointSpread.betId)}
                                        />
                                        <BetButtonOverUnder 
                                            key={'homeTotal'}
                                            className='odd total'
                                            which={'over'}
                                            metric={homeOdds.totalPoints.metric}
                                            ratio={decToAmerican(homeOdds.totalPoints.ratio)}
                                            callback={() => selectBet(fixtureId, homeOdds.totalPoints.betId)}
                                        />
                                        <BetButton 
                                            key={'homeMoney'}
                                            className='odd money'
                                            metric={homeOdds.moneyLine.metric}
                                            ratio={decToAmerican(homeOdds.moneyLine.ratio)}
                                            callback={() => selectBet(fixtureId, homeOdds.moneyLine.betId)}
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
                                        callback={() => selectBet(fixtureId, awayOdds.pointSpread.betId)}
                                    />
                                    <BetButtonOverUnder 
                                        key={'awayTotal'}
                                        className='odd total'
                                        which={'under'}
                                        metric={awayOdds.totalPoints.metric}
                                        ratio={decToAmerican(awayOdds.totalPoints.ratio)}
                                        callback={() => selectBet(fixtureId, awayOdds.totalPoints.betId)}
                                    />
                                    <BetButton 
                                        key={'awayMoney'}
                                        className='odd money'
                                        metric={awayOdds.moneyLine.metric}
                                        ratio={decToAmerican(awayOdds.moneyLine.ratio)}
                                        callback={() => selectBet(fixtureId, awayOdds.moneyLine.betId)}
                                    />

                                </OddsContainer>
                            </div>
                        </>
            }
        </BetCardWrapper>
    );

    /** createSeedData: Filters the fixture data and returns the neccessary shape for local bet state. */
    function createSeedData(oddsData, teamType, teamId) {
        let newState = {};
        let totalPoints = { 'betId': null, 'metric': null, 'ratio': null };
  
        // get arrays of odds by home vs. away
        const teamOdds = oddsData.filter(odd => odd.teamId === teamId);
       
        // get each bet type
        const [ spreadBet ] = teamOdds.filter(d => d.teamId === teamId && d.type === 'spread');
        const [ moneyBet ] = teamOdds.filter(d => d.teamId === teamId && d.type === 'money_line');
        const [ over ] = oddsData.filter(d => d.type === 'over');
        const [ under ] = oddsData.filter(d => d.type === 'under');
        
        // seed team-based data
        newState.moneyLine = { 'betId': moneyBet && moneyBet.id, 'metric': '', 'ratio': moneyBet && moneyBet.ratio };
        newState.pointSpread = { 'betId': spreadBet && spreadBet.id, 'metric': spreadBet && spreadBet.metric, 'ratio': spreadBet && spreadBet.ratio };
        
        if(teamType === 'home') {            
            totalPoints.betId = over && over.id;
            totalPoints.metric = over && over.metric;
            totalPoints.ratio = over && over.ratio;
            newState.totalPoints = totalPoints;

        } else {
            totalPoints.betId = under && under.id;
            totalPoints.metric = under && under.metric;
            totalPoints.ratio = under && under.ratio;
            newState.totalPoints = totalPoints;
        }
        return newState;
    }
};

BetCard.propTypes = {
    fixtureId: PropTypes.number.isRequired, 
    locked: PropTypes.bool.isRequired,
    homeTeamName: PropTypes.string.isRequired,
    homeTeamId: PropTypes.number.isRequired,
    homeScore: PropTypes.number,
    awayTeamName: PropTypes.string.isRequired,
    awayTeamId: PropTypes.number.isRequired,
    awayScore: PropTypes.number,
    odds: PropTypes.array.isRequired,
    gameDate: PropTypes.string,
    selectBet: PropTypes.func.isRequired,
    status: PropTypes.string,
};

BetCard.defaultProps = {
    homeScore: 0,
    awayScore: 0,
    status: 'scheduled',
    gameDate: '2020-12-14T18:34:07.532Z',
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
        flex-flow: column nowrap;
        box-sizing: border-box;
        padding: 0 0 0 1em;
        font-weight: 700;

        & h3 {
            font-size: 0.8rem;
            margin: 1rem 0 0.5rem 0;
            color: #808080;
            font-weight: 300;
        }

        & h4 {
            font-size: 0.8rem;
            margin: 0 0 1rem;
            color: #404040;
            font-weight: 700;
        }
    }

    & .card-row:last-of-type {
        margin-bottom: 0.5em;
    }

    .card-row {
        display: grid;
        grid-template-columns: 45% 1fr;
        grid-template-rows: 3em;
        margin-bottom: 0.2em;
    }
`;

const LockedMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    padding-bottom: 0.7rem;

    & > svg.locked-status__icon {
        height: 1.25rem;
        width: 1.25rem;
        fill: #bfbfbf;
    }

    & > h3 {
        margin: 0 0 0 0.5rem;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 0.8125rem;
        color: #bfbfbf;
    }
`;

const FinalScoreMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    padding-bottom: 0.7rem;

    & > h3 {
        margin: 0 0 0 0.5rem;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 0.8125rem;
        color: #bfbfbf;
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