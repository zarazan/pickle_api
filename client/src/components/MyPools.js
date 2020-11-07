import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PoolCard from './PoolCard';
import { useHistory } from 'react-router-dom';
import pickleApi from '../services/pickle_api';

const MyPools = ({ displayPool }) => {
    const [pools, setPools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    let history = useHistory();
    
    useEffect(() => {
        setIsLoading(true);
        pickleApi.getPools()
            .then(data => {
                setPools(data);
                setIsLoading(false);
            })
            .catch(error => {
                setErrorMessage(error.toString());
            })
      }, []);

    return (
        <MyPoolsWrapper className='my-pools'>
            <PoolsHeader className='my-pools__header'>My Pools</PoolsHeader>
            {errorMessage && <div>{errorMessage}</div>}

            {isLoading ? (
                <div>
                    Loading My Pools...
                </div>
            ) : (
                <>
                    <CreatePoolButton
                        onClick={() => history.push('/create-pool')}>Create Pool</CreatePoolButton>
                    <PoolList className='my-pools__cardlist'>
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
                    </PoolList> 
                </>
            )
            }
        </MyPoolsWrapper>
    );

    function displayPool(index) {
        history.push(`/pools/${index}`)
    }
};

export default MyPools;

const MyPoolsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2em 2em auto;
    grid-template-areas:
        'header'
        'cta'
        'list';
    box-sizing: border-box;
`;

const PoolsHeader = styled.h2`
    font-family: 'Poppins', 'Sans Serif';
    font-size: 1em;
    color: #121621;

    margin-bottom: 1em;
`;

const CreatePoolButton = styled.button`
    grid-area: cta;
`;

const PoolList = styled.div`
    grid-area: list;
    display: flex;
    flex-flow: column nowrap;
`;