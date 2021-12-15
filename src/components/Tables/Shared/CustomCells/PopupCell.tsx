import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { OriginPopup, PrefixPopup } from "./PopupComponents";

const getPopupType = (type, props) => {
  switch (type) {
    case "originPopup":
      return <OriginPopup {...props} />;
    case "prefixPopup":
      return <PrefixPopup {...props} />;
    default:
      return <PrefixPopup {...props} />;
  }
};

const PopupCell = ({ dataItem, options, ...props }) => {
  const { service } = options;
  const anchor = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const onClickHandler = () => setShow(!show);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-80 text-truncate">{dataItem[props.field]}</div>
        <div ref={anchor}>
          <Button icon="more-horizontal" look="clear" onClick={onClickHandler} style={{ color: "inherit" }} />
        </div>
      </div>
      {show && getPopupType(options.contentType, { anchor, dataItem, options, show, service })}
    </div>
  );
};

export default PopupCell;
