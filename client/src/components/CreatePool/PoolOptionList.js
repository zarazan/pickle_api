import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker from '../../stories/DatePicker';
import Checkbox from '../../stories/Checkbox';

const PoolOptionList = ({ 
    setName, 
    startValue, 
    endValue, 
    setStart, 
    setEnd, 
    poolAmount,
    setBankroll,
    handleCheckChange,
    handleSportChange,
}) => {
    return (
        <OptionForm className='option-form'>
            <SubSection className='subsection name'>
                <h2 className='form__subheading'>Pool Name</h2>
                <span className='description'>Give your pool a unique name</span>
                <Input id='pool-name' type='text' onBlur={(e) => setName(e.target.value)} />
            </SubSection>

            <SubSection className='subsection duration'>
                <h2 className='form__subheading'>Duration</h2>
                <span className='description'>Set how long your pool should run</span>
                <div className='date-container'>
                    <DatePicker 
                        id='start'
                        changed={e => setStart(e.target.value)}
                        value={startValue}
                        min={'2020-10-01T00:00'}
                        max={'2020-12-31T11:59'}
                    />
                    <DatePicker 
                        id='end'
                        changed={e => setEnd(e.target.value)}
                        value={endValue}
                        min={'2020-10-01T00:00'}
                        max={'2020-12-31T11:59'}
                    />
                </div>
            </SubSection>

            <SubSection className='subsection bankroll'>
                <h2 className='form__subheading'>Starting Bankroll</h2>
                <span className='description'>Set the seed bankrool for each team</span>
                <div className='bankroll-container'>
                    <label htmlFor='bank-default'>
                        <input id='bank-default' type='number' value={poolAmount} onChange={e => setBankroll(e.target.value)}/>
                    </label>
                </div>
            </SubSection>

            <SubSection className='subsection bet-type'>
                <h2 className='form__subheading'>Bet Types</h2>
                <span className='description'>Set the allowable bet types for the pool</span>
                <div className='checkbox-grp'>
                    <Checkbox label='Point Spread' handleCheckChange={handleCheckChange} />
                    <Checkbox label='Total Points' handleCheckChange={handleCheckChange} />
                    <Checkbox label='Money Line' handleCheckChange={handleCheckChange} />
                </div>
            </SubSection>

            <SubSection className='subsection sport'>
                <h2 className='form__subheading'>Sports</h2>
                <span className='description'>Set the sports available in the pool</span>
                <div className='checkbox-grp'>
                    <Checkbox label='NFL' handleCheckChange={handleSportChange} />
                    <Checkbox label='NHL' handleCheckChange={handleSportChange} />
                    <Checkbox label='PGA' handleCheckChange={handleSportChange} />
                </div>
            </SubSection>

        </OptionForm>
    );
};

PoolOptionList.propTypes = {
    setName: PropTypes.func,
    setStart: PropTypes.func,
    setEnd: PropTypes.func,
    poolAmount: PropTypes.number,
    setBankroll: PropTypes.func,
    handleCheckChange: PropTypes.func,
    handleSportChange: PropTypes.func,
};

export default PoolOptionList;

const OptionForm = styled.section`
    width: 100%;
    box-sizing: border-box;
    padding: 1em;
    overflow: scroll;

    & .subsection:not(:last-of-type) {
        margin-bottom: 1.5em;
    }

    & .form-label {
        font-family: 'Inter','Sans Serif';
        color: #272829;
        font-size: 0.9em;
    }

    & .form-datepicker > input, .bankroll-container input {
        width: 100%;
        font-family: 'Inter','Sans Serif';
        color: #272829;
        font-size: 0.8em;
        padding: 0.5em;
        outline: none;
        box-sizing: border-box;
    }
`;

const Input = styled.input`
    width: 100%;
    font-family: 'Inter','Sans Serif';
    color: #272829;
    font-size: 0.8em;
    padding: 0.5em;
    outline: none;
    box-sizing: border-box;

    & :active {
        background: red;
    }
}
`;

const SubSection = styled.div`
    display: flex;
    flex-flow: column nowrap;
    
    box-sizing: border-box;

    & .form__subheading {
        margin: 0 0 0.3em 0;
        font-family: 'Poppins', 'Sans Serif';
        font-size: 1em;
        color: #272829;
    }

    & .description {
        margin: 0 0 0.4em 0;
        font-family: 'Inter','Sans Serif';
        color: #b3b3b3;
        font-size: 0.7em;
    }
`;