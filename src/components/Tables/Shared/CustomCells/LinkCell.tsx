import React from "react";
import { Link } from "react-router-dom";

const LinkCell = (props) => {
  const value = props.dataItem[props.field];
  const link = props.dataItem[props.options.field];
  return (
    <Link className="text-primary" to={`/${props.options.link}/${link || ""}`}>
      <i className={`${props.options.icon}`}></i> <span>{value.toString()}</span>
    </Link>
  );
};

export default LinkCell;
