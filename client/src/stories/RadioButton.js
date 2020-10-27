import React from "react";

const RadioButton = (props) => {
    return (
        <div className='form-radio'>
            <input 
                id={props.id}
                onChange={props.changed}
                value={props.value}
                type="radio"
                checked={props.isSelected}
            />
            <label className='form-label' htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default RadioButton;