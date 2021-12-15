//@ts-nocheck
import React from "react";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";
import { FilterParametersPopup } from "../../Dialogs";

export const ToggleFiltersButton = (props) => {
  const anchor = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const openList = () => setShow(!show);
  const onClick = () => {
    setShow(false);
    props.primaryButton.onClickHandler((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div ref={anchor} className="ml-2">
        <ButtonGroup>
          <Button
            {...props.primaryButton}
            title={"Toggle Filters"}
            iconClass={`${props.primaryButton.loading ? "spinner-border spinner-border-sm" : `${props.primaryButton.iconClass}`}`}
            onClick={onClick}
          >
            {props.primaryButton.label && <span>{props.primaryButton.label}</span>}
          </Button>
          <Button
            {...props.toggleButton}
            title={"Filter Details"}
            iconClass={`${props.toggleButton.loading ? "spinner-border spinner-border-sm" : `${props.toggleButton.iconClass}`}`}
            onClick={openList}
          >
            {props.toggleButton.label && <span>{props.toggleButton.label}</span>}
          </Button>
        </ButtonGroup>
      </div>
      <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
        <div className="filters-popup-inner">
          <FilterParametersPopup data={props.toggleButton.data} />
        </div>
      </Popup>
    </React.Fragment>
  );
};
