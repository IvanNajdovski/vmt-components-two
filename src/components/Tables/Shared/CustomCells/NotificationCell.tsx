import React from "react";
import { getValueOverride } from "../../../utils";

const NotificationCell = (props) => {
  const value =
    !isNaN(props.dataItem[props.field]) && props.options.fixed
      ? props.dataItem[props.field] !== null
        ? props.dataItem[props.field].toFixed(props.options.fixed)
        : null
      : props.dataItem[props.field];

  return (
    <React.Fragment>{props.options.valueOverride ? getValueOverride(props.options.valueOverride, props.dataItem) || value : value}</React.Fragment>
  );
};

export default NotificationCell;
