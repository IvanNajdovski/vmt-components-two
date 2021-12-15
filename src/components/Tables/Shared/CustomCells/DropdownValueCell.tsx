import React, { useMemo } from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../../hooks/filter-hook";
import { checkValidation } from "../../../utils";

const DropdownValueCell = (props) => {
  const { textField, dataItemKey, textFieldSave, dataItemKeySave, additionalValues, validation, required, filterBy, allowCustom } = props.options;
  const { data, filterChange } = useFilter(props.options.data);

  const dropdownData = useMemo(() => {
    if (filterBy && Array.isArray(filterBy.filters) && data) {
      return data.filter((val) =>
        filterBy.filters.some((filterSet) =>
          filterSet.every((filter) => {
            if (!props.dataItem[filter.field] && filterBy.showAll) return true;
            return filter.operator === "eq"
              ? val[filter.fieldToFilter] && props.dataItem[filter.field] && val[filter.fieldToFilter] === props.dataItem[filter.field]
              : val[filter.fieldToFilter] && props.dataItem[filter.field] && val[filter.fieldToFilter].includes(+props.dataItem[filter.field]);
          })
        )
      );
    } else {
      return data;
    }
  }, [data, filterBy, props.dataItem]);

  const onChangeHandler = (e) => {
    let value = {};
    if ((textField && textFieldSave) || (dataItemKey && dataItemKeySave)) {
      if (textField && textFieldSave) Object.assign(value, { [textFieldSave]: e.value && e.value[textField] });
      if (dataItemKey && dataItemKeySave) Object.assign(value, { [dataItemKeySave]: e.value && e.value[dataItemKey] });
    } else {
      value = e.value;
    }
    if (additionalValues) {
      additionalValues.forEach((val) => {
        value[val.fieldToSave] = e.value && e.value[val.field];
      });
    }
    props.onChange({ dataItem: props.dataItem, field: props.field, syntheticEvent: e.syntheticEvent, value });
  };

  return (
    <ComboBox
      className={`w-100 ${
        (props.dataItem.hasOwnProperty(`_${props.field}`) &&
          props.dataItem[props.field] !== props.dataItem[`_${props.field}`] &&
          "border border-warning") ||
        ""
      }`}
      allowCustom={allowCustom}
      filterable
      onFilterChange={filterChange}
      data={dropdownData}
      value={
        (textField && dataItemKey
          ? props.dataItem[textFieldSave] && props.dataItem[dataItemKeySave]
            ? {
                [textField]: props.dataItem[textFieldSave],
                [dataItemKey]: props.dataItem[dataItemKeySave],
              }
            : data.find((val) => val[dataItemKey] === props.dataItem[dataItemKeySave])
          : props.dataItem[props.field]) || null
      }
      onChange={onChangeHandler}
      textField={textField}
      dataItemKey={dataItemKey}
      required={!validation && required}
      popupSettings={props.options.popupSettings}
      valid={validation && ((props.dataItem[props.field] && validation.validIfValue) || checkValidation(props.dataItem, validation))}
      validationMessage={validation && validation.validationMessage}
    />
  );
};

export default DropdownValueCell;
