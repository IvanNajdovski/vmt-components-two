//@ts-nocheck
import React from "react";
import { Link } from "react-router-dom";

export const LinkNotification = ({ textStart, linkAddress, id, textEnd }) => (
  <React.Fragment>
    {textStart} {linkAddress ? <Link to={`${linkAddress}${id}`}>{id}</Link> : id} {textEnd}
  </React.Fragment>
);
