import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { zuluToDateFormat } from '../../utilities/helpers';
import SPORTS from '../../constants/sportsHash';

import { ReactComponent as Group } from '../../icons/group.svg';
import { ReactComponent as Sport } from '../../icons/sport.svg';
import { ReactComponent as Timer } from '../../icons/timer.svg';
import { ReactComponent as Private } from '../../icons/padlock.svg';
import { ReactComponent as Public } from '../../icons/unlock-filled.svg';

const PoolCard = ({ displayPool, index, name, startDate, endDate, sports, privacy, participants }) => {
    return (
        <CardWrapper className='c-pool-card'>
            <button className='c-pool-card__card-selector' onClick={() => displayPool(index)}>
                <CardContents className='l-grid'>
                    <CardHeader className='l-row-flex'>
                        <span>{`${zuluToDateFormat(startDate)} - ${zuluToDateFormat(endDate)}`}</span>
                        {privacy 
                            ? <Private style={{ height: '14px', width: '14px' }}/> 
                            : <Public style={{ height: '14px', width: '14px' }}/>}
                    </CardHeader>
                    <CardTitle className='l-column-flex'>
                        <h3 className='c-pool-card__name'>{truncateName(name)}</h3>
                    </CardTitle>
                    <CardSport className='l-row-flex'>
                        {sports.map((sport, i) => (
                            <div key={i} className='l-column-flex'>
                                <span className='c-pool-card__sports'>{SPORTS[sport]}</span>
                            </div>
                        ))}
                    </CardSport>
                    <CardParticipants className='l-row-flex'>
                        <span>{participants ? participants : 0} Participants</span>
                    </CardParticipants>
                </CardContents>
            </button>
        </CardWrapper>
    );

    /** truncateName: Truncates the pool name for long strings. */
    function truncateName(name) {
        if(name.length > 34) {
            return name.slice(0, 34).concat('...');
        } else {
            return name;
        }
    }
};

PoolCard.propTypes = {
    displayPool: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    privacy: PropTypes.bool,
    startDate: PropTypes.string,
    sports: PropTypes.number,
    participants: PropTypes.number,
};

PoolCard.defaultProps = {
    privacy: 'private',
    startDate: '2020-12-13T00:00:00.000Z',
    sports: 1,
    participants: 1,
};

export default PoolCard;

const CardWrapper = styled.div`
    margin-top: 0.75em;
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-radius: 0.2rem;
    box-shadow: rgba(60,64,67,0.3) 0px 1px 2px 0px,rgba(60,64,67,0.15) 0px 2px 6px 2px;
    font-family: 'Inter', 'Sans Serif';

    & div.l-grid {
        display: grid;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
    }
    
    & button {
        height: 100%;
        width: 100%;
        background: none;
        outline: none;
        border: none;
    }
`;

const CardContents= styled.div`
    grid-template-columns: auto;
    grid-template-rows: 24px 20px auto 20px;
    grid-template-areas:
        'header'
        'title'
        'sport'
        'participants';
    box-sizing: border-box;
    padding: 12px 8px 16px;
`;

const CardHeader = styled.div`
    grid-area: 'header';
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    & > span {
        margin: 0;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        color: #8b8c8f;
    }
`;

const CardTitle = styled.div`
    grid-area: 'title';
    justify-content: center;

    & h3 {
        font-size: 14px;
        color: #101315;
        font-weight: 700;
        margin: 0;
        text-align: left;
    }
`;

const CardSport = styled.div`
    grid-area: 'sport';
    margin: 10px 0 10px;

    & > div {
        justify-content: center;
        border-radius: 12px;
        border: 1px solid #26CF9C;
        padding: 2px 12px;

        & > span {
            font-size: 12px;
            color: #101315;
            font-weight: 300;
        }
    }
`;

const CardParticipants = styled.div`
    grid-area: 'participants';
    font-size: 12px;
    color: #101315;
    font-weight: 300;
`;