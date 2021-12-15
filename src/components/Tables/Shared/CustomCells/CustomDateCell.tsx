import React from "react";
import { formatDate } from "@telerik/kendo-intl";
import { createDateObject } from "../../../utils";

const CustomDateCell = (props) => {
  const dateObj = createDateObject(props.dataItem[props.field]);
  return (
    <React.Fragment>{dateObj ? (dateObj.getTime() > 0 ? `${formatDate(dateObj, props.options.format || "dd/MMM/yyyy")}` : "") : ""}</React.Fragment>
  );
};

export default CustomDateCell;
