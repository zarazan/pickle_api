import React, { useState } from 'react';

const Checkbox = ({ label, handleCheckChange }) => {
    const [isChecked, setisChecked] = useState(false);

    return (
      <div className='form-check'>
          <input
            type='checkbox'
            name={label}
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
        handleCheckChange(e.target.name, );
    }
}

export default Checkbox;