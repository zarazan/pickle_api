import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PoolType = ({ index, icon, name, description, disabled, isSelected, toggleSelected }) => {
    return (
        <TypeWrapper>
            {!isSelected
                ? (
                    <InactiveTypeButton
                        disabled={disabled}
                        onClick={() => toggleSelected(index)}
                    >
                        <ClickableCard>
                            <div>
                                <FontAwesomeIcon icon={icon} size="2x" />
                            </div>
                            <div>
                                <h4>{name}</h4>
                                <div>{description}</div>
                            </div>
                        </ClickableCard>
                    </InactiveTypeButton>

                )
                : (
                    <ActiveTypeButton
                        disabled={disabled}
                        onClick={() => toggleSelected(index)}
                    >
                        <ClickableCard>
                            <div>
                                <FontAwesomeIcon icon={icon} size="2x" />
                            </div>
                            <div>
                                <h4>{name}</h4>
                                <div>{description}</div>
                            </div>
                        </ClickableCard>
                    </ActiveTypeButton>
                )
            }
        </TypeWrapper>
    );
};

PoolType.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    setSelected: PropTypes.func,
};

export default PoolType;

const TypeWrapper = styled.div`
    margin-top: 0.75em;
`;

const InactiveTypeButton = styled.button`
    background: none;
    border: 2px solid grey;
`;

const ActiveTypeButton = styled(InactiveTypeButton)`
    background: #b3beff;
    border: 2px solid #6f46a6;
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