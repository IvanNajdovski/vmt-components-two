import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";
import { checkValidation, getValidOverride } from "../../../utils";

const CheckBoxCell = (props) => {
  const { validOverride, values, disabled, required, validation } = props.options;
  const onChangeHandler = (e) => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: e.value ? values.true : values.false,
    });
  };
  const isDisabled = validOverride && getValidOverride(validOverride, props.dataItem);

  return (
    <Checkbox
      value={props.dataItem[props.field] === values.true}
      checked={props.dataItem[props.field] === values.true}
      onChange={onChangeHandler}
      disabled={isDisabled || disabled}
      required={!validation && required}
      valid={validation && (props.dataItem[props.field] || checkValidation(props.dataItem, validation))}
      validationMessage={validation && validation.validationMessage}
    />
  );
};

export default CheckBoxCell;
