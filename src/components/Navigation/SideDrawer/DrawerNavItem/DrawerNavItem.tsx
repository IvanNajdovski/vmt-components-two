import React from "react";
import { DrawerItem } from "@progress/kendo-react-layout";

interface DrawerItemInterface {
  text: string;
  icon: string;
  id: number;
  visible: boolean;
  name?: string;
}
const DrawerNavItem: React.FC<DrawerItemInterface> = (props) => {
  const arrowDir = props["data-expanded"] ? "fa-chevron-down" : "fa-chevron-right";

  return (
    <React.Fragment>
      {props.visible && (
        <DrawerItem {...props} className={`${props.name === "close" ? "mt-auto border-top" : ""}`}>
          <span className={"mr-3 fa fa-fw " + props.icon} />
          <span className={"nav-item"}>{props.text}</span>
          {"data-expanded" in props && <span className={"fa fa-xs fa-fw ml-auto " + arrowDir} />}
        </DrawerItem>
      )}
    </React.Fragment>
  );
};

export default DrawerNavItem;
