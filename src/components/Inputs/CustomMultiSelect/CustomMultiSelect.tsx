import React from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const CustomMultiSelect = (props) => {
  const { data, filter, filterChange } = useFilter(props.data);

  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey]}`;
    return React.cloneElement(li, li.props, li.props.children);
  };
  return (
    <MultiSelect
      {...props}
      filterable
      className="custom-multiselect"
      onFilterChange={filterChange}
      filter={filter}
      data={data}
      itemRender={itemRender}
    />
  );
};

export default CustomMultiSelect;
