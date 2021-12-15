import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { SimpleButton } from "../../../Buttons/SimpleButton/SimpleButton";
import { ToggleFiltersButton } from "../../../Buttons/ToggleFiltersButton/ToggleFiltersButton";

export const PageActions = (props) => {
  const [pageActions, setPageActions] = useState(document && document.getElementById("page-actions"));
  useEffect(() => {
    if (!pageActions) {
      setPageActions(document && document.getElementById("page-actions"));
    }
  }, []);

  const content = (
    <React.Fragment>
      {props.actions &&
        props.actions.map((action, index) => {
          return action.type === "popup" ? <ToggleFiltersButton {...action} key={index} /> : <SimpleButton {...action} key={index} />;
        })}
    </React.Fragment>
  );
  return pageActions ? ReactDOM.createPortal(content, pageActions) : null;
};
