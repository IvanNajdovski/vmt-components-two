//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { createDateForInput } from "../../utils";

const CustomDateInput = ({ label, editorId = "", ...props }) => {
  const valid =
    !props.value ||
    ((!props.min || (props.value && props.value.getTime() > props.min.getTime())) &&
      (!props.max || (props.value && props.value.getTime() < props.max.getTime())));
  return (
    <FloatingLabel label={label} editorId={editorId} editorValue={"true"}>
      <DatePicker {...props} dateInput={CustomDateInputContent} format="dd/MMM/yyyy" id={editorId} valid={valid} />
    </FloatingLabel>
  );
};

const CustomDateInputContent = (props) => {
  const yearRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const [date, setDate] = useState({ year: null, month: null, day: null });

  useEffect(() => {
    setDate({
      year: props.value ? props.value.getFullYear() : null,
      month: props.value ? props.value.getMonth() + 1 : null,
      day: props.value ? props.value.getDate() : null,
    });
  }, [props.value && props.value.getTime()]);

  const onBlurHandler = (e) => {
    if (
      ((date.year && date.month && date.day) || (date.year == null && date.month == null && date.day == null)) &&
      yearRef.current &&
      monthRef.current &&
      dayRef.current &&
      yearRef.current.validity.valid &&
      monthRef.current.validity.valid &&
      dayRef.current.validity.valid
    ) {
      props.onChange({
        target: { name: props.name },
        value: createDateForInput(date.year, date.month != null ? date.month - 1 : null, date.day),
      });
    }
  };
  const onChangeHandler = (e) => setDate((prevData) => ({ ...prevData, [e.target.name]: e.value ? e.value : null }));

  return (
    <div className={"d-flex align-items-center custom-date-content-styling"}>
      <NumericTextBox
        ref={yearRef}
        format={"00"}
        spinners={false}
        placeholder={"day"}
        name="day"
        min={0}
        max={props.value ? new Date(props.value.getFullYear(), props.value.getMonth() + 1, 0).getDate() : 31}
        valid={
          props.valid &&
          !(!date.day && (date.year || date.month)) &&
          (!date.day ||
            (date.day >= 1 && date.day <= (props.value ? new Date(date.year ? date.year : null, date.month ? date.month : null, 0).getDate() : 31)))
        }
        validityStyles={false}
        value={date.day}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
      /
      <NumericTextBox
        ref={monthRef}
        format={"00"}
        spinners={false}
        placeholder={"month"}
        name="month"
        min={0}
        max={12}
        valid={props.valid && !(!date.month && (date.year || date.day))}
        value={date.month}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
      /
      <NumericTextBox
        ref={dayRef}
        format={"0000"}
        spinners={false}
        placeholder={"year"}
        name="year"
        valid={props.valid && !(!date.year && (date.month || date.day))}
        value={date.year}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};
export default CustomDateInput;
