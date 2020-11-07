import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from'styled-components';
import Leaderboard from './Leaderboard';
import GameOdds from '../betslip/GameOdds';
import OpenBets from './OpenBets';
import { useParams } from 'react-router-dom';
import pickleApi from '../../services/pickle_api';

const ViewPool = () => {
    let { poolId } = useParams();
    const [display, setDisplay] = useState('leaderboard');
    const [entries, setEntries] = useState(null);
    const [fixtures, setFixtures] = useState(null);
    const [bets, setBets] = useState(null);

    useEffect(() => {
        async function fetchEntries() {
            const results = await pickleApi.getEntries(poolId);
            setEntries(results);
        }

        async function fetchFixtures() {
            const results = await pickleApi.getFixtures(poolId);
            setFixtures(results);
        }

        async function fetchBets() {
            const results = await pickleApi.getBets(poolId);
            setBets(results);
        }

        fetchEntries();
        fetchFixtures();
        fetchBets();
      }, []);

    return (
        <ViewPoolWrapper className='pool-view-container'>
            <ViewToggle className='view-toggle'>
                <div className={`toggle-container${display && display === 'leaderboard' ? '-selected' : ''}`}>
                    <ClickableToggle className='btn btn-toggle' name='leaderboard' onClick={e => toggleDisplay(e.target.name)}>
                        Leaderboard
                    </ClickableToggle>
                </div>

                <div className={`toggle-container${display && display === 'games' ? '-selected' : ''}`}>
                <ClickableToggle className='btn btn-toggle' name='games' onClick={e => toggleDisplay(e.target.name)}>
                    Games
                </ClickableToggle>
                </div>

                <div className={`toggle-container${display && display === 'open-bets' ? '-selected' : ''}`}>
                <ClickableToggle className='btn btn-toggle' name='open-bets' onClick={e => toggleDisplay(e.target.name)}>
                    Open Bets
                </ClickableToggle>
                </div>
            </ViewToggle>

            <UserData className='user-data'>
                <div className=''>
                    <h2 className=''>Bankroll</h2>
                    <span className=''>$500</span>
                </div>
                <div className=''>
                    <h2 className=''>To Win</h2>
                    <span className=''>$0</span>
                </div>
            </UserData>

            {display && display === 'leaderboard' 
                ? <Leaderboard leaderboard={entries}/>
                : display === 'games'
                    ? <GameOdds poolId={poolId} fixtures={fixtures}/>
                    : <OpenBets bets={bets}/>
            }

        </ViewPoolWrapper>
    );

    /** toggleDisplay: Toggles the view to be displayed. **/
    function toggleDisplay(value) {
        const currentDisplay = display;
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
    grid-template-columns: 1fr 1fr 1fr;
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
    font-size: 0.8em;

    border: none;
    border-radius: 0.5em;
    outline: none;
    background-color: #eaf3fd;
    color: #5698d6;
`;

const UserData = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    margin-bottom: 1.5em;

    font-family: 'Poppins', 'Sans Serif';

    & > div {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        & h2 {
            margin: 0 0 0.3em 0;
            font-size: 1.25em;
        }
    }
`;