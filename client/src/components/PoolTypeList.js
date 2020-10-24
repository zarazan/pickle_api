import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faFireAlt, faHistory, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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

const PoolTypeList = ({ setTargetType, poolType }) => {
    return (
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
                    isSelected={poolType === pool.index ? true : false}
                />
            ))}
        </TypeList>
    );
};

PoolTypeList.propTypes = {
    setTargetType: PropTypes.func.isRequired,
    poolType: PropTypes.number,
};

export default PoolTypeList;

const TypeList = styled.section`
    grid-area: "main";
    display: flex;
    flex-flow: column nowrap;
`;