import React from "react";

const IconCell = (props) => {
  return (
    <div
      title={props.options.title}
      className={`p-2 d-flex justify-content-center align-items-center ${props.options.styleClass}`}
      style={{ minHeight: "54px" }}
    >
      <span className={`k-icon ${props.options.icon}`}></span>
    </div>
  );
};

export default IconCell;
