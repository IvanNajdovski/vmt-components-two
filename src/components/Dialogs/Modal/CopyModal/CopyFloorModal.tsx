//@ts-nocheck
import React, { useCallback, useRef } from "react";
import { RadioButton, NumericTextBox } from "@progress/kendo-react-inputs";

export const CopyFloorModal = (props) => {
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
            data-testid="copyFloorForAllBelowFloor"
            className="mr-2"
            name="selectedValue"
            value={"copyFloorForAllBelowFloor"}
            label="Copy for all rates below Floor"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
        <li className="list-group-item d-flex">
          <RadioButton
            data-testid="copyFloorForEmptyCurrentRates"
            className="mr-2"
            name="selectedValue"
            value={"copyFloorForEmptyCurrentRates"}
            label="Copy for all empty Current Rates"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
        <li className="list-group-item d-flex">
          <RadioButton
            data-testid="copyFloorForAll"
            className="mr-2"
            name="selectedValue"
            value={"copyFloorForAll"}
            label="Copy for all Rates"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
        <li className="list-group-item d-flex">
          <RadioButton
            data-testid="copyFloorAndExcludeNeg"
            className="mr-2"
            name="selectedValue"
            value={"copyFloorAndExcludeNeg"}
            label="Copy floor and exclude Neg rate flag"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
        <li className="list-group-item d-flex">
          <RadioButton
            data-testid="copyFloorAndExcludeExceptions"
            className="mr-2"
            name="selectedValue"
            value={"copyFloorAndExcludeExceptions"}
            label="Copy floor and exclude all exceptions"
            onChange={onGroupChangeHandler}
            required
          />
        </li>
        <NumericTextBox
          className="mt-3"
          placeholder="Please enter percentage"
          step={5}
          name={"percentage"}
          value={props.modalData.percentage}
          min={0}
          max={400}
          onChange={onGroupChangeHandler}
        />
      </ul>
    </form>
  );
};
