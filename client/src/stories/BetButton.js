import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BetButton = ({ className, metric, ratio, callback }) => {
    const [selected, setSelected] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); // Used to set the button to disabled if no bet data is available.

    /** Executes checkForInvalidData() and sets buttonDisabled accordingly. */
    useEffect(() => checkForInvalidData());

    return (
        <Odd className={`${className} ${selected ? '--selected' : ''}`}>
            <ToggleButton
                onClick={toggleSelected}
                disabled={buttonDisabled}
            >
                <div>
                    <span>
                        {metric 
                        ? metric > 0
                            ? `+${metric}`
                            : metric
                        : ''}
                    </span>
                    <span>
                        {ratio === 'NaN'
                            ? 'N/A'
                            : ratio > 0
                                ? `+${ratio}`
                                : ratio
                        }
                    </span>
                </div>
                
            </ToggleButton>
        </Odd>
    );

    /** checkForInvalidData: Checks for invalid data so that we can disable the button. */
    function checkForInvalidData() {
        if(ratio === 'NaN') {
            setButtonDisabled(true);

        }
    }

    /** toggleSelected: Executes the callback when the button is togggled. */
    function toggleSelected() {
        if(selected === false) {
            callback();
        }
        setSelected(!selected);
    }
};

BetButton.propTypes = {
    className: PropTypes.string,
    metric: PropTypes.string,
    ratio: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
};

export default BetButton;

const Odd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
`;

const ToggleButton = styled.button`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-family: 'Poppins', 'Sans Serif';
    font-size: 0.7rem;

    box-shadow: 0px 1px 2px 1px #DDD;
    color: black;
    border-radius: 0.2em;
    outline: none;
    border: none;

    &:disabled {
        color: #aaa6a6;
    }

    & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
    }
`;