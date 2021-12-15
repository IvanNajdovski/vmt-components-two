import React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { createDateObject, createGmtDateObject, getGmt, setEndDayDate } from "../../../utils";

const DateInputCell = (props) => {
  const { min, max, formatFn, format } = props.options;
  const value = createGmtDateObject(props.dataItem[props.field]);
  const onChangeHandler = (e) => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: formatFn ? setEndDayDate(e.value) : e.value,
    });
  };

  const minDate = () => {
    if (min instanceof Date) {
      return min;
    } else if (min && typeof min === "string" && props.dataItem[min]) {
      return createDateObject(props.dataItem[min]);
    }
  };

  return (
    <React.Fragment>
      {props.field === "beginDate" || props.field === "startDate" ? (
        <DatePicker
          className={`w-100 ${
            (props.dataItem.hasOwnProperty(`_${props.field}`) &&
              (value && value.getTime()) !=
                (props.dataItem[`_${props.field}`] && getGmt(new Date(props.dataItem[`_${props.field}`]), true).getTime()) &&
              "border border-warning") ||
            ""
          }`}
          min={createDateObject(new Date())}
          max={max && createDateObject(props.dataItem[max])}
          validityStyles={false}
          format={format}
          value={value || null}
          onChange={onChangeHandler}
        />
      ) : (
        <DatePicker
          className={`w-100 ${
            (props.dataItem.hasOwnProperty(`_${props.field}`) &&
              props.dataItem[props.field] != props.dataItem[`_${props.field}`] &&
              "border border-warning") ||
            ""
          }`}
          min={minDate()}
          max={max && createDateObject(props.dataItem[max])}
          format={format}
          value={value || null}
          onChange={onChangeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default DateInputCell;
