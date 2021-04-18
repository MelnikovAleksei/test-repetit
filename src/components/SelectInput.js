import React from 'react';
import { ReactComponent as SelectIcon } from '../images/select-input-icon.svg';

function SelectInput({
  title,
  optionsData,
  propertyName,
  disabled,
}) {
  return (
    <div className="select-container">
      <select
        disabled={disabled}
        className="select"
        id="select"
        name="select"
        aria-label={title}
      >
        <option value="">{title}</option>
        {
          optionsData.map(option => (
            <option
              key={option.id}
              value={option.id}
            >
              {option[propertyName]}
            </option>
          ))
        }
      </select>
      <div className="select-icon">
        <SelectIcon />
      </div>
    </div>
  )
}

export default SelectInput
