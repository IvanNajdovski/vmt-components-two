//@ts-nocheck
import React, { useState, useCallback, useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { PaginationTableGrid } from "../../../Tables";
import { setEndDayDate } from "../../../utils";

export const AttributesTerminate = (props) => {
  const [groupValue, setGroupValue] = useState({
    endDate: null,
  });

  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  useEffect(() => {
    onGroupChangeHandler({
      target: { name: "endDate", value: setEndDayDate(yesterday) },
    });
  }, []);

  const onGroupChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setGroupValue((prevData) => ({
      ...prevData,
      [name]: setEndDayDate(value),
    }));
    props.onChangeModalData((prevData) =>
      prevData.map((val) => {
        if (val.shortName && !(val.countryName || val.plRouteDesc)) {
          return val;
        }
        return { ...val, [name]: setEndDayDate(value) };
      })
    );
  }, []);

  return (
    <React.Fragment>
      <form>
        <fieldset>
          <div className="row">
            <div className="col-lg-24">
              <div className="input-group mb-2">
                <FloatingLabel label={"End Date"} editorId={"endDate"} editorValue={"true"}>
                  <DatePicker
                    name="endDate"
                    min={yesterday}
                    id={"endDate"}
                    format="dd/MMM/yyyy HH:mm:ss"
                    value={groupValue.endDate}
                    onChange={onGroupChangeHandler}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <PaginationTableGrid tableDataSet={props.modalData} columnsInfo={props.modalColumnsInfo} customCells={props.customCells} modalTable />
    </React.Fragment>
  );
};
