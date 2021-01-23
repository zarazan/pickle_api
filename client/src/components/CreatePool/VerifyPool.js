import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VerifyPool = (props) => {
    return (
        <VerifyWrapper className='verification-pane'>
            <h3 className='pane__title'>Verify Pool Settings</h3>
        
            <SettingWrapper className='setting'>
                <span className='setting__title'>Name</span>
                <span className='setting__value'>{props.name}</span>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>Start Date</span>
                <span className='setting__value'>{props.start}</span>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>End Date</span>
                <span className='setting__value'>{props.end}</span>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>Bankroll</span>
                <span className='setting__value'>${props.bankroll}</span>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>Bet Types</span>
                <div className='options-container'>
                    {props.bets.map((bet) => (
                        <span key={bet.index} id={bet.index}>{bet}</span>
                    ))}
                </div>
            </SettingWrapper>

            <SettingWrapper className='setting'>
                <span className='setting__title'>Sports</span>
                <div className='options-container'>
                    {props.sports.map((sport) => (
                        <span key={sport.index} id={sport.index}>{sport}</span>
                    ))}
                </div>
            </SettingWrapper>
        </VerifyWrapper>
    );
};

VerifyPool.propTypes = {
       
};

export default VerifyPool;

const VerifyWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
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

    & .options-container {
        grid-area: value;
        display: flex;
        flex-flow: column nowrap;
        font-family: 'Inter', 'Sans Serif';
        font-size: 1em;
        color: #2759ff;
    }

    & .setting__value {
        grid-area: value;
        display: flex;
        font-family: 'Inter', 'Sans Serif';
        font-size: 1em;
        color: #2759ff;
    }
`;