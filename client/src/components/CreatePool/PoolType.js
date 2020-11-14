import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PoolType = ({ index, icon, name, disabled, isSelected, toggleSelected }) => {
    return (
        <TypeWrapper className='type-card'>
            {!isSelected
                ? (
                    <InactiveTypeButton
                        className='type-card__button'
                        disabled={disabled}
                        onClick={() => toggleSelected(index)}
                    >
                        <ClickableCard>
                            <div><FontAwesomeIcon className='type-card__icon' icon={icon} size='lg' /></div>
                            <div><h3 className='type-card__label'>{name}</h3></div>
                        </ClickableCard>
                    </InactiveTypeButton>

                )
                : (
                    <ActiveTypeButton
                        className='type-card__button'
                        disabled={disabled}
                        onClick={() => toggleSelected(index)}
                    >
                        <ClickableCard>
                            <div><FontAwesomeIcon className='type-card__icon' icon={icon} size='lg' /></div>
                            <div><h3 className='type-card__label'>{name}</h3></div>
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    margin-top: 0.75em;
    box-sizing: border-box;
`;

const InactiveTypeButton = styled.button`
    background: none;
    border: 2px solid #d7def2;
    border-radius: 0.5em;
    color: #78808e;
    width: 15em;
`;

const ActiveTypeButton = styled(InactiveTypeButton)`
    border: 2px solid #446eff;
    background: #f2f5ff;
    color: #2759ff;
    outline: none;
`;

const ClickableCard = styled.div`
    display: grid;
    grid-template-columns: 30% 1em 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        'icon gap info';
    box-sizing: border-box;
    padding: 1em;

    & .type-card__button {
        width: 100%;
    }

    & div:first-child {
        grid-area: icon;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    & div:last-child {
        grid-area: info;
        display: flex;
        align-items: center;
    }

    & .type-card__label {
        margin: 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1.25em;
    }
`;