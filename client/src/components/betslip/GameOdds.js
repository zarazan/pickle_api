import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BetCard from './BetCard';
import BetCart from './EnterWager';

const GameOdds = props => {
    const [betSlip, setBetSlip] = useState([]);
    const [multibet, setMultibet] = useState(false);
    const [showBetCart, setShowBetCart] = useState(false);

    return (
        <section>
            {showBetCart 
                ? <BetCart toggleBetCart={toggleBetCart}/>
                : <BetCard toggleBetCart={toggleBetCart}/> 
            }
        </section>
    );

    function toggleBetCart() {
        setShowBetCart(!showBetCart)
    }
};

GameOdds.propTypes = {
    
};

export default GameOdds; 