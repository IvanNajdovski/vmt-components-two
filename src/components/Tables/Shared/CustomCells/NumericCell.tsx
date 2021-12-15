import React, { useState, useEffect } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Button, Toolbar, ToolbarItem, ToolbarSeparator } from "@progress/kendo-react-buttons";
import { getValidOverride, checkValidation } from "../../../utils";

const NumericCell = (props) => {
  const { fixed, validOverride, noNullRender, revertOption, minField, maxField, step, format, required, validation, min, max } = props.options;
  const [value, setValue] = useState(fixed && props.dataItem[props.field] ? props.dataItem[props.field].toFixed(fixed) : props.dataItem[props.field]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (props.dataItem[props.field] && fixed) setValue(props.dataItem[props.field].toFixed(fixed));
    else setValue(props.dataItem[props.field]);
  }, [props.dataItem[props.field]]);

  const onChangeHandler = (e) => {
    setValue(e.value);
    setIsDirty(true);
  };
  const onBlurHandler = (e) => {
    if (value && fixed) setValue(parseFloat(value).toFixed(fixed));
    if (!isDirty) return;
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value,
    });
    setIsDirty(false);
  };

  const restoreInitialValue = (e) => {
    if (props.dataItem[`_${props.field}`] && fixed) setValue(parseFloat(props.dataItem[`_${props.field}`]).toFixed(fixed));
    else setValue(props.dataItem[`_${props.field}`]);
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: props.dataItem[`_${props.field}`],
    });
  };
  const disabled = validOverride && getValidOverride(validOverride, props.dataItem);

  return (
    <React.Fragment>
      {noNullRender && !props.dataItem[props.field] ? (
        ""
      ) : revertOption ? (
        <Toolbar className={"flex-nowrap bg-transparent border-0"}>
          <ToolbarItem className={"flex-shrink-1"}>
            <NumericTextBox
              disabled={disabled}
              value={value}
              min={(minField && props.dataItem[minField]) || min}
              max={(maxField && props.dataItem[maxField]) || max}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              spinners={false}
              step={step}
              format={format}
              required={!validation && required}
              valid={validation && ((value && validation.validIfValue) || checkValidation(props.dataItem, validation))}
              validationMessage={validation && validation.validationMessage}
              className={`${
                props.dataItem.hasOwnProperty(`_${props.field}`) && props.dataItem[props.field] !== props.dataItem[`_${props.field}`]
                  ? "border border-warning"
                  : ""
              }`.trim()}
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
                disabled={props.dataItem[`_${props.field}`] === value || disabled}
              />
            </ToolbarItem>
          </React.Fragment>
        </Toolbar>
      ) : (
        <NumericTextBox
          disabled={disabled}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          spinners={false}
          min={(minField && props.dataItem[minField]) || min}
          max={(maxField && props.dataItem[maxField]) || max}
          step={step}
          format={format}
          required={!validation && required}
          valid={validation && ((value && validation.validIfValue) || checkValidation(props.dataItem, validation))}
          validationMessage={validation && validation.validationMessage}
          className={`${
            props.dataItem.hasOwnProperty(`_${props.field}`) && props.dataItem[props.field] !== props.dataItem[`_${props.field}`]
              ? "border border-warning"
              : ""
          }`.trim()}
        />
      )}
    </React.Fragment>
  );
};

export default NumericCell;
