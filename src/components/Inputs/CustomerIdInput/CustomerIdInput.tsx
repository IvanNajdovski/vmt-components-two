import React from "react";
import { Input } from "@progress/kendo-react-inputs";

const CustomerIdInput = (props) => {
  const inputChangeHandler = (e) => {
    const data = props.data.find(
      (customer) => customer.customerId === parseInt(e.value)
    );
    props.onChange({ ...e, data });
  };
  return (
    <Input
      data-testid="input"
      {...props}
      onChange={inputChangeHandler}
      disabled={props.loading || props.disabled}
    />
  );
};

export default CustomerIdInput;
