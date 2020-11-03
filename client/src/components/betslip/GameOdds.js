import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import pickleApi from '../../services/pickle_api';
import BetCard from './BetCard';
import EnterWager from './EnterWager';
import MOCK_FIXTURES from '../../constants/mockFixtures';
import decToAmerican from '../../utilities/helpers';

const GameOdds = props => {
    const [betSlip, setBetSlip] = useState([]);
    // const [multibet, setMultibet] = useState(false);
    const [currentBet, setCurrentBet] = useState(null);
    const [toggleBetSlip, setToggleBetSlip] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <section>
            {toggleBetSlip 
                ? (
                    <EnterWager
                        currentBet={currentBet}
                        placeBet={enterBet}
                        closeBetSlip={closeBetSlip}
                        errors={errorMessage}
                    />
                ) : ( 
                    <>
                        {MOCK_FIXTURES.map((fixture, index) => (
                            <BetCard 
                                key={index}
                                id={fixture.id}
                                home={fixture.home_team_id}
                                away={fixture.away_team_id}
                                odds={fixture.odds}
                                gameDate={fixture.start_time}
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
        setCurrentBet(null);
    }

    function selectBet(betId) {
        setCurrentBet(betId);
        setToggleBetSlip(!toggleBetSlip)
    }

    /** enterBet: Sends Pickle API request for placing a bet.**/
    function enterBet(betId, betAmount) {
        // /pools/:id/place_bet data: { odd_id: 1, amount: '50' }
        let resp = {};
        resp.odd_id = betId;
        resp.amount = betAmount;

        // console.log(resp);

        pickleApi.createBet(resp)
            .then(data => {
                //console.log(data)
                setBetSlip([...betSlip, data]);
                setToggleBetSlip(false);
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
    }
};

GameOdds.propTypes = {
    
};

export default GameOdds; 