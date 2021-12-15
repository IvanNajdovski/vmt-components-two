import React from "react";

export const DefaultSpinner = (props) => {
  return (
    <div className="spinner" style={{ zIndex: 1000 }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const Spinner = (props) => {
  return (
    <div style={{ height: "300px" }}>
      <div className="spinner" style={{ zIndex: 1000 }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
