import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { decToAmerican, zuluToStringFormat } from '../../utilities/helpers';

import BetButton from '../../stories/BetButton';
import BetButtonOverUnder from '../../stories/BetButtonOverUnder';
import { ReactComponent as Lock } from '../../icons/padlock.svg';

const BetCard = ({ fixture, odds, selectedBets, selectBet }) => {
    const baseOddsTemplate = { // Base object template for seeding home and away odds state
        'pointSpread': { 'betId': null, 'metric': null, 'ratio': null }, 
        'moneyLine': { 'betId': null, 'metric': null, 'ratio': null }, 
        'totalPoints': { 'betId': null, 'metric': null, 'ratio': null } 
    };
    const [homeOdds, setHomeOdds] = useState(baseOddsTemplate); // Used for housing state for home vs. away odds
    const [awayOdds, setAwayOdds] = useState(baseOddsTemplate); // Used for housing state for home vs. away odds
    
    /** Seeds the home and away odds to allow us to parse the odds into their own specific button on the bet card. */
    useEffect(() => {
        setHomeOdds(createSeedData(odds, 'home', fixture.homeTeamId));
        setAwayOdds(createSeedData(odds, 'away', fixture.awayTeamId));
    }, []);

    return (
        <BetCardWrapper className='c-bet-card l-column-flex'>

            <div className='l-column-flex l-column-flex__item'>
                <h3 className='c-bet-card__game-name'>{`${fixture.awayTeamName} vs ${fixture.homeTeamName}`}</h3>
                <h4 className='c-bet-card__game-date'>{zuluToStringFormat(fixture.startTime)}</h4>
            </div>

            {fixture.status === 'home_win' || fixture.status === 'away_win'
                ? 
                    <FinalScore className='l-column-flex l-column-flex__item'>
                        <h4 className='c-bet-card__score'>{`${fixture.awayTeamName} - ${fixture.awayScore}`}</h4>
                        <h4 className='c-bet-card__score'>{`${fixture.homeTeamName} - ${fixture.homeScore}`}</h4>
                    </FinalScore>

                : fixture.locked && (fixture.status === 'scheduled' || fixture.status === 'in-progress')
                    ?
                        <LockedMessage className='l-row-flex l-column-flex__item'>
                            <Lock className='c-bet-card__locked-icon'/>
                            <h3 className='c-bet-card__locked-message'>{'Game Locked'}</h3>
                        </LockedMessage>
                    :
                        <>
                            <TeamAndOddsRow className='l-grid l-column-flex__item'>
                                <h4 className='l-grid__item c-bet-card__team-home'>{fixture.homeTeamName}</h4>
                                <OddsContainer className='l-grid l-grid__item'>

                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === homeOdds.pointSpread.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButton 
                                            key={'homeSpread'}
                                            className='btn c-bet-card__bet-button'
                                            metric={homeOdds.pointSpread.metric}
                                            ratio={decToAmerican(homeOdds.pointSpread.ratio)}
                                            callback={() => selectBet(fixture.id, homeOdds.pointSpread.betId)}
                                        />
                                    </SelectableBet>
                                    {/* <SelectableBet className={`l-row-flex l-grid__item${selectedBets.indexOf(homeOdds.totalPoints.betId) > -1 ? '--selected' : ''}`}> */}
                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === homeOdds.totalPoints.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButtonOverUnder 
                                            key={'homeTotal'}
                                            className='btn c-bet-card__bet-button'
                                            whichSpreadType={'over'}
                                            metric={homeOdds.totalPoints.metric}
                                            ratio={decToAmerican(homeOdds.totalPoints.ratio)}
                                            callback={() => selectBet(fixture.id, homeOdds.totalPoints.betId)}
                                        />
                                    </SelectableBet>
                                    {/* <SelectableBet className={`l-row-flex l-grid__item${selectedBets.indexOf(homeOdds.moneyLine.betId) > -1 ? '--selected' : ''}`}> */}
                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === homeOdds.moneyLine.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButton 
                                            key={'homeMoney'}
                                            className='btn c-bet-card__bet-button'
                                            metric={homeOdds.moneyLine.metric}
                                            ratio={decToAmerican(homeOdds.moneyLine.ratio)}
                                            callback={() => selectBet(fixture.id, homeOdds.moneyLine.betId)}
                                        />
                                    </SelectableBet>

                                </OddsContainer>
                            </TeamAndOddsRow>

                            <TeamAndOddsRow className='l-grid l-column-flex__item'>
                                <h4 className='l-grid__item c-bet-card__team-home'>{fixture.awayTeamName}</h4>
                                <OddsContainer className='l-grid l-grid__item'>

                                    {/* <SelectableBet className={`l-row-flex l-grid__item${selectedBets.indexOf(awayOdds.pointSpread.betId) > -1 ? '--selected' : ''}`}> */}
                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === awayOdds.pointSpread.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButton 
                                            key={'awaySpread'}
                                            className='btn c-bet-card__bet-button'
                                            metric={awayOdds.pointSpread.metric}
                                            ratio={decToAmerican(awayOdds.pointSpread.ratio)}
                                            callback={() => selectBet(fixture.id, awayOdds.pointSpread.betId)}
                                        />
                                    </SelectableBet>
                                    {/* <SelectableBet className={`l-row-flex l-grid__item${selectedBets.indexOf(awayOdds.totalPoints.betId) > -1 ? '--selected' : ''}`}> */}
                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === awayOdds.totalPoints.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButtonOverUnder 
                                            key={'awayTotal'}
                                            className='btn c-bet-card__bet-button'
                                            whichSpreadType={'under'}
                                            metric={awayOdds.totalPoints.metric}
                                            ratio={decToAmerican(awayOdds.totalPoints.ratio)}
                                            callback={() => selectBet(fixture.id, awayOdds.totalPoints.betId)}
                                        />
                                    </SelectableBet>
                                    {/* <SelectableBet className={`l-row-flex l-grid__item${selectedBets.indexOf(awayOdds.moneyLine.betId) > -1 ? '--selected' : ''}`}> */}
                                    <SelectableBet className={`l-row-flex l-grid__item${selectedBets.findIndex(b => b.id === awayOdds.moneyLine.betId) > -1 ? '--selected' : ''}`}>
                                        <BetButton 
                                            key={'awayMoney'}
                                            className='btn c-bet-card__bet-button'
                                            metric={awayOdds.moneyLine.metric}
                                            ratio={decToAmerican(awayOdds.moneyLine.ratio)}
                                            callback={() => selectBet(fixture.id, awayOdds.moneyLine.betId)}
                                        />
                                    </SelectableBet>

                                </OddsContainer>
                            </TeamAndOddsRow>
                        </>
            }
        </BetCardWrapper>
    );

    /**
     * createSeedData: Filters the fixture data and returns the neccessary shape for local bet state.
     * @param {object} oddsData - The entire odds data object for a particular fixture.
     * @param {string} teamType - Designation of the team; either home or away.
     * @param {string} teamId - The ID for the team.
     */
    function createSeedData(oddsData, teamType, teamId) {
        let newState = {};
        let totalPoints = { 'betId': null, 'metric': null, 'ratio': null };
  
        // Get arrays of odds by home vs. away
        const teamOdds = oddsData.filter(odd => odd.teamId === teamId);
       
        // Get each bet type
        const [ spreadBet ] = teamOdds.filter(d => d.teamId === teamId && d.type === 'spread');
        const [ moneyBet ] = teamOdds.filter(d => d.teamId === teamId && d.type === 'money_line');
        const [ over ] = oddsData.filter(d => d.type === 'over');
        const [ under ] = oddsData.filter(d => d.type === 'under');
        
        // Seed team-based data
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
    fixture: PropTypes.object.isRequired, 
    odds: PropTypes.array.isRequired,
    selectedBets: PropTypes.array.isRequired,
    selectBet: PropTypes.func.isRequired,
};

export default BetCard;

const BetCardWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-flow: column nowrap;
    width: 100%;
    padding: 9px;

    border-radius: 0.2em;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 3px 0px, rgba(60, 64, 67, 0.15) 0px 1px 2px 0px;

    font-family: 'Inter', 'Sans Serif';

    & div.l-grid {
        display: grid;
        box-sizing: border-box;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        box-sizing: border-box;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        box-sizing: border-box;
        flex-flow: row nowrap;
    }

    & div[class~='l-column-flex__item']:first-of-type {
        border-bottom: 1px solid #F2F2F2;
    }

    & div[class~='l-column-flex__item']:not(:last-of-type) {
        margin-bottom: 8px;
    }

    & h3 {
        font-size: 14px;
        font-weight: 700;
        margin: 8px 0 6px 0;
    }

    & h4 {
        font-size: 12px;
        font-weight: 300;
        margin: 0 0 6px 0;

        &.c-bet-card__game-date {
            color: #8b8c8f;
        }
    }
`;

const FinalScore = styled.div`
    & .c-bet-card__score {
        font-family: 'Poppins', 'Sans Serif';
        color: #BFBFBF;
    }
`;

const LockedMessage = styled.div`
    justify-content: center;
    align-items: center;

    & svg {
        height: 1.25rem;
        width: 1.25rem;
        margin: 0 12px;
        fill: #BFBFBF;
    }

    & .c-bet-card__locked-message {
        font-family: 'Poppins', 'Sans Serif';
        color: #BFBFBF;
    }
`;

const TeamAndOddsRow = styled.div`
    grid-template-columns: 45% 1fr;
    grid-template-rows: 3em;
    row-gap: 3px;

    & :first-child {
        display: flex;
        align-items: center;
    }
`;

const OddsContainer = styled.div`
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.2em;
`;

const SelectableBet = styled.div`
    &.l-grid__item--selected {

        & div.c-bet-card__bet-button {
            &  > button {
                background: #53DFB5;
                color: white;
            }
        }
    }

    & .c-bet-card__bet-button {
        height: 100%;
        width: 100%;
    }
`;