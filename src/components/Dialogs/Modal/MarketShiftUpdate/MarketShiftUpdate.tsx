//@ts-nocheck
import React, { useState, useCallback, useEffect } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { TextArea } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { PaginationTableGrid } from "../../../Tables";
import { setEndDayDate } from "../../../utils";
export const MarketShiftUpdate = (props) => {
  const [currencyFilter, setCurrencyFilter] = useState();
  const [groupValue, setGroupValue] = useState({
    markup: null,
    markupPer: null,
    floorCost: null,
    beginDate: new Date(),
    comments: null,
    marketShift: "",
    exceptionReason: "",
  });

  const [isDirty, setIsDirty] = useState({
    markup: false,
    markupPer: false,
    floorCost: false,
    beginDate: true,
    comments: false,
  });

  useEffect(() => {
    setCurrencyFilter(props.modalData.some((val, index, arr) => arr[0].currency !== val.currency));
    onGroupBlurHandler({
      target: { name: "beginDate", value: groupValue.beginDate },
    });
  }, []);

  const onGroupChangeHandler = useCallback((e) => {
    const { name } = e.target;
    const value = e.value || e.target.value;
    setIsDirty((prevState) => ({ ...prevState, [name]: true }));
    setGroupValue((prevData) => ({
      ...prevData,
      [name]: name === "endDate" ? setEndDayDate(value) : value,
    }));
  }, []);

  const onGroupBlurHandler = useCallback(
    (e) => {
      const { name } = e.target;
      const value = e.value || e.target.value;

      if (!isDirty[name]) return;
      if (e.target.element && e.target.element.checkValidity && !e.target.element.checkValidity()) return e.target.element.reportValidity();

      props.onChangeModalData((prevData) =>
        prevData.map((val) => {
          if (name === "markup") {
            return { ...val, [name]: value, markupPer: null, marketShift: "Y", exceptionReason: "Market Shift" };
          } else if (name === "markupPer") {
            return { ...val, [name]: value, markup: null, marketShift: "Y", exceptionReason: "Market Shift" };
          } else {
            return { ...val, [name]: name === "endDate" ? setEndDayDate(value) : value, marketShift: "Y", exceptionReason: "Market Shift" };
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
            <div className="col-lg-6">
              <div className="input-group mb-2">
                <NumericTextBox
                  label={"Floor Cost"}
                  name="floorCost"
                  step={5}
                  disabled={currencyFilter}
                  placeholder={currencyFilter ? "Choose records with same currency" : null}
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
            <div className="col-lg-6">
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
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <div className="input-group mb-2">
                <FloatingLabel label={"Start Date"} editorId={"beginDate"} editorValue={"true"}>
                  <DatePicker
                    name="beginDate"
                    id={"beginDate"}
                    format="dd/MMM/yyyy"
                    value={groupValue.beginDate}
                    onChange={onDropDownChange}
                    min={new Date()}
                  />
                </FloatingLabel>
              </div>
            </div>
            <div className="col-lg-24">
              <div className="input-group">
                <FloatingLabel label={"Comment"} editorId={"comment"} editorValue={"true"}>
                  <TextArea
                    data-testid="textArea"
                    name="comments"
                    id={"comment"}
                    rows={1}
                    autoSize={true}
                    value={groupValue.comments}
                    onChange={(e) => onGroupChangeHandler({ ...e, target: { ...e.target, name: "comments" } })}
                    onBlur={(e) => onGroupBlurHandler({ ...e, target: { ...e.target, name: "comments", value: groupValue.comments } })}
                  ></TextArea>
                </FloatingLabel>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <PaginationTableGrid tableDataSet={props.modalData} columnsInfo={props.columnsInfo} customCells={props.customCells} modalTable />
    </React.Fragment>
  );
};
