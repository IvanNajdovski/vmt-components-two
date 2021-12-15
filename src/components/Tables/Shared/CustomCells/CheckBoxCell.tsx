import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";
import { checkValidation } from "../../../utils";

const CheckBoxCell = (props) => {
  const onChangeHandler = (e) => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: e.value,
    });
  };
  return (
    <Checkbox
      value={props.dataItem[props.field]}
      onChange={onChangeHandler}
      disabled={props.options.disabled}
      required={!props.options.validation && props.options.required}
      valid={props.options.validation && (props.dataItem[props.field] || checkValidation(props.dataItem, props.options.validation))}
      validationMessage={props.options.validation && props.options.validation.validationMessage}
    />
  );
};

export default CheckBoxCell;
