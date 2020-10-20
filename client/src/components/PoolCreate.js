import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFireAlt, faHistory, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PoolType from './PoolType';

const POOL_TYPES = [
    {
        index: 1,
        name: "POPULAR",
        description: "Choose from popular pool types created by the community.",
        icon: faFireAlt,
    },
    {
        index: 2,
        name: "RECENT",
        description: "Reuse one of your pool formats and get your game on!",
        icon: faHistory,
    },
    {
        index: 3,
        name: "CUSTOM",
        description: "Customize your format for complete control over your pool.",
        icon: faPencilAlt,
    },
];

const PoolCreate = props => {
    return (
        <PageWrapper>
            <HeaderWrapper>
                <button><FontAwesomeIcon icon={faArrowLeft} size="2x" /></button>
                <Header>CREATE POOL</Header>
            </HeaderWrapper>
            <MainWrapper>
                <div>Select a Pool Type</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                {POOL_TYPES.map((pool) => (
                    <PoolType
                        key={pool.index}
                        index={pool.index}
                        icon={pool.icon}
                        name={pool.name}
                        description={pool.description}
                    />
                ))}
                <button>NEXT</button>
            </MainWrapper>
        </PageWrapper>
    );
};

PoolCreate.propTypes = {
    
};

export default PoolCreate;

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4em auto;
    grid-template-areas:
        "header"
        "main";
    height: 100%;
`;

const HeaderWrapper = styled.div`
    grid-area: header;
    
    display: grid;
    grid-template-columns: 2em auto 2em;
    grid-template-areas:
        "nav title .";
`;

const Header = styled.h3`
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0;
`;

const MainWrapper = styled.main`
    display: flex;
    flex-flow: column nowrap;
`;