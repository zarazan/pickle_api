import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import styled from'styled-components';

import { UserContext } from '../../contexts/UserContext';
import { usePoolDispatch } from '../../contexts/PoolContext';
import pickleApi from '../../services/pickle_api';
import { currencyFormatter } from '../../utilities/helpers';

import FullPageSpinner from '../FullPageSpinner';
import GameOdds from '../betslip/GameOdds';
import OpenBetCard from './OpenBetCard';
import PoolUserCard from './PoolUserCard';
import RowResult from './RowResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ViewPool = () => {
    const [ user ] = useContext(UserContext);
    const dispatch = usePoolDispatch();
    const setPoolId = () => dispatch({ type: 'SET_POOL_ID', data: poolId });
    const setBankroll = () => dispatch({ type: 'SET_BANKROLL', data: parseFloat(myInfo.bankrollPlusActiveBets) });

    const { poolId } = useParams(); // pool id from url
    const { path, url } = useRouteMatch(); // path and url for route matching
    const history = useHistory();

    const [state, setState] = useState('idle'); // used for component state tracking
    const [errorMessage, setErrorMessage] = useState(''); // used for displaying errors

    const [display, setDisplay] = useState('dashboard'); // used for toggling the display to render
    const [winnersCircle, setWinnersCircle] = useState([]); // array of top placers of the leaderboard
    const [entries, setEntries] = useState([]); // array of entries
    const [fixtures, setFixtures] = useState([]); // array of fixtures
    const [openBets, setOpenBets] = useState(null); //
    const [myInfo, setMyInfo] = useState({ userName: '', bankrollPlusActiveBets: 0, rank: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        setState('loading');
        fetchAndSetEntries(poolId);
    }, []);

    useEffect(() => {
        setState('loading');
        fetchAndSetBets(poolId);
    }, []);

    useEffect(() => {
        setBankroll();
        setPoolId();
    });

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <ViewPoolWrapper className='pool-view-container'>
                    {state === 'error' 
                        ? <div>{errorMessage}</div>
                        : state === 'loading'
                             ? <FullPageSpinner loading={true} optionalMessage={'Loading Your Pool'}/>
                            : state === 'finished'
                                ?
                                    <>
                                        <PoolContent className='pool-content'>
                                            <div className='pool-content__title'>
                                                <h2>{'Pool Name'}</h2>
                                            </div>
                                            <div className='pool-content__user-stats'>
                                                <PoolUserCard name={myInfo.userName} avatar={null} bankroll={currencyFormatter.format(myInfo.bankrollPlusActiveBets)}/>
                                            </div>
                                            <div className='pool-content__leaderboard-container'>
                                                <div className='leaderboard-header'>
                                                    <h3>{'LEADERBOARD'}</h3>
                                                    <button onClick={() => toggleDisplay('leaderboard')}><FontAwesomeIcon icon={faArrowRight} size='sm' /></button>
                                                </div>
                                                <div className='pool-content__leaderboard-list'>
                                                    {winnersCircle.map((winner, i) => (
                                                        <RowResult 
                                                            key={i}
                                                            rank={winner.position}
                                                            avatar={null}
                                                            name={winner.userName}
                                                            bankroll={currencyFormatter.format(winner.bankrollPlusActiveBets)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='pool-content__separator'>
                                                <span><FontAwesomeIcon icon={faEllipsisH} size='1x' color={'#e5e5e6'}/></span>
                                            </div>
                                            <div>
                                                <div className='pool-user-placement'>
                                                    <RowResult 
                                                        rank={myInfo.position}
                                                        avatar={null}
                                                        name={myInfo.userName}
                                                        bankroll={currencyFormatter.format(myInfo.bankrollPlusActiveBets)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='schedule-header'>
                                                    <h3>{'SCHEDULE & BETS'}</h3>
                                                </div>
                                                <div className='pool-fixture-schedule'>
                                                    <div className='btn schedule-btn'><button onClick={() => history.push(`${url}/schedule`)}>View Full Schedule</button></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='open-bets-header'>
                                                    <h3>{'OPEN BETS'}</h3>
                                                </div>
                                                <BetSlipWrapper className='betslip-container'>
                                                    {!openBets
                                                    ? 
                                                        <NoBets>
                                                            <span>You have no open bets</span>
                                                            <button>View Schedule to Place Bets</button>
                                                        </NoBets>
                                                    : openBets.map((bet, i) => (
                                                        <OpenBetCard key={i} gameName={null} bet={bet} />
                                                    ))}
                                                </BetSlipWrapper>
                                            </div>
                                        </PoolContent>
                                    </>
                                : null
                    }
                </ViewPoolWrapper>
            </Route>
            <Route path={`${path}/schedule`} >
                <GameOdds />
            </Route>
        </Switch>     
    );

    /** fetchAndSetEntries: Fetches the entries for the pool and adds them to state. */
    function fetchAndSetEntries(id) {
        pickleApi.getEntries(id)
            .then(entries => {
                // add entries to state
                setEntries(entries);
                // get the entry for the current user
                // TODO: change this to an ID in the future
                const [ info ] = entries.filter(entry => entry.userName === user.name);
                const topEntries = entries.filter(entry => entry.position < 3);
                // add info to state
                setMyInfo(info);
                setWinnersCircle(topEntries);
                setState('finished');
        })
        .catch(error => {
            history.push('/sign-in');
            setErrorMessage(error.toString());
            setState('error');
        });
    }

    /** fetchAndSetBets: Fetches the user open bets for the pool and adds them to state. */
    function fetchAndSetBets(id) {
        pickleApi.getBets(id)
            .then(bets => {
                // add bets to state
                setOpenBets(bets);
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
    }

    /** toggleDisplay: Toggles the view to be displayed. **/
    function toggleDisplay(value) {
        const currentDisplay = display;
        if (currentDisplay !== value) {
            setDisplay(value);
        }
    }
};

export default ViewPool;

const ViewPoolWrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
    margin: 1em 1em 0 1em;
`;

const PoolContent = styled.section`
    display: flex;
    flex-flow: column nowrap;

    font-family: 'Inter', 'Sans Serif';

    & h2 {
        font-size: 1.25rem;
    }

    & h3 {
        margin: 0;
        font-size: .8125rem;
        letter-spacing: .0625em;
        color: #8b8c8f;
    }

    & h2, h3 {
        font-family: 'Poppins', 'Sans Serif';
    }

    & .pool-content__separator {
        display: flex;
        justify-content: center;
        margin: 0.5rem 0 0.5rem;
    }

    & .pool-content__title {
        display: flex;
        justify-content: center;

        & > h2 {
            margin: 0 0 0.5em;
        }
    }

    & .schedule-btn {
        &:hover {
            & button {
                border-color: #8fd6a9;
                font-weight: 500;
            }
        }

        & button {
            box-sizing: border-box;
            padding: 1rem 0 1rem;
            width: 100%;
            background: none;
            border: 1px solid #8b8c8f;
            border-radius: 0.2rem;
            outline: none;
            font-family: 'Inter', 'Sans Serif';
            font-size: .8125rem;
            color: #8fd6a9;
        }
    }

    & .leaderboard-header, .schedule-header, .open-bets-header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 1.25rem 0 1.25rem;
        
        & > button {
            background: white;
            border: none;
            outline: none;
            height: auto;
        }
    }
`;

const BetSlipWrapper = styled.div`
    box-sizing: border-box;
    padding-bottom: 1rem;
`;

const NoBets = styled.div``;