import React, { memo } from "react";
import LinkCell from "./LinkCell";
import NumericCell from "./NumericCell";
import DropdownCell from "./DropdownCell";
import CheckBoxCell from "./CheckBoxCell";
import CheckBoxValueCell from "./CheckBoxValueCell";
import NotificationCell from "./NotificationCell";
import CustomDateCell from "./CustomDateCell";
import InputCell from "./InputCell";
import DateInputCell from "./DateInputCell";
import DropdownValueCell from "./DropdownValueCell";
import IconCell from "./IconCell";
import AcronymCell from "./AcronymCell";
import PopupCell from "./PopupCell";
import AdditionalValues from "./AdditionalValues";
import { compare } from "../../../utils";
import { formatNumber } from "@telerik/kendo-intl";

interface CellInterface {
  style?: string;
  className?: string;
  dataItem?: any;
  field?: any;
  id?: string;
  dataIndex?: number;
  onChange?: Function;
  options?: any;
}

const getCustomCell = (type, props) => {
  switch (type) {
    case "link":
      return <LinkCell {...props} />;
    case "input":
      return <InputCell {...props} />;
    case "numeric":
      return <NumericCell {...props} />;
    case "dropdown":
      return <DropdownCell {...props} />;
    case "dropdownValue":
      return <DropdownValueCell {...props} />;
    case "checkBox":
      return <CheckBoxCell {...props} />;
    case "checkBoxValue":
      return <CheckBoxValueCell {...props} />;
    case "notification":
      return <NotificationCell {...props} />;
    case "date":
      return <CustomDateCell {...props} />;
    case "dateInput":
      return <DateInputCell {...props} />;
    case "icon":
      return <IconCell {...props} />;
    case "popup":
      return <PopupCell {...props} />;
    case "acronymCell":
      return <AcronymCell {...props} />;
    case "additionalValues":
      return <AdditionalValues {...props} />;
    default:
      return (
        <React.Fragment>
          {props.options.format && props.options.formatType === "numeric"
            ? formatNumber(props.dataItem[props.field], props.options.format)
            : props.dataItem[props.field]}
        </React.Fragment>
      );
  }
};

export const CustomTableCell: React.FC<CellInterface> = memo((props) => {
  if (!props.options) return null;
  else if (
    props.options.shouldNotRender &&
    props.options.shouldNotRender.compareOptions.some((val) =>
      val.every((item) =>
        compare(item.operator, item.field && props.dataItem[item.field], item.fieldToCompare && props.dataItem[item.fieldToCompare], item.value)
      )
    )
  ) {
    return getCustomCell(props.options.shouldNotRender.componentType, props);
  } else {
    return getCustomCell(props.options.type, props);
  }
});
