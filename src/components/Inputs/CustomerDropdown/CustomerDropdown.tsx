import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const CustomerDropdown = (props) => {
  const { data, filter, filterChange } = useFilter(props.data);
  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey]}`;
    return React.cloneElement(li, li.props, li.props.children);
  };
  return (
    <DropDownList {...props} data={data} filterable filter={filter} onFilterChange={filterChange} loading={props.loading} itemRender={itemRender} />
  );
};

export default CustomerDropdown;
