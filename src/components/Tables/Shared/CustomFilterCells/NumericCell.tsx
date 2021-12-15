import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const NumericCell = (props) => {
  const onChangeHandler = (e) =>
    props.onChange({
      field: props.field,
      operator: props.operator,
      value: e.value ? e.value.toString() : "",
    });

  return <NumericTextBox className={"w-100"} onChange={onChangeHandler} spinners={false} format={"#.######"} />;
};

export default NumericCell;
