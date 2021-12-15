//@ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

export const NotificationAlerts = (props) => {
  const content = (
    <React.Fragment>
      <NotificationGroup
        style={{
          zIndex: 10000,
          right: "1rem",
          bottom: "1rem",
          alignItems: "flex-end",
        }}
      >
        {props.messages.map((val) => {
          return (
            <Fade
              onExited={props.onDeleteNotification.bind(null, val.id)}
              key={val.id}
              enter={true}
              exit={true}
              transitionExitDuration={500}
              unmountOnExit
              appear
            >
              {val.show && (
                <Notification type={{ style: val.type, icon: true }} closable={true} onClose={props.onFadeNotification.bind(null, val.id)}>
                  <span>{val.text}</span>
                </Notification>
              )}
            </Fade>
          );
        })}
      </NotificationGroup>
    </React.Fragment>
  );
  return ReactDOM.createPortal(content, document.getElementById("notification"));
};
