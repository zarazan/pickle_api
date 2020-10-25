import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PoolCard from './PoolCard';
import history from '../history';
import PickleApi from '../services/pickle_api';

let api = new PickleApi();
api.signIn();

const MyPools = props => {
    const [pools, setPools] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const results = await api.getPools();
            setPools(results);
        }
        fetchData();
      }, []);

    return (
        <MyPoolsWrapper>
            <Header>
                MY POOLS
            </Header>
            <CreatePoolButton
                onClick={() => history.push('/create-pool')}>Create Pool</CreatePoolButton>
            <PoolList>
                {pools.map((pool) => (
                    <PoolCard
                        key={pool.id}
                        index={pool.id}
                        name={pool.name}
                        amount={500}
                        privacy={pool.private}
                        startDate={pool.start_date}
                        sports={pool.sports}
                        participants={pool.email_invites}
                    />
                ))}
            </PoolList>
        </MyPoolsWrapper>
    );
};

export default MyPools;

const MyPoolsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2em 2em auto;
    grid-template-areas:
        "header"
        "cta"
        "list";
    height: 100%;

    padding: 1em;
    box-sizing: border-box;
`;

const Header = styled.h3`
    grid-area: "header";
    margin: 0;
`;

const CreatePoolButton = styled.button`
    grid-area: "cta";
`;

const PoolList = styled.section`
    grid-area: "list";
    display: flex;
    flex-flow: column nowrap;
`;