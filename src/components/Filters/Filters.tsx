//@ts-nocheck
import React, { useCallback } from "react";

import CustomInput from "../Inputs/CustomInput";
import { FiltersInterface } from "./Filters.interface";

export const FiltersWrapper: React.FC<FiltersInterface> = ({ data, inputs, state, dispatch }) => {
  const filtersChangeHandler = useCallback((e) => {
    dispatch({
      type: e.target.name,
      value: e.value,
      data: e.data,
    });
  }, []);
  return (
    <React.Fragment>
      {inputs.map((input) => {
        return (
          <div className={`${input.wrapperClassName}`}>
            <CustomInput {...input} onChange={filtersChangeHandler} value={state[input.name]} data={data && data[input.dataField]} />
          </div>
        );
      })}
    </React.Fragment>
  );
};
