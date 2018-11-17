import React from "react";

const Like = ({ isLiked, onClick }) => {
  let classes = "fa fa-heart";
  if (!isLiked) classes += "-o";

  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
