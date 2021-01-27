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
                                <button onClick={() => history.push('/create-pool')}>
                                    Add
                                </button>
                            </MyPoolsHeader>
                            {!pools || pools.length < 1
                                ?
                                    <PoolsNullState className='c-my-pools__null-state l-column-flex'>
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
                                            sports={pool.sports.length}
                                            participants={pool.userCount}
                                            displayPool={displayPool}
                                        />
                                    ))}
                        </MyPoolsWrapper>
                    </>
            }
        </>
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
    height: 100%;
    width: 100%;
    margin-bottom: 36px;

    & div.l-grid {
        display: grid;
    }

    & div[class~='l-column-flex'] {
        display: flex;
        flex-flow: column nowrap;
    }

    & div[class~='l-row-flex'] {
        display: flex;
        flex-flow: row nowrap;
    }
`;

const PoolsNullState = styled.div`
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

const MyPoolsHeader = styled.div`
    justify-content: space-between;
    align-items: center;

    & > h3 {
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: .0625em;
        color: #101315;
        margin: 1.25rem 0 1.25rem 0;
    }

    & > button {
        box-sizing: border-box;
        height: fit-content;
        padding: 8px 16px;
        background-color: #ffffff;
        border: 1px solid #c7cccf;
        border-radius: 0.8rem;
        outline: none;
        font-family: 'Inter', 'Sans Serif';
        font-size: .8125rem;
        color: #101315;
        font-weight: 500;

        &:active {
            background: #f3f3f4;
        }
    }
`;