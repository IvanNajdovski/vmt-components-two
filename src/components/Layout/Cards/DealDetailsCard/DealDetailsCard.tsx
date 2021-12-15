import React from "react";
import { Sortable } from "@progress/kendo-react-sortable";

export const DealDetailsCard = (props) => {
  const SortableItem = (props) => {
    const { dataItem } = props;
    let className = dataItem.bullet
      ? "bullet-green details-card-items"
      : "bullet details-card-items";

    return (
      <div className={className}>
        {dataItem.text}: <i className="float-right">{dataItem.data}</i>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header text-uppercase">
        <i className="fa fas fa-list mr-2"></i>
        <span role="heading" className="text-muted">Deal Details</span>
      </div>
      <div className="card-body">
        <Sortable
          className="row no-gutters row-cols-1 row-cols-sm-2 row-cols-lg-4"
          idField={"id"}
          disabledField={"disabled"}
          data={props.dealSummaryData}
          itemUI={SortableItem}
        />
      </div>
    </div>
  );
};
