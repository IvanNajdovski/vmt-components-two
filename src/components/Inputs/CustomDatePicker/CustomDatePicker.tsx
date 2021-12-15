import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";

const CloseButton = (props) => {
  const onClickHandler = () => {
    props.onChange({ target: { name: props.name }, value: null });
  };
  const closeButtonContent = (
    <span
      onClick={onClickHandler}
      style={{ top: 0, right: 0 }}
      className="k-icon k-clear-value k-i-close position-absolute h-100"
      role="button"
      tabIndex={-1}
      title="clear"
    ></span>
  );
  return ReactDOM.createPortal(closeButtonContent, props.targetElement);
};

const CustomDatePicker = ({ label, editorId = "", ...props }) => {
  const datePickerRef: { current: any } = useRef();
  const [targetElement, setTargetElement] = useState(null);

  // useEffect(() => {
  //   if (datePickerRef.current) {
  //     const datePickerElement: HTMLElement = datePickerRef.current._element;
  //     const targetElement = datePickerElement.querySelector(".k-dateinput-wrap");
  //     setTargetElement(targetElement);
  //   }
  // }, [datePickerRef]);

  return (
    <FloatingLabel label={label} editorId={editorId} editorValue={"true"}>
      <DatePicker {...props} format="dd/MMM/yyyy" id={editorId} ref={datePickerRef} />
      {targetElement && props.value && <CloseButton targetElement={targetElement} onChange={props.onChange} name={props.name} />}
    </FloatingLabel>
  );
};

export default CustomDatePicker;
