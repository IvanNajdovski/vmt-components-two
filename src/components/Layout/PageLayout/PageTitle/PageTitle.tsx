import React from "react";
import { Route } from "react-router-dom";
import { undash } from "../../../utils";

const PageTitle = ({ match, titleRenderLevel }) => {
  const matchArr = match.url.split("/");
  return (
    <React.Fragment>
      {matchArr.length > 2 && (!titleRenderLevel || matchArr.length < 2 + titleRenderLevel) && (
        <i className={`fa fas fa-fw fa-xs fa-caret-right text-neutral-muted`}></i>
      )}
      <span className="mx-2 text-capitalize">{undash(match.params.path)}</span>
      {(!titleRenderLevel || matchArr.length < 1 + titleRenderLevel) && (
        <Route path={`${match.url}/:path`} render={(rest) => <PageTitle {...rest} titleRenderLevel={titleRenderLevel} />} />
      )}
    </React.Fragment>
  );
};

export default PageTitle;
