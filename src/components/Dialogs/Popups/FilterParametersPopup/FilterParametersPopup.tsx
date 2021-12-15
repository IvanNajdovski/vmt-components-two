//@ts-nocheck
import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

export const FilterParametersPopup = ({ data }) => {
  const noFiltersSelected = <span className="mx-1 p-2 text-primary">No Filters Selected</span>;
  const dataClassName = "mx-1 p-2 bg-primary text-white rounded";

  return (
    <React.Fragment>
      {Array.isArray(data) &&
        data.map((val) => {
          let value;
          let label = <span className="text-capitalize">{val.label}:</span>;
          if (val.value != null) {
            if (typeof val.value === "boolean") {
              label = null;
              value = (
                <div className="mt-3 mb-3 d-flex">
                  <Checkbox className="mr-2" label={val.label} value={val.value} disabled={true} />
                </div>
              );
            } else if (Array.isArray(val.value)) {
              if (val.value.length) {
                value = val.value.map((v) => <span className={dataClassName}>{v}</span>);
              } else {
                value = null;
              }
            } else if (val.value instanceof Date) {
              value = <span className={dataClassName}>{val.value.toLocaleDateString()}</span>;
            } else {
              value = <span className={dataClassName}>{val.value}</span>;
            }
          }
          return (
            <div className="mt-3 mb-3">
              {label && label}
              {value || noFiltersSelected}
            </div>
          );
        })}
    </React.Fragment>
  );
};
