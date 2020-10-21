import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PoolType = ({ icon, name, description, enabled }) => {
    return (
        <TypeWrapper>
            <button disabled={enabled}>
                <ClickableCard>
                    <div>
                        <FontAwesomeIcon icon={icon} size="2x" />
                    </div>
                    <div>
                        <h4>{name}</h4>
                        <div>{description}</div>
                    </div>
                </ClickableCard>
            </button>
        </TypeWrapper>
    );
};

PoolType.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default PoolType;

const TypeWrapper = styled.div`
    margin-top: 0.75em;
`;

const ClickableCard = styled.div`
    display: grid;
    grid-template-columns: 4em auto;
    grid-template-rows: 1fr;
    grid-template-areas:
        "icon info";
    box-sizing: border-box;
    padding: 1em;

    & div:first-child {
        grid-area: icon;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & div:last-child {
        grid-area: info;
        display: flex;

        & h4 {
            margin: 0;
        }
    }
`;