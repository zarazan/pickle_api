import React from 'react';

const DatePicker = (props) => {
    return (
        <div className="DatePicker">
            <input 
                id={props.id}
                onChange={props.changed}
                value={props.value}
                type="datetime-local" 
                min={props.min}
                max={props.max}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default DatePicker;