import React from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../../hooks/filter-hook";

const DropdownCell = (props) => {
  const { textField, dataItemKey, filterValue, allowCustom } = props.options;
  const { data, filterChange } = useFilter(props.options.data);

  const onChangeHandler = (e) => {
    props.onChange({
      value: e.value ? e.value[filterValue] : "",
      operator: e.value ? "contains" : "",
      syntheticEvent: e.syntheticEvent,
    });
  };

  return (
    <ComboBox
      className={"w-100"}
      allowCustom={allowCustom}
      filterable
      onFilterChange={filterChange}
      data={data}
      textField={textField}
      dataItemKey={dataItemKey}
      onChange={onChangeHandler}
      value={props.value ? props.options.data.find((val) => val[filterValue] === props.value) : null}
    />
  );
};

export default DropdownCell;
