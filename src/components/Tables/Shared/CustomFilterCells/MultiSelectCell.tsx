import React, { useMemo } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../../hooks/filter-hook";

const MultiSelectCell = ({ value, options, ...props }) => {
  const { textField, dataItemKey, filterValue, allowCustom } = options;
  const { data, filter, filterChange } = useFilter(options.data);

  const includesArray = (current, includes) => includes.includes(current);

  const onChangeHandler = (e) =>
    props.onChange({
      value: e.value.length ? e.value.map((val) => val[filterValue]) : "",
      operator: e.value.length ? includesArray : "",
    });

  const inputValue = useMemo(() => {
    return (
      value &&
      value.map((val) => {
        const dataItem = options.data.find((item) => item[textField] === val);
        if (dataItem) {
          return dataItem;
        } else {
          return { [textField]: val };
        }
      })
    );
  }, [value]);
  return (
    <MultiSelect
      className={"w-100 custom-multiselect"}
      allowCustom={allowCustom}
      data={data}
      filterable
      filter={filter}
      onFilterChange={filterChange}
      textField={textField}
      dataItemKey={dataItemKey}
      onChange={onChangeHandler}
      value={inputValue}
    />
  );
};

export default MultiSelectCell;
