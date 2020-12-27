import React from 'react';
import PropTypes from 'prop-types';
import OpenBetCard from './OpenBetCard'

const OpenBets = ({ bets }) => {
    return (
        <section className='betslip-container'>
            {(bets || []).map((bet, i) => (
                <OpenBetCard key={i} bet={bet} />
            ))}
        </section>
    );
};

OpenBets.propTypes = {
    bets: PropTypes.array,
};

export default OpenBets;