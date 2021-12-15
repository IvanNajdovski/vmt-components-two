//@ts-nocheck
import React, { useCallback, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const Export = (props) => {
  const [exportInputs, setExportInputs] = useState({
    options: null,
    currency: null,
  });
  const onGroupChangeHandler = useCallback((e) => {
    setExportInputs((prevState) => {
      const newState = { ...prevState, [e.target.props.name]: e.value };
      props.onChangeModalData(newState);
      return newState;
    });
  }, []);

  return (
    <form ref={props.formRef}>
      <fieldset>
        <div className="row">
          <div className="col-lg-24">
            <div className="input-group mb-2">
              <DropDownList
                label={"options"}
                name="options"
                data={props.data}
                textField="name"
                dataItemKey="id"
                value={exportInputs.options}
                onChange={onGroupChangeHandler}
                validityStyles={false}
                required
              />
            </div>
          </div>
          {exportInputs.options && exportInputs.options.showCurrency && (
            <div className="col-lg-24">
              <div className="input-group mb-2">
                <DropDownList
                  label={"currency"}
                  name="currency"
                  data={
                    props.modalData &&
                    props.modalData.options &&
                    props.modalData.options.data.sort((a, b) => a.currencyName.localeCompare(b.currencyName))
                  }
                  textField="currencyName"
                  dataItemKey="currencyId"
                  value={exportInputs.currency}
                  onChange={onGroupChangeHandler}
                  validityStyles={false}
                  required
                />
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
};
