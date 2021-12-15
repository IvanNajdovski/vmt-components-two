//@ts-nocheck
import React, { useCallback } from "react";
import { RadioButton } from "@progress/kendo-react-inputs";

export const CopyCurrentModal = (props) => {
  const onGroupChangeHandler = useCallback((e) => {
    const name = e.target.name || e.target.element.name;
    props.onChangeModalData((prevData) => ({
      ...prevData,
      [name]: e.value,
    }));
  }, []);

  return (
    <form ref={props.formRef}>
      <ul className="list-group">
        <li className="list-group-item d-flex">
          <RadioButton
            data-testid="copyCurrentForEmptyNewRates"
            className="mr-2"
            name="selectedValue"
            value={"copyCurrentForEmptyNewRates"}
            label="Copy for empty New Rates"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
      </ul>
    </form>
  );
};
