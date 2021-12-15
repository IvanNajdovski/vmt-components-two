import React from "react";
import { Popup } from "@progress/kendo-react-popup";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";

export const PrefixPopup = ({ dataItem, show, options, anchor, ...props }) => {
  return (
    <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
      <ListView data={dataItem[options.field]} item={PopupItem} header={PopupHeader} className="w-100" />
    </Popup>
  );
};

const PopupItem = (props) => {
  let item = props.dataItem;
  return <div className="row p-2 border-bottom align-middle m-0">{item}</div>;
};

const PopupHeader = (props) => {
  return <ListViewHeader>Prefixes:</ListViewHeader>;
};
