import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFootballBall, faClock } from '@fortawesome/free-solid-svg-icons';

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
    bets,
    participants,
}) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardName>{name}</CardName>
                <PrivacyLabel>{privacy}</PrivacyLabel>
            </CardHeader>
            <RowBaseWrapper>
                <FontAwesomeIcon icon={faUsers} size="sm"/>
                {participants} users
            </RowBaseWrapper>
            <RowBaseWrapper>
                <FontAwesomeIcon icon={faFootballBall} size="sm"/>
                {sports.length} sports
            </RowBaseWrapper>
            <RowBaseWrapper>
                <FontAwesomeIcon icon={faClock} size="sm"/> Deadline
                {startDate} 
            </RowBaseWrapper>
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
    participants: PropTypes.number.isRequired,
};

export default PoolCard;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 2em repeat(3, 1.5em);
    grid-template-areas:
        "header"
        "row1"
        "row2"
        "row3";
    box-sizing: border-box;

    padding: 1em;
    margin-top: 0.75em;

    border: dashed 1px red;
    border-radius: 0.3em;
`;

const CardHeader = styled.div`
    grid-area: "header";
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const CardName = styled.h4`
    margin: 0;
    font-size: 1.25em;
`;

const PrivacyLabel = styled.span`
    border: solid 1px red;
    border-radius: 0.8em;
`;

const RowBaseWrapper = styled.div`
    display: grid;
    grid-template-columns: 2em auto;
    grid-template-rows: 1fr;
`;