import React from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const CustomComboBox = (props) => {
  const { data, filterChange } = useFilter(props.data);

  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey]}`;
    return React.cloneElement(li, li.props, li.props.children);
  };
  return <ComboBox {...props} filterable onFilterChange={filterChange} data={data} itemRender={itemRender} />;
};

export default CustomComboBox;
