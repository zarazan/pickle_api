import React, { useState } from 'react';

const Checkbox = ({ label, value, handleCheckChange }) => {
    const [isChecked, setisChecked] = useState(false);

    return (
      <div className='form-check'>
          <input
            type='checkbox'
            name={label}
            value={value}
            checked={isChecked}
            onChange={(e) => toggleCheckbox(e)}
            className='form-check-input'
          />
        <label className='form-label'>{label}</label>
      </div>
    );

    /** toggleCheckbox: Toggles the checkbox selected state. */
    function toggleCheckbox(e) {
        setisChecked(!isChecked);
        handleCheckChange(e.target.value, );
    }
}

export default Checkbox;
