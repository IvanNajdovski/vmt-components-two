import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import { Route } from "react-router-dom";

const PageHeading = ({ match }) => (
  <Route path={`${match.url}/:path`} component={PageTitle} />
);
export default PageHeading;
