import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RadioButton from '../stories/RadioButton';
import DatePicker from '../stories/DatePicker';
import Checkbox from '../stories/Checkbox';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';

const PoolOptionList = ({ 
    setName, 
    visibility, 
    setVisibility, 
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
        <OptionForm>
            <Subtitle>
                <h2>POOL NAME</h2>
                <span>Give your pool a unique name</span>
            </Subtitle>
            <input
                id="pool-name" type="text" onBlur={(e) => setName(e.target.value)} />

            <Subtitle>
                <h2>VISIBILITY</h2>
                <span>Define who can see your pool</span>
            </Subtitle>
            <div className="radio-btn-container">
                <RadioButton 
                    changed={e => setVisibility(e.target.id)} 
                    id="private" 
                    isSelected={visibility === "private"} 
                    label="Private" 
                    value="Private" 
                />
                <RadioButton 
                    changed={e => setVisibility(e.target.id)} 
                    id="public" 
                    isSelected={visibility === "public"} 
                    label="Public" 
                    value="Public" 
                />
            </div>

            <Subtitle>
                <h2>DURATION</h2>
                <span>Set how long your pool should run</span>
            </Subtitle>
            <div>
                <DatePicker 
                    id="start"
                    changed={e => setStart(e.target.value)}
                    value={startValue}
                    min={'2020-10-01T00:00'}
                    max={'2020-12-31T11:59'}
                />
                <DatePicker 
                    id="end"
                    changed={e => setEnd(e.target.value)}
                    value={endValue}
                    min={'2020-10-01T00:00'}
                    max={'2020-12-31T11:59'}
                />
 
            </div>

            <Subtitle>
                <h2>STARTING BANKROLL</h2>
                <span>Set the seed bankrool for each team</span>
            </Subtitle>
            <div>
                <label htmlFor="bank-default">
                    <input id="bank-default" type="number" value={poolAmount} onChange={e => setBankroll(e.target.value)}/>
                </label>
            </div>

            <Subtitle>
                <h2>BET TYPES</h2>
                <span>Set the allowable bet types for the pool</span>
            </Subtitle>
            <div>
                <Checkbox 
                    label="Point Spread"
                    handleCheckChange={handleCheckChange}
                />
                <Checkbox 
                    label="Total Points"
                    handleCheckChange={handleCheckChange}
                />
                <Checkbox 
                    label="Money Line"
                    handleCheckChange={handleCheckChange}
                />
            </div>

            <Subtitle>
                <h2>SPORTS</h2>
                <span>Set the sports available in the pool</span>
            </Subtitle>
            <div>
                <Checkbox 
                    label="NFL"
                    handleCheckChange={handleSportChange}
                />
                <Checkbox 
                    label="NHL"
                    handleCheckChange={handleSportChange}
                />
                <Checkbox 
                    label="PGA"
                    handleCheckChange={handleSportChange}
                />
            </div>

        </OptionForm>
    );
};

PoolOptionList.propTypes = {
    
};

export default PoolOptionList;

const OptionForm = styled.section`

`;

const Subtitle = styled.div`
    & h2 {
        margin: 0
    }
`;