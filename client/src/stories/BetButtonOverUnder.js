import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BetButtonOverUnder = ({ className, whichSpreadType, metric, ratio, callback }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Odd className={`${className} ${selected ? '--selected' : ''}`}>
            <ToggleButton
                onClick={toggleSelected}
            >
                <div>
                    <span>
                        {metric 
                        ? whichSpreadType === 'over'
                            ? `O ${metric}`
                            : `U ${metric}`
                        : ''}
                    </span>
                    <span>
                        {ratio > 0
                        ? `+${ratio}`
                        : ratio
                        }
                    </span>
                </div>
                
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

BetButtonOverUnder.propTypes = {
    className: PropTypes.string.isRequired,
    whichSpreadType: PropTypes.string.isRequired,
    metric: PropTypes.string,
    ratio: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
}

BetButtonOverUnder.defaultProps = {
    metric: '',
}

export default BetButtonOverUnder;

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
    border-radius: 0.2em;
    outline: none;
    border: none;

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