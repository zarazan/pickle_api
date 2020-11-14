import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import pickleApi from '../../services/pickle_api';

import FullPageSpinner from '../FullPageSpinner';
import PoolCard from './PoolCard';

const MyPools = ({ displayPool }) => {
    const history = useHistory();

    const [pools, setPools] = useState([]);
    const [state, setState] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        setState('loading');
        fetchAndSetPools();
      }, []);

    return (
        <MyPoolsWrapper className='my-pools-container'>
            {state === 'error'
            ? <div>{errorMessage}</div>
            : state === 'loading'
                ? 
                    <div className='loading-pools'>
                        <FullPageSpinner size={20} loading={true} optionalMessage={'Loading Your Pools'}/>
                    </div>
                : state === 'finished' &&
                <>
                    {(pools || []).map((pool) => (
                        <PoolCard
                            key={pool.id}
                            index={pool.id}
                            name={pool.name}
                            amount={500}
                            privacy={pool.private}
                            startDate={pool.start_date}
                            sports={pool.sports}
                            participants={pool.email_invites}
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
                setState('finished');
            })
            .catch(error => {
                history.push('/sign-in');
                setErrorMessage(error.toString());
                setState('error');
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

    & .loading-pools {
        display: flex;
        justify-content: center;
        margin: 2rem;
    }
`;