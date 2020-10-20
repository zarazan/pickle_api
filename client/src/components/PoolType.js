import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PoolType = ({ icon, name, description}) => {
    return (
        <TypeWrapper>
            <button>
                <div>
                    <FontAwesomeIcon icon={icon} size="2x" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <span>{description}</span>
                </div>
            </button>
        </TypeWrapper>
    );
};

PoolType.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default PoolType;

const TypeWrapper = styled.div`
    display: grid;
    grid-template-columns: 4em auto;
    grid-template-rows: 1fr;
    grid-template-areas:
        "icon info";
    box-sizing: border-box;

    border: 1px solid red;
    margin-bottom: 0.75em;

    & div:first-child {
        grid-area: icon;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & div:last-child {
        grid-area: info;

        & h4 {
            margin: 0;
        }
    }
`;