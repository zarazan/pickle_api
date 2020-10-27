import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PoolCreate from './PoolCreate';

const VerifyPool = (props) => {
    return (
        <VerifyWrapper className='verification-pane'>
            <h3 className='pane__title'>Verify Pool Settings</h3>
            <SettingWrapper className='setting'>
                <span className='setting__title'>Name</span>
                <span className='setting__value'>{props.name}</span>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>Visibility</span>
                <span className='setting__value'>{props.visibility}</span>
            </SettingWrapper>
        </VerifyWrapper>
    );
};

VerifyPool.propTypes = {
    
};

export default VerifyPool;

const VerifyWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 1em;

    border: 2px solid #d7def2;
    border-radius: 1em;

    &  .pane__title {
        
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1em;
        color: #121621;

        margin-bottom: 1em;
    }

    & .setting:not(:last-of-type) {
        margin-bottom: 0.5em;
    }
`;

const SettingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1em 1fr;
    grid-template-areas:
        'title gap value';

    & .setting__title {
        grid-area: title;
        display: flex;
        justify-content: flex-end;
        font-family: 'Inter', 'Sans Serif';
        font-size: 1em;
        color: #b3b3b3;
    }

    & .setting__value {
        grid-area: value;
        display: flex;
        font-family: 'Inter', 'Sans Serif';
        font-size: 1em;
        color: #2759ff;
        }
`;