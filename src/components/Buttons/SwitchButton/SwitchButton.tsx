//@ts-nocheck
import React from "react";

export const SwitchButton = (props) => {
  return (
    <div className="custom-control custom-switch ml-2">
      <input
        id={"switchbtn"}
        className="custom-control-input"
        type="checkbox"
        onChange={props.onClickHandler}
        value={props.value}
        checked={props.value}
        disabled={props.disabled}
      />
      {props.label && (
        <label className="custom-control-label" htmlFor="switchbtn">
          {props.label}
        </label>
      )}
    </div>
  );
};
