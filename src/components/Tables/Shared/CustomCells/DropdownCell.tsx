import React, { useMemo } from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { Button, Toolbar, ToolbarItem, ToolbarSeparator } from "@progress/kendo-react-buttons";
import { useFilter } from "../../../hooks/filter-hook";
import { checkValidation, filterDuplicateValues } from "../../../utils";

const DropdownCell = (props) => {
  const { textField, dataItemKey, textFieldSave, dataItemKeySave, allowCustom, filterBy, popupSettings, validation, required } = props.options;
  const { data, filterChange } = useFilter(props.options.data);

  const dropdownData = useMemo(() => {
    if (filterBy && Array.isArray(filterBy.filters) && data) {
      const filteredData = data.filter((val) =>
        filterBy.filters.some((filterSet) =>
          filterSet.every((filter) => {
            if (!props.dataItem[filter.field] && filterBy.showAll) return true;
            return filter.operator === "eq"
              ? val[filter.fieldToFilter] && props.dataItem[filter.field] && val[filter.fieldToFilter] === props.dataItem[filter.field]
              : val[filter.fieldToFilter] && props.dataItem[filter.field] && val[filter.fieldToFilter].includes(+props.dataItem[filter.field]);
          })
        )
      );
      if (filterBy.unique) {
        return filterDuplicateValues(filteredData, textField);
      } else {
        return filteredData;
      }
    } else {
      return data;
    }
  }, [data, filterBy, props.dataItem]);

  const onChangeHandler = (e) => {
    let value = {};
    if (e.value && e.value[dataItemKey] === undefined) {
      value = { [textFieldSave]: e.value[textField].trim(), [dataItemKeySave]: -Math.floor(Math.random() * 1000) };
    } else if ((textField && textFieldSave) || (dataItemKey && dataItemKeySave)) {
      if (textField && textFieldSave) Object.assign(value, { [textFieldSave]: e.value && e.value[textField] });
      if (dataItemKey && dataItemKeySave) Object.assign(value, { [dataItemKeySave]: e.value && e.value[dataItemKey] });
    } else {
      value = e.value;
    }

    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value,
    });
  };

  const restoreInitialValue = (e) => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: {
        [textFieldSave]: props.dataItem[`_${textField}`],
        [dataItemKeySave]: props.dataItem[`_${dataItemKey}`],
      },
    });
  };

  return (
    <React.Fragment>
      {props.options.revertOption ? (
        <Toolbar className={"flex-nowrap"}>
          <ToolbarItem className={"flex-shrink-1"}>
            <ComboBox
              className={`w-100 ${
                props.dataItem.hasOwnProperty(`_${props.field}`) && props.dataItem[props.field] !== props.dataItem[`_${props.field}`]
                  ? "border border-warning"
                  : ""
              }`}
              allowCustom={allowCustom}
              filterable
              onFilterChange={filterChange}
              data={dropdownData}
              value={
                (textField && dataItemKey
                  ? props.dataItem[dataItemKeySave] && props.dataItem[textFieldSave]
                    ? {
                        [textField]: props.dataItem[textFieldSave],
                        [dataItemKey]: props.dataItem[dataItemKeySave],
                      }
                    : data.find((val) => val[dataItemKey] === props.dataItem[dataItemKeySave])
                  : props.dataItem[props.field]) || null
              }
              textField={textField}
              dataItemKey={dataItemKey}
              onChange={onChangeHandler}
              popupSettings={popupSettings}
              required={!validation && required}
              valid={validation && ((props.dataItem[props.field] && validation.validIfValue) || checkValidation(props.dataItem, validation))}
              validationMessage={validation && validation.validationMessage}
            />
          </ToolbarItem>
          <React.Fragment>
            <ToolbarSeparator />
            <ToolbarItem>
              <Button
                data-testid="restore"
                className={"btn-outline-neutral"}
                iconClass={"fas fa-undo"}
                title={`Initial value: ${props.dataItem[`_${props.field}`]}`}
                onClick={restoreInitialValue}
                disabled={props.dataItem[`_${props.field}`] === props.dataItem[props.field]}
              />
            </ToolbarItem>
          </React.Fragment>
        </Toolbar>
      ) : (
        <ComboBox
          className={`w-100 ${
            props.dataItem.hasOwnProperty(`_${props.field}`) && props.dataItem[props.field] !== props.dataItem[`_${props.field}`]
              ? "border border-warning"
              : ""
          }`}
          allowCustom={props.options.allowCustom}
          filterable
          onFilterChange={filterChange}
          data={
            props.options.filterBy && data
              ? data.filter((val) =>
                  filterBy.filters.every((filter) =>
                    (!props.dataItem[filter.field] && filter.showAll) || filter.operator === "eq"
                      ? val[filter.fieldToFilter] === props.dataItem[filter.field]
                      : val[filter.fieldToFilter].includes(+props.dataItem[filter.field])
                  )
                )
              : data
          }
          value={
            (textField && dataItemKey
              ? props.dataItem[dataItemKeySave] && props.dataItem[textFieldSave]
                ? {
                    [textField]: props.dataItem[textFieldSave],
                    [dataItemKey]: props.dataItem[dataItemKeySave],
                  }
                : data.find((val) => val[dataItemKey] === props.dataItem[dataItemKeySave])
              : props.dataItem[props.field]) || null
          }
          textField={textField}
          dataItemKey={dataItemKey}
          onChange={onChangeHandler}
          required={!validation && required}
          popupSettings={popupSettings}
          valid={validation && ((props.dataItem[props.field] && validation.validIfValue) || checkValidation(props.dataItem, validation))}
          validationMessage={validation && validation.validationMessage}
        />
      )}
    </React.Fragment>
  );
};

export default DropdownCell;
