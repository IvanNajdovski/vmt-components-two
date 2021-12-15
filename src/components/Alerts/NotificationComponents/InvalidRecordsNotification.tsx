//@ts-nocheck
import React from "react";
import { Popup } from "@progress/kendo-react-popup";
import { Notification } from "@progress/kendo-react-notification";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";

export const InvalidRecordsNotification = (props) => {
  const anchor = React.useRef(null);
  const [show, setShow] = React.useState(false);

  const onHover = (show) => {
    setShow(() => show);
  };
  return (
    <Notification className={"mr-2"} type={{ style: "warning" }}>
      <div ref={anchor}>
        <span>
          {props.invalidRecords.length + ` ${props.invalidRecords.length === 1 ? "record has" : "records have"} `}
          invalid inputs
          <i className="far fa-list-alt text-neutral mx-2" onMouseEnter={onHover.bind(null, true)} onMouseLeave={onHover.bind(null, false)}></i>
        </span>
      </div>
      <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
        <ListView data={props.invalidRecords} item={PopupItem} header={PopupHeader} className="w-100" />
      </Popup>
    </Notification>
  );
};

export const PopupItem = (props) => {
  let { country, countryName, sellDestination, plRouteDesc, product, shortName } = props.dataItem;

  return (
    <div className="row p-2 border-bottom align-middle m-0">{`${[country || countryName, sellDestination || plRouteDesc, product || shortName]
      .filter(Boolean)
      .join(" - ")}`}</div>
  );
};

export const PopupHeader = (props) => {
  return <ListViewHeader className="p-2">Invalid entries:</ListViewHeader>;
};
