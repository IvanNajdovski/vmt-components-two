import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const ColumnMenuNumericFilter = ({ firstFilterProps, secondFilterProps, ...props }) => {
  const onFirstFilterChange = (e) =>
    firstFilterProps.onChange({ value: firstFilterProps.value, operator: e.value.operator, syntheticEvent: e.syntheticEvent });
  const onFirstFilterValueChange = (e) =>
    firstFilterProps.onChange({ value: e.value, operator: firstFilterProps.operator, syntheticEvent: e.syntheticEvent });
  const onSecondFilterChange = (e) =>
    secondFilterProps.onChange({ value: secondFilterProps.value, operator: e.value.operator, syntheticEvent: e.syntheticEvent });
  const onSecondFilterValueChange = (e) =>
    secondFilterProps.onChange({ value: e.value, operator: secondFilterProps.operator, syntheticEvent: e.syntheticEvent });

  return (
    <div>
      <DropDownList
        onChange={onFirstFilterChange}
        value={firstFilterProps.operators.find((filter) => filter.operator === firstFilterProps.operator)}
        data={firstFilterProps.operators}
        textField="text"
        dataItemKey="operator"
      />
      <NumericTextBox onChange={onFirstFilterValueChange} value={firstFilterProps.value} spinners={false} format={"#.######"} />
      <DropDownList
        className="w-50"
        data={props.logicData}
        value={props.logicValue}
        onChange={props.onLogicChange}
        textField="text"
        dataItemKey="operator"
      />
      <DropDownList
        onChange={onSecondFilterChange}
        value={secondFilterProps.operators.find((filter) => filter.operator === secondFilterProps.operator)}
        data={secondFilterProps.operators}
        textField="text"
        dataItemKey="operator"
      />
      <NumericTextBox onChange={onSecondFilterValueChange} value={secondFilterProps.value} spinners={false} format={"#.######"} />
    </div>
  );
};
