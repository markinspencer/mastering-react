import React from "react";

const Input = ({ name, label, error, ...attr }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <input className="form-control" id={name} name={name} {...attr} />
      {error && <div className="alert alert-danger"> {error} </div>}
    </div>
  );
};

export default Input;
