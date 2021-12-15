//@ts-nocheck
import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

const CheckboxValueInput = (props) => {
  const onChangeHandler = (e) => {
    props.onChange({
      ...e,
      target: { ...e.target, name: props.name },
      value: props.values ? (e.value ? props.values.true : props.values.false) : e.value,
    });
  };
  return (
    <Checkbox
      className="mr-2"
      label={props.label}
      name={props.name}
      value={props.values ? props.value === props.values.true : props.value}
      checked={props.values ? props.value === props.values.true : props.value}
      onChange={onChangeHandler}
      disabled={props.disabled}
    />
  );
};

export default CheckboxValueInput;
