import React from 'react';

const DatePicker = (props) => {
    return (
        <div className='form-datepicker'>
            <input 
                id={props.id}
                onChange={props.changed}
                value={props.value}
                type='datetime-local' 
                min={props.min}
                max={props.max}
            />
            <label className='form-label' htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default DatePicker;