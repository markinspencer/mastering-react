import React from "react";

const Select = ({ name, label, error, options, ...attr }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <select className="form-control" name={name} id={name} {...attr}>
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger"> {error} </div>}
    </div>
  );
};

export default Select;
