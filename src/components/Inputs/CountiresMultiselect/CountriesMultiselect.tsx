import React from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const CountriesMultiselect = (props) => {
  const { data, filter, filterChange } = useFilter(props.data);

  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey]}`;
    return React.cloneElement(li, li.props, li.props.children);
  };
  return (
    <MultiSelect
      {...props}
      data={data}
      filterable
      filter={filter}
      autoClose={false}
      onFilterChange={filterChange}
      loading={props.loading}
      itemRender={itemRender}
    />
  );
};

export default CountriesMultiselect;
