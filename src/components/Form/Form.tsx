//@ts-nocheck
import React, { useCallback, useReducer, useRef, useState, useMemo } from "react";

import { Button } from "@progress/kendo-react-buttons";
import CustomInput from "../Inputs/CustomInput";
import { FormInterface } from "./Form.interface";
import { PageActions } from "../Layout";
import { validateDateInputs, checkValidation } from "../utils";

export const FormWrapper: React.FC<FormInterface> = ({
  reducer,
  initialInputs,
  inputs,
  loading,
  data,
  onSubmit,
  onReset,
  children,
  services,
  disabled,
  dateLimits,
  required,
  onChangeHandler,
  toggleable,
  ...rest
}) => {
  const [state, dispatch] = useReducer(reducer, initialInputs);

  const filtersChangeHandler = useCallback((e) => {
    const { value, data } = e;
    const name = e.target.name;
    //@ts-ignore
    dispatch({
      type: name,
      name: name,
      value: value,
      data: data,
    });
    onChangeHandler && onChangeHandler(name, value);
  }, []);

  const onResetHandler = useCallback(() => {
    //@ts-ignore
    dispatch({ type: "reset" });
    onReset();
  }, []);

  const onSubmitHandler = () => onSubmit(state);

  return (
    <FormContent
      toggleable={toggleable}
      inputs={inputs}
      state={state}
      loading={loading}
      disabled={disabled}
      required={required}
      data={data}
      filtersChangeHandler={filtersChangeHandler}
      onResetHandler={onResetHandler}
      onSubmitHandler={onSubmitHandler}
      services={services}
      dateLimits={dateLimits}
    />
  );
};

export const FormContent = ({
  inputs,
  onSubmitHandler,
  onResetHandler,
  filtersChangeHandler,
  state,
  loading,
  disabled,
  required,
  dateLimits,
  data,
  toggleable,
  services,
  ...props
}) => {
  const [formExpanded, setFormExpanded] = useState(true);
  const formRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    !validateDateInputs(formRef, state) && onSubmitHandler(e);
  };

  return (
    <React.Fragment>
      {toggleable && <ToggleControls formExpanded={formExpanded} setFormExpanded={setFormExpanded} state={state} inputs={inputs} />}
      {formExpanded && (
        <div className="filters">
          <form onSubmit={onSubmit} onReset={onResetHandler} ref={formRef}>
            {inputs.map((fieldSet) => (
              <fieldset className={`k-form-fieldset row ${fieldSet.rowStyle}`}>
                {fieldSet.fieldsetName && <legend className={"k-form-legend"}>{fieldSet.fieldsetName}</legend>}
                {fieldSet.inputGroup.map((inputGroup) => (
                  <React.Fragment>
                    {inputGroup.inputs.map((input) => {
                      return (
                        <div className={`${input.wrapperClassName}`}>
                          <div className="input-group mb-2">
                            {input.inputComponent !== "customDatePicker" && input.inputComponent !== "customDateInput" ? (
                              <CustomInput
                                {...input}
                                validityStyles={false}
                                value={state && state[input.name]}
                                onChange={filtersChangeHandler}
                                data={(data && data[input.dataField]) || []}
                                loading={(loading && loading[input.dataField]) || false}
                                disabled={(disabled && disabled[input.name]) || false}
                                required={input.required || (required && required[input.name]) || false}
                                service={(services && services[input.name]) || null}
                                valid={input.validation && useCallback(checkValidation(props.dataItem, input.validation), [props.dataItem])}
                                validationMessage={input.validation && input.validation.validationMessage}
                              />
                            ) : (
                              <CustomInput
                                {...input}
                                valid={input.validation && useCallback(checkValidation(props.dataItem, input.validation), [props.dataItem])}
                                validityStyles={false}
                                onChange={filtersChangeHandler}
                                value={state && state[input.name]}
                                min={(dateLimits && dateLimits[input.name] && dateLimits[input.name].min) || (state && state[input.min]) || undefined}
                                max={(dateLimits && dateLimits[input.name] && dateLimits[input.name].max) || (state && state[input.max]) || undefined}
                                disabled={(disabled && disabled[input.name]) || false}
                                required={input.required || (required && required[input.name]) || false}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {inputGroup.actions && (
                      <div className={`${inputGroup.actions.wrapperClassName} mb-2 ml-auto`}>
                        <ul className="list-inline list-actions m-0 d-flex">
                          {inputGroup.actions.actions.map((action) => (
                            <li className={`list-inline-item ${action.listItemClass ? action.listItemClass : ""}`}>
                              <Button
                                title={action.title}
                                type={action.type === "upload" ? "button" : action.type === "submit" ? "submit" : "reset"}
                                onClick={action.type === "upload" && props.onUpload.bind(null, formRef)}
                                className={`btn ${action.btnClass}`}
                                icon={action.icon}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </fieldset>
            ))}
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

const ToggleControls = ({ formExpanded, setFormExpanded, state, inputs }) => {
  const toggleState = useMemo(() => {
    const inputInformations = inputs.map((val) => val.inputGroup.map((item) => item.inputs).flat()).flat();
    return inputInformations.map((val) => ({
      wrapperClassName: val.wrapperClassName,
      label: val.label,
      value:
        state[val.name] != null
          ? Array.isArray(state[val.name])
            ? state[val.name].map((v) => v[val.textField])
            : typeof state[val.name] === "object" && !(state[val.name] instanceof Date)
            ? state[val.name][val.textField]
            : state[val.name]
          : state[val.name],
    }));
  }, [state]);

  const actions = [
    {
      type: "popup",
      primaryButton: {
        iconClass: `fas fa-toggle-${formExpanded ? "on" : "off"}`,
        primary: true,
        onClickHandler: setFormExpanded,
      },
      toggleButton: {
        iconClass: "fas fa-list",
        primary: false,
        disabled: formExpanded,
        data: toggleState,
      },
    },
  ];
  return <PageActions actions={actions} />;
};
