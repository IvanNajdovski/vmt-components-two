//@ts-nocheck
import React from "react";
import { Notification } from "@progress/kendo-react-notification";

export const NotificationItem = (props) => {
  return (
    <Notification className={"mr-2"} type={{ style: "success" }}>
      <span>{props.editedRecords + ` ${props.editedRecords === 1 ? "record" : "records"}`} will be updated</span>
    </Notification>
  );
};
