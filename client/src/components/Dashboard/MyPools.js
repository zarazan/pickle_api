import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import pickleApi from '../../services/pickle_api';

import FullPageSpinner from '../App/FullPageSpinner';
import PoolCard from './PoolCard';

const MyPools = ({ displayPool }) => {
    const history = useHistory();
    const [poolCache, setPoolCache] = useState([]); // cache for filter pools w/o losing fetched pools
    const [pools, setPools] = useState([]); // array of pools for mapping
    const [state, setState] = useState('IDLE'); // state for component loading and error-handling
    const [errorMessage, setErrorMessage] = useState(null); // error message from api
    const [selectedFilter, setSelectedFilter] = useState('ACTIVE'); // selected pool filter
    
    useEffect(() => {
        setState('LOADING');
        fetchAndSetPools();
      }, []);

    useEffect(() => {
        filterPools();
    }, [selectedFilter])

    return (
        <>
            {state === 'ERROR'
                ? <div>{errorMessage}</div>
                : state === 'LOADING'
                    ? <FullPageSpinner size={20} loading={true} optionalMessage={'Loading Your Pools'}/>
                    : state === 'FINISHED' &&
                    <>
                        <MyPoolsWrapper className='c-my-pools l-column-flex'>
                            <MyPoolsHeader className='l-row-flex'>
                                <h3 className='my-pools__header'>My Pools</h3>
                                <button 
                                    onClick={() => history.push('/create-pool')}
                                >
                                    + Add
                                </button>
                            </MyPoolsHeader>
                            <MyPoolsFilters className='c-my-pools__filters l-row-flex'>
                                <div className='l-row-flex__item'>
                                    <button 
                                        id='active' 
                                        className={`btn c-my-pools__filter-button${selectedFilter === 'ACTIVE' ? '--selected' : ''}`}
                                        onClick={e => selectFilter(e)}
                                    >
                                        Active
                                    </button>
                                </div>
                                {/* <button 
                                    id='won' 
                                    className={`btn c-my-pools__filter-button${selectedFilter === 'WON' ? '--selected' : ''}`}
                                    onClick={e => selectFilter(e)}
                                >
                                    Won
                                </button> */}
                                <div className='l-row-flex__item'>
                                    <button 
                                        id='past' 
                                        className={`btn c-my-pools__filter-button${selectedFilter === 'PAST' ? '--selected' : ''} l-row-flex__item`}
                                        onClick={e => selectFilter(e)}
                                    >
                                        Past
                                    </button>
                                </div>
                                <div className='l-row-flex__item'>
                                    <button 
                                        id='all' 
                                        className={`btn c-my-pools__filter-button${selectedFilter === 'ALL' ? '--selected' : ''} l-row-flex__item`}
                                        onClick={e => selectFilter(e)}
                                    >
                                        All
                                    </button>
                                </div>
                            </MyPoolsFilters>
                            {(!pools || pools.length < 1) && selectedFilter === 'ALL'
                                ?
                                    <PoolsNullState className='c-my-pools__null-state l-column-flex'>
                                        <span>No Pools Created Yet</span>
                                        <span>Your pool list is empty. Go to Create Pool to create one.</span>
                                    </PoolsNullState>
                                : (!pools || pools.length < 1) && selectedFilter !== 'ALL'
                                    ?
                                        <PoolsNullState className='c-my-pools__null-state l-column-flex'>
                                            <span>No Pools In Filter</span>
                                            <span>No pools match your current filter.</span>
                                        </PoolsNullState>
                                    :
                                        pools.map((pool) => (
                                            <PoolCard
                                                key={pool.id}
                                                index={pool.id}
                                                name={pool.name}
                                                amount={pool.bankroll}
                                                privacy={pool.private}
                                                startDate={pool.startDate}
                                                endDate={pool.endDate}
                                                sports={pool.sports}
                                                participants={pool.userCount}
                                                displayPool={displayPool}
                                            />
                                        ))
                            }
                        </MyPoolsWrapper>
                    </>
            }
        </>
    );
    /** selectFilter: Selects a filter for rendering pools. */
    function selectFilter(e) {
        switch (e.target.id) {
            case 'active':
                if(selectedFilter != 'active'){
                    setSelectedFilter('ACTIVE');
                }
                break
            case 'won':
                if(selectedFilter != 'won'){
                    setSelectedFilter('WON');
                }
                break
            case 'past':
                if(selectedFilter != 'past'){
                    setSelectedFilter('PAST');
                }
                break
            case 'all':
                if(selectedFilter != 'all'){
                    setSelectedFilter('ALL');
                }
                break
            default:
                return
        }
    }

    /** filterPools: Filters the current pool objects based on the user-selected filter. */
    function filterPools() {
        const currentFilter = selectedFilter;
        switch(currentFilter) {                
            case 'WON':
                break
            case 'PAST':
                // filter out pools with date before today
                setPools(poolCache.filter(p => Date.parse(p.endDate) < Date.now()));
                break
            case 'ALL':
                // reset pools from cache
                const allPools = poolCache;
                setPools(allPools);
                break
            default:
                // filter out pools with date before today
                setPools(poolCache.filter(p => Date.parse(p.endDate) >= Date.now()));
                break
        }
    }

    /** fetchAndSetPools: Fetches the pools for the user and sets them to state.*/
    function fetchAndSetPools(id) {
        pickleApi.getPools()
            .then(data => {
                setPools(data);
                setPoolCache(data);
                setState('FINISHED');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('ERROR');
            });
    }

    /** displayPool: Selects the pool to route to based on user selection. */
    function displayPool(index) {
        history.push(`/pools/${index}`)
    }
};

export default MyPools;

const MyPoolsWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin-bottom: 36px;

    & div.l-grid {
        display: grid;
    }

    & div[class~='l-column-flex'], div[class~='l-column-flex__item'] {
        display: flex;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'], div[class~='l-row-flex__item'] {
        display: flex;
        flex-flow: row nowrap;
    }
`;

const PoolsNullState = styled.div`
    align-items: center;
    font-family: 'Poppins', sans-serif;
    margin: 16px;
    padding: 32px 0px;

    & span:first-of-type {
        font-size: 0.8125rem;
        font-weight: 700;
        margin-bottom: .7rem;
    }

    & span:last-of-type {
        font-size: 0.8125rem;
        color: #bfbfbf;
        text-align: center;
        width: 70%;
    }
`;

const MyPoolsHeader = styled.div`
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 20px;

    & > [class~='l-row-flex__item'] {
        flex-grow: 2;
    }

    & > h3 {
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1rem;
        font-weight: 500;
        color: #101315;
        margin: 0;
    }

    & > button {
        box-sizing: border-box;
        height: fit-content;
        padding: 4px 16px;
        background-color: #ffffff;
        border: 1px solid #c7cccf;
        border-radius: 12px;
        outline: none;
        font-family: 'Inter', 'Sans Serif';
        font-size: 12px;
        color: #101315;
        font-weight: 500;

        &:active {
            background: #f3f3f4;
        }
    }
`;

const MyPoolsFilters = styled.div`
    justify-content: space-between;

    & > div {
        justify-content: center;
        flex-grow: 2;

        & > button {
            padding: 8px 16px;
            background: #f3f3f4;
            outline: none;
            border: none;
            border-radius: 12px;
            font-family: 'Inter', 'Sans Serif';
            font-size: 12px;
            color: #101315;
            font-weight: 500;
            color: #aeaeae;
            width: 95%;
    
            &[class~='c-my-pools__filter-button--selected'] {
                background: #49deb2;
                color: white;
            }
        }
    }


`;