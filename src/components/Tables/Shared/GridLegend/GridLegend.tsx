import React from "react";
import ReactDOM from "react-dom";

export const GridLegend = (props) => {
  const legendContainer = props.tableGridRef && props.tableGridRef.current && props.tableGridRef.current.element.querySelector(".k-pager-wrap");
  const content = (
    <div className={"d-flex align-items-center order-10"}>
      <span className="k-label">Legend</span>
      {props.legend.map((item, key) => (
        <div key={key} className={`progress-bar px-3 py-2 mx-1 ${item.className}`} title={item.title} role="progressbar"></div>
      ))}
    </div>
  );
  return legendContainer ? ReactDOM.createPortal(content, legendContainer) : null;
};
