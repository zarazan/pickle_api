import React, { useState } from 'react';
import history from '../history';
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
        disabled: false,
    },
    {
        index: 2,
        name: "RECENT",
        description: "Reuse one of your pool formats and get your game on!",
        icon: faHistory,
        disabled: false,
    },
    {
        index: 3,
        name: "CUSTOM",
        description: "Customize your format for complete control over your pool.",
        icon: faPencilAlt,
        disabled: false,
    },
];

const PoolCreate = props => {
    const [selectedType, setSelectedType] = useState(null);

    return (
        <PageWrapper>
            <HeaderWrapper>
                <button onClick={() => history.push('/')}><FontAwesomeIcon icon={faArrowLeft} size="2x" /></button>
                <Header>CREATE POOL</Header>
            </HeaderWrapper>
            <MainWrapper>
                <div>Select a Pool Type</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <TypeList>
                    {POOL_TYPES.map((pool) => (
                        <PoolType
                            key={pool.index}
                            index={pool.index}
                            icon={pool.icon}
                            name={pool.name}
                            description={pool.description}
                            disabled={pool.disabled}
                            toggleSelected={setTargetType}
                            isSelected={selectedType === pool.index ? true : false}
                        />
                    ))}
                </TypeList>
                <button
                    disabled={selectedType === null}
                >NEXT</button>
            </MainWrapper>
        </PageWrapper>
    );

    /**
     * setTargetType: Sets the selected pool type card.
     */
    function setTargetType(index) {
        setSelectedType(index);
    }
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

const TypeList = styled.section`
    grid-area: "list";
    display: flex;
    flex-flow: column nowrap;
`;