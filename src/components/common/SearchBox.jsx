import React from "react";

const SearchBox = ({ onChange, ...attr }) => {
  return (
    <div className="form-group">
      <input
        className="form-control my-3"
        type="text"
        onChange={e => onChange(e.currentTarget.value)}
        {...attr}
      />
    </div>
  );
};

export default SearchBox;
