import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as Group } from '../../icons/group.svg';
import { ReactComponent as Sport } from '../../icons/sport.svg';
import { ReactComponent as Timer } from '../../icons/timer.svg';
import { ReactComponent as Private } from '../../icons/padlock-filled.svg';
import { ReactComponent as Public } from '../../icons/unlock-filled.svg';

const PoolCard = ({ displayPool, index, name, startDate, sports, privacy, participants }) => {
    return (
        <CardWrapper className='pool-card'>
            <button className='pool-card__selector' onClick={() => displayPool(index)}>
                <CardContents>
                    <CardHeader>
                        <CardName>{name}</CardName>
                        {privacy 
                            ? <Private style={{ height: '1.25rem', width: '1.25rem' }}/> 
                            : <Public style={{ height: '1.25rem', width: '1.25rem' }}/>}
                    </CardHeader>
                    <RowBaseWrapper>
                        <Group style={{ height: '1rem', width: '1rem', fill: '#8f8e8e' }}/>
                        <span>{participants ? participants.length : 0} users</span>
                    </RowBaseWrapper>
                    <RowBaseWrapper>
                        <Sport style={{ height: '.9rem', width: '.9rem', fill: '#8f8e8e' }}/>
                        <span>{sports ? sports.length : 0} sports</span>
                    </RowBaseWrapper>
                    <RowBaseWrapper>
                        <Timer style={{ height: '.9rem', width: '.9rem', fill: '#8f8e8e' }}/>
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
    grid-template-rows: 1.5em repeat(3, 1.25em);
    grid-template-areas:
        'header'
        'row1'
        'row2'
        'row3';
    box-sizing: border-box;
    padding: 1em;
`;

const CardHeader = styled.div`
    grid-area: 'header';
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const CardName = styled.span`
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1em;
`;

const RowBaseWrapper = styled.div`
    display: grid;
    grid-template-columns: 2em auto;
    grid-template-rows: 1fr;

    & > svg, span {
        align-self: center;
    }

    & span {
        font-family: 'Inter', sans-serif;
        text-align: left;
        font-size: .85rem;
        font-weight: 300;
        color: #8f8e8e;
    }
`;