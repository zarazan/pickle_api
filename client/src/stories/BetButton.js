import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BetButton = ({ className, value, callback }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Odd className={`${className} ${selected ? 'selected' : ''}`}>
            <ToggleButton
                onClick={toggleSelected}
            >
                {value}
            </ToggleButton>
        </Odd>
    );

    function toggleSelected() {
        if(selected === false) {
            callback();
        }
        setSelected(!selected);
    }
};

BetButton.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default BetButton;

const Odd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    &.selected > button {
        border: 2px solid #eaf3fd;
        background-color: #2e8dfe;
        color: white;
    }
`;

const ToggleButton = styled.button`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-family: 'Poppins', 'Sans Serif';
    font-size: 1em;

    background-color: #eaf3fd;
    color: #5698d6;
    border-radius: 0.4em;
    outline: none;
    border: none;
`;