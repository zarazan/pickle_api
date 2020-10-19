import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: flesh out the card layout for mobile
// TODO: poll users pools and render them as cards

const PoolCard = ({ 
    index,
    name,
    amount,
    status,
    privacy,
    startDate,
    endDate,
    sports,
    bets
}) => {
    return (
        <CardWrapper>
            {name}
        </CardWrapper>
    );
};

PoolCard.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    privacy: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    sports: PropTypes.arrayOf(PropTypes.string).isRequired,
    bets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PoolCard;

const CardWrapper = styled.div``;