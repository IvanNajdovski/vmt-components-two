import React from "react";

const AcronymCell = (props) => {
  const { data, textField = "name", dataItemKey = "id" } = props.options;
  const value = data && data.find((val) => val[dataItemKey] === props.dataItem[props.field]);
  return <React.Fragment> {(value && value[textField]) || props.dataItem[props.field]}</React.Fragment>;
};

export default AcronymCell;
