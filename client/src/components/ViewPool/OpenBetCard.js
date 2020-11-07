import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OpenBets = ({ bet }) => {
    return (
        <BetSlip className='betslip'>
            <div className='header'>
                <div className='betslip__date-placed'>{bet.odd.createdAt}</div>
                <div className='betslip__team-avatar'></div>
                <div className='betslip__team-name'>{bet.odd.teamName}</div>
                <div className='betslip__bet-odds'>{`${bet.odd.type} ${bet.odd.ratio}`}</div>
                <div className='betslip__bet-amount'>{`Bet ${bet.amount}`}</div>
            </div>
            <div className='content'>
                <div className='betslip__result'>{`To Win ${bet.result}`}</div>
            </div>
        </BetSlip>
    );
};

OpenBets.propTypes = {
    bet: PropTypes.object.isRequired,
};

export default OpenBets;

const BetSlip = styled.div`
    border: 1px solid red;
    margin-bottom: 0.5rem;
`;