import React from 'react';
import PropTypes from 'prop-types';

const BetCart = ({ toggleBetCart }) => {
    return (
        <div>
            Bet Cart
            <button onClick={toggleBetCart}>Back to Card</button>
        </div>
    );
};

BetCart.propTypes = {
    
};

export default BetCart;