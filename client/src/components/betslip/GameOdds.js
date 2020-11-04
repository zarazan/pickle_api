import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pickleApi from '../../services/pickle_api';
import BetCard from './BetCard';
import EnterWager from './EnterWager';

const GameOdds = ({ poolId, fixtures }) => {
    const [betSlip, setBetSlip] = useState([]);
    // const [multibet, setMultibet] = useState(false);
    const [currentFixture, setCurrentFixture] = useState(null);
    const [currentBet, setCurrentBet] = useState(null);
    const [toggleBetSlip, setToggleBetSlip] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const gameName = `${fixtures.awayTeamName} @ ${fixtures.homeTeamName}`;

    return (
        <section>
            {toggleBetSlip 
                ? (
                    <EnterWager
                        currentBetId={currentBet}
                        gameName={gameName}
                        betOdd={fixtures.filter(f => f.odd_id === currentBet)}
                        placeBet={enterBet}
                        closeBetSlip={closeBetSlip}
                        errors={errorMessage}
                    />
                ) : ( 
                    <>
                        {(fixtures || []).map((fixture, index) => (
                            <BetCard 
                                key={index}
                                id={fixture.id}
                                homeTeamName={fixture.homeTeamName}
                                homeTeamId={fixture.homeTeamId}
                                awayTeamName={fixture.awayTeamName}
                                awayTeamId={fixture.awayTeamId}
                                odds={fixture.odds}
                                gameDate={fixture.startRime}
                                selectBet={selectBet}
                            /> 
                        ))}
                    </>
                )
            }
        </section>
    );

    function closeBetSlip() {
        setToggleBetSlip(!toggleBetSlip);
        setCurrentFixture(null);
        setCurrentBet(null);
    }

    function selectBet(fixtureId, betId) {
        setCurrentFixture(fixtureId);
        setCurrentBet(betId);
        setToggleBetSlip(!toggleBetSlip)
    }

    /** enterBet: Sends Pickle API request for placing a bet.**/
    function enterBet(betId, betAmount) {
        // /pools/:id/place_bet data: { odd_id: 1, amount: '50' }
        let resp = {};
        resp.pool_id = poolId;
        resp.odd_id = betId;
        resp.amount = betAmount;

        // console.log(resp);

        pickleApi.createBet(resp)
            .then(data => {
                console.log(data);
                setBetSlip([...betSlip, data]);
                setToggleBetSlip(false);
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
    }
};

GameOdds.propTypes = {
    poolId: PropTypes.number.isRequired,
    fixtures: PropTypes.array.isRequired,
};

export default GameOdds; 