import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import styled from'styled-components';

import { UserContext } from '../../contexts/UserContext';
import { usePoolDispatch } from '../../contexts/PoolContext';
import pickleApi from '../../services/pickle_api';
import { currencyFormatter } from '../../utilities/helpers';

import FullPageSpinner from '../App/FullPageSpinner';
import OpenBetCard from './OpenBetCard';
import PoolUserCard from './PoolUserCard';
import RowResult from './RowResult';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ViewPool = () => {
    const [ user ] = useContext(UserContext);
    const [myInfo, setMyInfo] = useState({ userName: '', bank: 10, bankrollPlusActiveBets: 0, rank: 0 });
    const dispatch = usePoolDispatch();
    const setBankroll = (pool, bank) => dispatch({ type: 'SEED_POOL', poolId: pool, bank: bank });
    const updateBetCount = (pool, count) => dispatch({ type: 'UPDATE_BET_COUNT', poolId: pool, bets: count});

    const { poolId } = useParams(); // pool id from url
    const { path, url } = useRouteMatch(); // path and url for route matching
    const history = useHistory();

    const [state, setState] = useState('idle'); // used for component state tracking
    const [errorMessage, setErrorMessage] = useState(''); // used for displaying errors

    const [winnersCircle, setWinnersCircle] = useState([]); // array of top placers of the leaderboard
    const [entries, setEntries] = useState([]); // array of entries
    const [fixtures, setFixtures] = useState([]); // array of fixtures
    const [openBets, setOpenBets] = useState(null); // array of open bets
    const [poolName, setPoolName] = useState(`Pool ${poolId}`);
    const [potentialPayout, setPotentialPayout] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchPoolInfo(poolId);
    }, []);

    useEffect(() => {
        setState('loading');
        fetchAndSetEntries(poolId);
    }, []);

    useEffect(() => {
        setState('loading');
        fetchAndSetBets(poolId);
    }, []);

    return (
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
                                        <h2 onClick={() => history.push(`/admin/scores/${poolId}`)}>{poolName}</h2>
                                    </div>
                                    <div className='pool-content__user-stats'>
                                        <PoolUserCard
                                            name={myInfo.userName} 
                                            avatar={null} 
                                            bankroll={currencyFormatter.format(myInfo.bank)}
                                            potentialPayout={currencyFormatter.format(potentialPayout)}
                                        />
                                    </div>
                                    <div className='pool-content__leaderboard-container'>
                                        <div className='leaderboard-header'>
                                            <h3>{'LEADERBOARD'}</h3>
                                            <button className='btn expand-leaderboard-btn' onClick={() => history.push(`${url}/leaderboard`)}>MORE</button>
                                        </div>
                                        <div className='pool-content__leaderboard-list'>
                                            {winnersCircle.map((winner, i) => (
                                                <RowResult 
                                                    key={i}
                                                    isUser={winner.userId === user.id}
                                                    rank={winner.position + 1}
                                                    avatar={null}
                                                    name={winner.userName}
                                                    bankroll={winner.bankrollPlusActiveBets}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {myInfo.position > 2
                                        ?
                                            <>
                                                <div className='pool-content__separator'>
                                                    <span><FontAwesomeIcon icon={faEllipsisH} size='1x' color={'#e5e5e6'}/></span>
                                                </div>
                                                <div>
                                                    <div className='pool-user-placement'>
                                                        <RowResult 
                                                            rank={myInfo.position + 1}
                                                            avatar={null}
                                                            name={myInfo.userName}
                                                            bankroll={myInfo.bankrollPlusActiveBets}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        : null
                                    }
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
                                            {!openBets || openBets.length < 1
                                            ?
                                                <BetsNullState>
                                                    <span>No Bets Placed Yet</span>
                                                    <span>Your bet slips are emtpy. Go to the pool schedule to place a bet</span>
                                                </BetsNullState>
                                            : openBets.map((bet, i) => (
                                                <OpenBetCard key={i} gameName={null} bet={bet} result={bet.result}/>
                                            ))}
                                        </BetSlipWrapper>
                                    </div>
                                </PoolContent>
                            </>
                        : null
            }
        </ViewPoolWrapper>  
    );

    /** fetchPoolInfo: Fetches the pool index data and adds it to state. */
    function fetchPoolInfo(id) {
        
    }

    /** fetchAndSetEntries: Fetches the entries for the pool and adds them to state. */
    function fetchAndSetEntries(id) {
        pickleApi.getEntries(id)
            .then(entries => {
                // add entries to state
                setEntries(entries);
                const firstEntry = entries[0];
                if(firstEntry) setPoolName(firstEntry.poolName);
                // get the entry for the current user
                // TODO: change this to an ID in the future
                const [ info ] = entries.filter(entry => entry.userName === user.name);
                const topEntries = entries.filter(entry => entry.position < 3);
                // send dispatch
                setBankroll(poolId, info.bank);
                // add info to state
                setMyInfo(info);
                setWinnersCircle(topEntries);
                setState('finished');
        })
        .catch(error => {
            console.log(error.toString());
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
                // send dispatch
                updateBetCount(poolId, bets.length);
                // calculate potential payout
                const wonAndOpenBets = bets.filter(bet => bet.result !== 'lost' && bet.result !== 'draw');
                const payout = wonAndOpenBets.reduce((acc, cur) => acc + parseFloat(cur.payout), 0.00);
                
                setPotentialPayout(payout);
                setState('finished');
            })
            .catch(error => {
                console.log(error.toString());
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
            });
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

    & .expand-leaderboard-btn {
        box-sizing: border-box;
        background: none;
        outline: none;
        font-family: 'Inter', 'Sans Serif';
        font-size: .7rem;
        font-weight: 500;
        color: black;
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

const BetsNullState = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & span:first-of-type {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: .7rem;
    }

    & span:last-of-type {
        font-size: 0.85rem;
        color: #bdbdc1;
        text-align: center;
        width: 70%
    }
`;