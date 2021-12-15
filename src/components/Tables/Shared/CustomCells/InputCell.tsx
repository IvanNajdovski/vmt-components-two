import React, { useState, useEffect } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { checkValidation } from "../../../utils";

const InputCell = (props) => {
  const [value, setValue] = useState(props.dataItem[props.field]);
  useEffect(() => {
    setValue(props.dataItem[props.field]);
  }, [props.dataItem[props.field]]);

  const onChangeHandler = (e) => {
    setValue(e.value);
  };

  const onBlurHandler = (e) => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value,
    });
  };

  return (
    <Input
      className={`w-100 ${
        (props.dataItem.hasOwnProperty(`_${props.field}`) &&
          props.dataItem[props.field] !== props.dataItem[`_${props.field}`] &&
          "border border-warning") ||
        ""
      }`}
      value={value}
      pattern={props.options.pattern}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      required={!props.options.validation && props.options.required}
      valid={props.options.validation && checkValidation(props.dataItem, props.options.validation)}
      validationMessage={props.options.validation && props.options.validation.validationMessage}
    />
  );
};

export default InputCell;
