//@ts-nocheck
import React from "react";
import { PaginationTableGrid } from "../../../Tables";
import { columnsInfo } from "./floorAttributesColumns.json";

export const FloorAttributesConflictResolverModal = (props) => {
  return (
    <React.Fragment>
      <p>Some records attempted to create already exist, do you want to update the existing records?</p>
      <PaginationTableGrid
        gridTooltip={<div className="d-flex align-items-center ml-2">Records attempted to create</div>}
        tableDataSet={props.modalData.requestRecords}
        columnsInfo={columnsInfo}
      />
      <PaginationTableGrid
        gridTooltip={<div className="d-flex align-items-center ml-2">Existing Records</div>}
        tableDataSet={props.modalData.conflictingRecords}
        columnsInfo={columnsInfo}
      />
    </React.Fragment>
  );
};
