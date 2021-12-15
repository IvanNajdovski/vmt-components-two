//@ts-nocheck
import React from "react";
import { Prompt } from "react-router-dom";

export const NavigationBlocker = (props) => {
  if (props.blocked) {
    window.onbeforeunload = () => props.message;
  } else {
    window.onbeforeunload = null;
  }
  return <Prompt when={props.blocked} message={props.message} />;
};
