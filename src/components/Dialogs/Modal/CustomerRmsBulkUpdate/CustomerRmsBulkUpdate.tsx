//@ts-nocheck
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { NumericTextBox, Checkbox } from "@progress/kendo-react-inputs";
import { PaginationTableGrid } from "../../../Tables";
import { CheckboxValueInput } from "../../../Inputs";
import { compareObject, resetObject } from "../../../utils";

const initalInputs = {
  newRate: null,
  pufType: false,
  terminate: false,
};
export const CustomerRmsBulkUpdate = (props) => {
  const [groupValue, setGroupValue] = useState(initalInputs);

  const onGroupChangeHandler = useCallback((e) => {
    const name = e.target.name || e.target.element.name;
    setGroupValue((prevData) => ({
      ...prevData,
      [name]: e.value,
    }));
  }, []);

  const onGroupBlurHandler = useCallback(
    (e) => {
      const name = e.target.name || e.target.element.name;
      const value = e.value || e.target.value;

      props.onChangeModalData((prevData) => {
        return prevData.map((val) => {
          if (name === "newRate") {
            if (groupValue.pufType) {
              return props.updateAdditionalValues({ ...val, [name]: val._newRate ? val._newRate : value }, [
                "changes",
                "warning",
                "puf",
                "pufConfirm",
                "newRate",
              ]);
            } else {
              return props.updateAdditionalValues({ ...val, [name]: val._newRate ? val._newRate : value }, ["changes", "warning", "puf", "newRate"]);
            }
          } else if (name === "terminate") {
            if (groupValue.pufType) {
              return props.updateAdditionalValues({ ...val, [name]: value, newRate: groupValue.newRate }, [
                "newRate",
                "changes",
                "warning",
                "puf",
                "pufConfirm",
              ]);
            } else {
              return props.updateAdditionalValues({ ...val, [name]: value, newRate: groupValue.newRate }, [
                "newRate",
                "changes",
                "warning",
                "puf",
                "pufRemove",
              ]);
            }
          } else if (name === "pufType") {
            if (value) {
              return props.updateAdditionalValues(val, ["pufConfirm"]);
            } else {
              return props.updateAdditionalValues(val, ["pufRemove"]);
            }
          }
        });
      });
    },
    [groupValue]
  );
  const onCheckboxChangeHandler = (e) => {
    onGroupChangeHandler(e);
    onGroupBlurHandler(e);
  };

  const onClearChanges = () => {
    setGroupValue(initalInputs);
    props.onChangeModalData((prevData) => prevData.map(resetObject));
  };

  const hasEditedRecords = useMemo(() => props.modalData.some(compareObject), [props.modalData]);

  return (
    <React.Fragment>
      <ul className="list-group">
        <li className="input-group">
          <NumericTextBox
            className="input-group mb-2"
            label={"Rate for Group Routes"}
            name="newRate"
            step={0.0001}
            format="0.####"
            spinners={false}
            value={groupValue.newRate}
            onChange={onGroupChangeHandler}
            onBlur={onGroupBlurHandler}
          />
        </li>

        <li className="list-group-item">
          <Checkbox
            className="mr-2"
            label={"Flag PUF for rates bellow floor"}
            name="pufType"
            value={groupValue.pufType}
            checked={groupValue.pufType}
            onChange={onCheckboxChangeHandler}
          />
        </li>
        {props.terminateConditions && (
          <li className="list-group-item">
            <CheckboxValueInput
              className="mr-2"
              label={"Terminate selected rates"}
              name="terminate"
              value={groupValue.terminate}
              values={{ true: "Y", false: "N" }}
              onChange={onCheckboxChangeHandler}
            />
          </li>
        )}
      </ul>
      <PaginationTableGrid
        tableDataSet={props.modalData}
        secondaryActions={[{ ...props.clearChanges, disabled: !hasEditedRecords, function: onClearChanges }]}
        columnsInfo={props.columnsInfo}
        customCells={props.customCells}
        rowRender={props.rowRender}
        modalTable
      />
    </React.Fragment>
  );
};
