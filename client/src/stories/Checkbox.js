import React, { useState } from "react";

const Checkbox = ({ label, handleCheckChange }) => {
    const [isChecked, setisChecked] = useState(false);

    return (
      <div className="form-check">
        <label>
          <input
            type="checkbox"
            name={label}
            checked={isChecked}
            onChange={(e) => toggleCheckbox(e)}
            className="form-check-input"
          />
          {label}
        </label>
      </div>
    );

    /** toggleCheckbox: Toggles the checkbox selected state. */
    function toggleCheckbox(e) {
        setisChecked(!isChecked);
        handleCheckChange(e.target.name);
    }
}

export default Checkbox;