import React from "react";
import ReactDOM from "react-dom";
import { Spinner } from "../Spinner/Spinner";

export const TableSpinner = (props) => {
  const gridContent = document && document.querySelector(".k-grid-container");
  return gridContent ? ReactDOM.createPortal(<Spinner />, gridContent) : <Spinner />;
};
