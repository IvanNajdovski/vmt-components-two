//@ts-nocheck
import React from "react";

export const InsufficientPermissions = (props) => {
  return (
    <div className="text-muted p-5 d-flex flex-column">
      <div className="d-flex align-items-end">
        <i className="fa fas fa-fw fa-3x fa-lock m-3"></i>
        <h1 className="display-4">Insufficient Permissions</h1>
      </div>
      <p className="mx-3">
        Sorry, you don't have sufficient permissions to access this page. If this is a mistake, please{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://ibasis.com/contact/">
          contact iBASIS
        </a>
        .
      </p>
    </div>
  );
};
