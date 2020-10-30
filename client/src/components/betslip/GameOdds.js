import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BetCard from './BetCard';
import EnterWager from './EnterWager';
import MOCK_FIXTURES from '../../constants/mockFixtures';

const GameOdds = props => {
    const [betSlip, setBetSlip] = useState([]);
    const [currentBet, setCurrentBet] = useState({});
    const [multibet, setMultibet] = useState(false);
    const [showBetCart, setShowBetCart] = useState(false);
    const MOCK_TEAMS = {
        1: {
            name: 'ARZ Cardinals'
        },
        2: {
            name: 'CAR Panthers'
        },
        3: {
            name: 'PIT Steelers'
        },
        4: {
            name: 'GB Packers'
        },
    }

    return (
        <section>
            {showBetCart 
                ? (
                    <EnterWager toggleBetCart={toggleBetCart}/>
                ) : ( 
                    <>
                        {MOCK_FIXTURES.map((fixture, index) => (
                            <BetCard 
                                key={index}
                                id={fixture.id}
                                home={MOCK_TEAMS[fixture.home_team_id].name}
                                away={MOCK_TEAMS[fixture.away_team_id].name}
                                odds={fixture.odds}
                                gameDate={fixture.start_time}
                                toggleBetCart={toggleBetCart}
                            /> 
                        ))}
                    </>
                )
            }
        </section>
    );

    function toggleBetCart(data) {
        setCurrentBet(data);
        setShowBetCart(!showBetCart)
    }
};

GameOdds.propTypes = {
    
};

export default GameOdds; 