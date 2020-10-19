import React from 'react';
import styled from 'styled-components';
import PoolCard from './PoolCard';

const TEST_POOLS = [
    {
        index: 1,
        name: "Friends & Family",
        amount: 500,
        status: "active",
        privacy: "private",
        startDate: "2020-10-11T02:56:08Z",
        endDate: "2020-10-17T02:56:08Z",
        sports: ["NFL", "NBA", "NHL"],
        bets: ["ps", "tp", "ml"],
    },
    {
        index: 2,
        name: "Pickle Test",
        amount: 500,
        status: "inactive",
        privacy: "private",
        startDate: "2020-09-15T02:56:08Z",
        endDate: "2020-09-22T02:56:08Z",
        sports: ["NFL"],
        bets: ["ps", "tp", "ml"],
    },
];

const MyPools = props => {
    return (
        <MyPoolsWrapper>
            <CreatePool>
                Create Pool
            </CreatePool>
            <PoolList>
                {TEST_POOLS.map((pool) => (
                    <PoolCard
                        key={pool.index}
                        index={pool.index}
                        name={pool.name}
                        amount={pool.amount}
                        status={pool.status}
                        privacy={pool.privacy}
                        startDate={pool.startDate}
                        endDate={pool.endDate}
                        sports={pool.sports}
                        bets={pool.bets}
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
    grid-template-rows: 2em auto;
    grid-template-areas:
        "cta"
        "list";
    height: 100%;
`;

const CreatePool = styled.button`
`;

const PoolList = styled.section`
    display: flex;
    flex-flow: column nowrap;
`;