import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import pickleApi from '../../services/pickle_api';

import FullPageSpinner from '../App/FullPageSpinner';
import PoolCard from './PoolCard';

const MyPools = ({ displayPool }) => {
    const history = useHistory();

    const [pools, setPools] = useState([]);
    const [state, setState] = useState('IDLE');
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        setState('LOADING');
        fetchAndSetPools();
      }, []);

    return (
        <MyPoolsWrapper className='my-pools-container'>
            {state === 'ERROR'
                ? <div>{errorMessage}</div>
                : state === 'LOADING'
                    ? 
                        <div className='loading-pools'>
                            <FullPageSpinner size={20} loading={true} optionalMessage={'Loading Your Pools'}/>
                        </div>
                    : state === 'FINISHED' &&
                    <>
                        {!pools || pools.length < 1
                            ?
                                <PoolsNullState>
                                    <span>No Pools Created Yet</span>
                                    <span>Your pool list is empty. Go to Create Pool to create one.</span>
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
                                ))}
                    </>
            }
        </MyPoolsWrapper>
    );

    /** fetchAndSetPools: Fetches the pools for the user and sets them to state.*/
    function fetchAndSetPools(id) {
        pickleApi.getPools()
            .then(data => {
                setPools(data);
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
    margin-bottom: 36px;

    & .loading-pools {
        display: flex;
        justify-content: center;
        margin: 2rem;
    }
`;

const PoolsNullState = styled.div`
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