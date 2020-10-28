import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from'styled-components';
import Leaderboard from './leaderboard/Leaderboard';
import BetSlip from './betslip/BetSlip';

const ViewPool = props => {
    const [display, setDisplay] = useState('bet-slip');

    return (
        <ViewPoolWrapper className='pool-view-container'>
            <ViewToggle className='view-toggle'>
                <div className={`toggle-container${display && display === 'leaderboard' ? '-selected' : ''}`}>
                    <ClickableToggle className='btn btn-toggle' name='leaderboard' onClick={e => toggleDisplay(e.target.name)}>
                        Leaderboard
                    </ClickableToggle>
                </div>
                <div className={`toggle-container${display && display === 'bet-slip' ? '-selected' : ''}`}>
                <ClickableToggle className='btn btn-toggle' name='bet-slip' onClick={e => toggleDisplay(e.target.name)}>
                    Bet Slip
                </ClickableToggle>
                </div>
            </ViewToggle>

            {display && display === 'leaderboard' ? (
                <Leaderboard />
            ) : (
                <BetSlip />
            )}

        </ViewPoolWrapper>
    );

    /** toggleDisplay: Toggles the view to be displayed. **/
    function toggleDisplay(value) {
        // get current display
        const currentDisplay = display;
        console.log(currentDisplay);
        console.log(value);
        // if display is not the same, then change it
        if (currentDisplay !== value) {
            setDisplay(value);
        }
    }
};

ViewPool.propTypes = {
    
};

export default ViewPool;

const ViewPoolWrapper = styled.div`
    box-sizing: border-box;
    padding: 0.5em 0.5em 0em 0.5em;
    height: 100%;
    overflow: auto;
`;

const ViewToggle = styled.section`
    display: grid;
    grid-gap: 0em;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1.5em;

    & div[class^='toggle-container'] {
        border: 2px solid #eaf3fd;
        background-color: #eaf3fd;

        &:first-of-type {
            border-radius: 0.5em 0 0 0.5em;;
        }

        &:last-of-type {
            border-radius: 0 0.5em 0.5em 0;;
        }
    }

    & .toggle-container-selected > .btn {
        border: 2px solid #eaf3fd;
        background-color: #2e8dfe;
        color: white;
    }
`;

const ClickableToggle = styled.button`
    box-sizing: border-box;
    height: 3em;
    width: 100%;

    font-family: 'Poppins', 'Sans Serif';
    font-size: 1em;

    border: none;
    border-radius: 0.5em;
    outline: none;
    background-color: #eaf3fd;
    color: #5698d6;
`;  