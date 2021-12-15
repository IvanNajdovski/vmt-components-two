import React from "react";
import { Link, Route } from "react-router-dom";
import { undash } from "../../../../utils";

const BreadcrumbItem = ({ match, ...rest }) => {
  const title = undash(match.params.path);
  return (
    <React.Fragment>
      <li className={`text-capitalize breadcrumb-item `}>
        <Link to={match.url || ""}>{title}</Link>
      </li>
      <Route path={`${match.url}/:path`} component={BreadcrumbItem} />
    </React.Fragment>
  );
};

export default BreadcrumbItem;
