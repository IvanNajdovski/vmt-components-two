//@ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { PaginationTableGrid } from "../../../Tables";
import { setEndDayDate } from "../../../utils";

export const FloorBulkUpdate = (props) => {
  const [disabledFloorCost, setDisabledFloorCost] = useState(false);
  const [groupValue, setGroupValue] = useState({
    markup: null,
    markupPer: null,
    floorCost: null,
    beginDate: new Date(),
    endDate: undefined,
  });
  const [isDirty, setIsDirty] = useState({
    markup: false,
    markupPer: false,
    floorCost: false,
    beginDate: true,
    endDate: true,
  });

  useEffect(() => {
    setDisabledFloorCost(props.modalData.some((val, index, arr) => arr[0].currency !== val.currency));
    onGroupBlurHandler({
      target: { name: "beginDate", value: groupValue.beginDate },
    });
  }, []);

  const onGroupChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setIsDirty((prevState) => ({ ...prevState, [name]: true }));
    setGroupValue((prevData) => ({
      ...prevData,
      [name]: name === "endDate" ? setEndDayDate(value) : value,
    }));
  }, []);
  const onGroupBlurHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (!isDirty[name]) return;
      if (e.target.element && e.target.element.checkValidity && !e.target.element.checkValidity()) return e.target.element.reportValidity();

      props.onChangeModalData((prevData) =>
        prevData.map((val) => {
          if (name === "markup") {
            return { ...val, [name]: value, markupPer: null };
          } else if (name === "markupPer") {
            return { ...val, [name]: value, markup: null };
          } else if (name === "endDate" && val.product === "PV") {
            return val;
          } else {
            return { ...val, [name]: name === "endDate" ? setEndDayDate(value) : value, beginDate: new Date() };
          }
        })
      );
    },
    [isDirty]
  );
  const onDropDownChange = (e) => {
    onGroupChangeHandler(e);
    onGroupBlurHandler(e);
  };

  return (
    <React.Fragment>
      <form ref={props.formRef}>
        <fieldset>
          <div className="row">
            <div className="col-lg-8">
              <div className="input-group mb-2">
                <NumericTextBox
                  label={"Markup"}
                  name="markup"
                  step={0.000001}
                  format="0.######"
                  spinners={false}
                  value={groupValue.markup}
                  onChange={onGroupChangeHandler}
                  onBlur={onGroupBlurHandler}
                  disabled={groupValue.markupPer}
                  min={0}
                  max={99}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="input-group mb-2">
                <NumericTextBox
                  label={"Markup Percent"}
                  name="markupPer"
                  step={5}
                  format="0"
                  spinners={false}
                  value={groupValue.markupPer}
                  onChange={onGroupChangeHandler}
                  onBlur={onGroupBlurHandler}
                  disabled={groupValue.markup}
                  min={1}
                  max={99}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="input-group mb-2">
                <NumericTextBox
                  label={"Floor Cost"}
                  name="floorCost"
                  step={5}
                  disabled={disabledFloorCost}
                  placeholder={disabledFloorCost && "Choose records with same currency"}
                  format="0.######"
                  spinners={false}
                  value={groupValue.floorCost}
                  onChange={onGroupChangeHandler}
                  onBlur={onGroupBlurHandler}
                  min={0}
                  max={99}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <PaginationTableGrid tableDataSet={props.modalData} columnsInfo={props.columnsInfo} customCells={props.customCells} modalTable />
    </React.Fragment>
  );
};
