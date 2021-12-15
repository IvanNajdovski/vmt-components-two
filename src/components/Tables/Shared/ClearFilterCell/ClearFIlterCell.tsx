import React from "react";
import { CustomButton } from "../../../Buttons";

export const ClearFilterCell = ({ filter, defaultSort, resetFilters }) => (
  <div className={"d-flex justify-content-center align-items-center"}>
    <CustomButton
      disabled={!filter && defaultSort}
      onClickHandler={resetFilters}
      title={"Clear filters and revert to default sort"}
      primary={!!filter || !defaultSort}
      look={"flat"}
      className={"ml-1"}
      icon={"filter-clear"}
    />
  </div>
);
