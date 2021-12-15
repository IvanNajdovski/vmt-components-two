//@ts-nocheck
import React, { memo } from "react";
import ButtonContainer from "./SplitButton/SplitButton";
import { SwitchButton } from "./SwitchButton/SwitchButton";
import { SimpleButton as Button } from "./SimpleButton/SimpleButton";

interface CustomButtonInterface {
  btnType?: string;
  label?: string;
  iconClass?: string;
  className?: string;
  disabled: boolean;
  loading?: boolean;
  onClickHandler: Function;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
  look?: any;
  title?: string;
  icon?: string;
  style?: any;
}
export const CustomButton: React.FC<CustomButtonInterface> = memo((props) => {
  switch (props.btnType) {
    case "split":
      return <ButtonContainer {...props} />;
    case "switch":
      return <SwitchButton {...props} />;
    default:
      return <Button {...props} />;
  }
});
