//@ts-nocheck
import React from "react";
import { Route } from "react-router-dom";
import { Avatar } from "@progress/kendo-react-layout";
import PageTitle from "./PageTitle/PageTitle";

export const PageLayout = (props) => {
  const parentPath = props.routes && props.routes.find((route) => props.location.pathname === route.route);

  const pageIcon = (parentPath && parentPath.icon) || props.icon;
  return (
    <main className="content">
      <div className="d-flex align-items-center justify-content-center mx-4 mb-2 flex-wrap">
        <h2 className="d-flex align-items-center mb-0 h3">
          {pageIcon && (
            <Avatar className="bg-neutral mr-2" type="icon" style={{ width: 50, height: 50, flexBasis: "unset" }} shape="circle">
              <span className={`fa fas fa-fw fa-xs ${pageIcon}`}></span>
            </Avatar>
          )}
          <Route path="/:path" component={(rest) => <PageTitle {...rest} titleRenderLevel={props.titleRenderLevel} />} />
        </h2>
        <div className="d-flex flex-wrap flex-fill align-items-center" id="page-title-content"></div>
        <div className="ml-auto d-flex" id="page-actions"></div>
      </div>
      {props.children}
    </main>
  );
};
