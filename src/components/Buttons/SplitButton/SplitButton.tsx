//@ts-nocheck
import React from "react";
import { SplitButton } from "@progress/kendo-react-buttons";

const ButtonContainer = (props) => {
  return (
    <SplitButton
      onItemClick={props.onClickHandler}
      className={`mr-2`}
      iconClass={`mr-2 ${props.iconClass ? props.iconClass : ""}`}
      buttonClass={`${props.buttonClass ? props.buttonClass : ""}`}
      items={props.items}
      text={props.label}
      look={props.look}
      disabled={props.disabled}
    />
  );
};
export default ButtonContainer;
