import React, { memo } from "react";
import { GridFilterCell } from "@progress/kendo-react-grid";
import DropdownCell from "./DropdownCell";
import MultiSelectCell from "./MultiSelectCell";
import NumericCell from "./NumericCell";

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
    case "text":
      return <GridFilterCell {...props} />;
    case "numeric":
      return <NumericCell {...props} />;
    case "dropdown":
      return <DropdownCell {...props} />;
    case "multiSelect":
      return <MultiSelectCell {...props} />;
    default:
      return null;
  }
};

export const CustomFilterCell: React.FC<CellInterface> = memo((props) => {
  return getCustomCell(props.options.type, props);
});
