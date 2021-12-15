import React from "react";
import { Notification } from "@progress/kendo-react-notification";

export const NotificationBox = (props) => {
  return (
    <React.Fragment>
      <Notification type={{ style: "success" }}>
        <span>{props.editedRecord} records will be updated</span>
      </Notification>
    </React.Fragment>
  );
};
