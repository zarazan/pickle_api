import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StatCardLite = ({ title, value, icon, telemetry, timespan, color }) => {
    return (
        <CardWrapper className='card'>
            <span className='card__title'>{title}</span>
            <span className='card__value'>{value}</span>
            <div className='details'>
                <FontAwesomeIcon className='card__indicator' icon={icon} size="xs" color={color}/>
                <span style={{color: color}} className='card__telemetry'>   {telemetry}   </span>
                <span className='card__timespan'>{timespan}</span>
            </div>
        </CardWrapper>
    );
};

StatCardLite.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default StatCardLite;

const CardWrapper = styled.div`
    display: grid;
    grid-template-rows: 30% 40% 30%;
    grid-template-areas:
        'header'
        'main'
        'footer';
    height: auto;
    padding: 1em;

    background: white;

    & .card__title {
        grid-area: header;
        font-family: 'Inter', 'Sans Serif';
        font-size: 0.8em;
        color: #082344;
    }

    & .card__value {
        grid-area: main;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 2em;
        color: #0d0d0d;
    }

    & .card__timespan {
        color: #b3b3b3;
    }

    & .details {
        grid-area: footer;
        margin-top: 0.5em;

        & span {
            font-family: 'Inter', 'Sans Serif';
            font-size: 0.7em;
        }
    }
`;