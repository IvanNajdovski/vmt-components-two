//@ts-nocheck
import React from "react";
import { PaginationTableGrid } from "../../../Tables";

export const CustomerConflictResolverModal = (props) => {
  const onSelectChangeHandler = (e) =>
    props.onChangeModalData((prevData) => ({
      ...prevData,
      conflicts: prevData.conflicts.map((val) => {
        if (val.rowNumber === e.dataItem.rowNumber) {
          val.override = !e.dataItem.override;
        }
        return val;
      }),
    }));

  const onHeaderSelectionChangeHandler = (e) => {
    const checked = e.syntheticEvent.target.checked;
    props.onChangeModalData((prevData) => ({
      ...prevData,
      conflicts: prevData.conflicts.map((item) => {
        item.override = checked;
        return item;
      }),
    }));
  };

  return (
    <React.Fragment>
      <p>Following list of routes are in conflict with rates on the file that are not yet in effect.</p>
      <p>
        Please place a check next to each item where the newrate should override the rate which is on file, but not yet in effect. Please note that
        any routes left unchecked will be removed from thes Rate-Mod notice
      </p>
      <PaginationTableGrid
        {...props.conflicts}
        selectable
        selectableField="override"
        idField={"rowNumber"}
        onSelectChangeHandler={onSelectChangeHandler}
        onHeaderSelectionChangeHandler={onHeaderSelectionChangeHandler}
        gridTooltip={<div className="d-flex align-items-center ml-2">Rate mod rates</div>}
        tableDataSet={props.modalData.conflicts}
        modalTable
        noColumnsWidth
      />
      <PaginationTableGrid
        {...props.originals}
        gridTooltip={<div className="d-flex align-items-center ml-2">Pending rates</div>}
        tableDataSet={props.modalData.originals}
        modalTable
        noColumnsWidth
      />
    </React.Fragment>
  );
};
