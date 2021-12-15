//@ts-nocheck
import React from "react";
import { Button } from "@progress/kendo-react-buttons";
export const SimpleButton = (props) => {
  return (
    <Button
      {...props}
      disabled={props.disabled || props.loading}
      iconClass={`${props.loading ? "spinner-border spinner-border-sm" : `${props.iconClass}`}`}
      onClick={props.onClickHandler}
    >
      {props.label && <span>{props.label}</span>}
    </Button>
  );
};
