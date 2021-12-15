import React, { useState, useEffect } from "react";
import { Popup } from "@progress/kendo-react-popup";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";

export const OriginPopup = ({ dataItem, show, options, anchor, ...props }) => {
  const [originBasedData, setOriginBaseData] = useState([]);
  useEffect(() => {
    async function getOriginBasedData() {
      const originData = await props.service({ originBucketIds: [dataItem.originBucketId] });
      setOriginBaseData(originData.data.sort((a, b) => a.routeDesc.localeCompare(b.routeDesc)));
    }
    getOriginBasedData();
  }, []);
  return (
    <Popup
      anchor={anchor.current}
      show={show && !!originBasedData.length}
      popupClass={"popup-content"}
      className={"popup-wrapper"}
      collision={{
        horizontal: "flip",
        vertical: "flip",
      }}
    >
      <ListView data={originBasedData} item={PopupItem} header={PopupHeader} className="w-100 " />
    </Popup>
  );
};

const PopupItem = (props) => {
  const item = props.dataItem;
  return (
    <div className="row p-1 border-bottom align-middle m-0 d-flex justify-content-between">
      <div>{item.matchedRoutePrefix}</div> <div>{item.routeDesc}</div>
    </div>
  );
};

const PopupHeader = () => {
  return (
    <ListViewHeader>
      <strong>Dial Digit Country/PR </strong>
    </ListViewHeader>
  );
};
