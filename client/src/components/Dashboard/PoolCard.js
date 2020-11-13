import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFootballBall, faClock } from '@fortawesome/free-solid-svg-icons';

const PoolCard = ({ displayPool, index, name, startDate, sports, privacy, participants }) => {
    return (
        <CardWrapper className='pool-card'>
            <button className='pool-card__selector' onClick={() => displayPool(index)}>
                <CardContents>
                    <CardHeader>
                        <CardName>{name}</CardName>
                        <PrivacyLabel>{privacy}</PrivacyLabel>
                    </CardHeader>
                    <RowBaseWrapper>
                        <FontAwesomeIcon icon={faUsers} size="sm"/>
                        <span>{participants ? participants.length : 0} users</span>
                    </RowBaseWrapper>
                    <RowBaseWrapper>
                        <FontAwesomeIcon icon={faFootballBall} size="sm"/>
                        <span>{sports ? sports.length : 0} sports</span>
                    </RowBaseWrapper>
                    <RowBaseWrapper>
                        <FontAwesomeIcon icon={faClock} size="sm"/>
                        <span>Deadline: {startDate}</span>
                    </RowBaseWrapper>
                </CardContents>
            </button>
        </CardWrapper>
    );
};

PoolCard.propTypes = {
    displayPool: PropTypes.func,
    name: PropTypes.string.isRequired,
    privacy: PropTypes.bool,
    startDate: PropTypes.string,
    sports: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(PropTypes.string),
};

export default PoolCard;

const CardWrapper = styled.div`
    margin-top: 0.75em;
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-radius: 0.2rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 3px 0px, rgba(60, 64, 67, 0.15) 0px 1px 2px 0px;

    font-family: 'Inter', 'Sans Serif';
    
    & button {
        height: 100%;
        width: 100%;
        background: none;
        outline: none;
        border: none;
    }
`;

const CardContents= styled.div`
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

    & span {
        text-align: left;
    }
`;