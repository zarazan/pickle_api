import React from 'react';
import styled from 'styled-components';
import PoolCard from './PoolCard';
import history from '../history';

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
        participants: 3,
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
        participants: 6,
    },
    {
        index: 4,
        name: "DU Hockey",
        amount: 500,
        status: "active",
        privacy: "public",
        startDate: "2020-10-11T02:56:08Z",
        endDate: "2020-10-17T02:56:08Z",
        sports: ["NFL", "NBA", "NHL"],
        bets: ["ps", "tp", "ml"],
        participants: 3,
    },
    {
        index: 2,
        name: "Lorem Ipsum",
        amount: 500,
        status: "inactive",
        privacy: "public",
        startDate: "2020-09-15T02:56:08Z",
        endDate: "2020-09-22T02:56:08Z",
        sports: ["NFL"],
        bets: ["ps", "tp", "ml"],
        participants: 6,
    },
];

const MyPools = props => {
    return (
        <MyPoolsWrapper>
            <Header>
                MY POOLS
            </Header>
            <CreatePoolButton
                onClick={() => history.push('/create-pool')}>Create Pool</CreatePoolButton>
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
                        participants={pool.participants}
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