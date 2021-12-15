import React, { useState } from "react";
import { CustomButton, SimpleButton } from "../../../Buttons";
import { NotificationItem, InvalidRecordsNotification } from "../../../Alerts";
import { ExportExcel } from "..";
import { disableGridAction, gridModalData, createNewRecord, validateInputs, gridScroll } from "../../../utils";
interface TableGridToolbarContentInterface {
  exportData?: any;
  tableData: any[];
  setTableData: any;
  tableGridRef?: any;
  columns: any;
  secondaryActions?: any;
  mainActions?: any;
  onModalOpen: any;
  newRecord?: any;
  setNewRecord?: any;
  createRecord?: any;
  copyRecord?: boolean;
  idField: string;
  tableState: any;
  onSaveHandler?: any;
  editedRecords?: { editedRecordsLength: number; invalidRecords: any };
}
export const TableGridToolbarContent: React.FC<TableGridToolbarContentInterface> = ({
  exportData,
  tableData,
  setTableData,
  tableGridRef,
  columns,
  secondaryActions,
  mainActions,
  onSaveHandler,
  onModalOpen,
  newRecord,
  setNewRecord,
  createRecord = false,
  copyRecord = false,
  idField,
  tableState,
  editedRecords,
}) => {
  const [loading, setLoading] = useState(false);

  const copyNewRecordHandler = () =>
    setNewRecord(
      createNewRecord(
        tableData.find((val) => val.selected),
        idField,
        "copy"
      )
    );
  const setNewRecordHandler = () => setNewRecord(createNewRecord(createRecord, idField, "new"));

  const discardNewRecordHandler = () => setNewRecord(null);

  const saveNewRecordHandler = async () => {
    validateInputs(tableGridRef.current._header.element) && setLoading(true);

    if (validateInputs(tableGridRef.current._header.element)) {
      if (onSaveHandler) {
        await onSaveHandler(newRecord);
      }

      setTableData((prevData) => [createNewRecord(newRecord, idField, "save")].concat(prevData));
      setLoading(false);
      setNewRecord(null);
    }
  };

  return (
    <div className="w-100 bg-neutral-light border-light p-3 d-flex justify-content-between align-items-center">
      {newRecord && createRecord ? (
        <React.Fragment>
          <div className="d-flex">
            <SimpleButton
              data-testid="remove"
              btnType=""
              iconClass="fa far fa-times-circle"
              type="button"
              label="Remove Draft"
              className="btn-outline-neutral"
              onClickHandler={discardNewRecordHandler}
            />
          </div>
          <div className={"d-flex flex-fill justify-content-end"}>
            <SimpleButton
              data-testid="saveNew"
              btnType=""
              iconClass="fa far fa-save"
              type="button"
              label="Save New"
              loading={loading}
              className="btn-primary"
              onClickHandler={saveNewRecordHandler}
            />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="d-flex">
            {exportData && <ExportExcel exportData={exportData} data={tableData} columns={columns} tableState={tableState} />}
            {createRecord && (
              <SimpleButton
                data-testid="addNew"
                disabled={false}
                btnType=""
                iconClass="fa far fa-plus"
                type="button"
                label="Add New"
                onClickHandler={setNewRecordHandler}
                className="mr-2 btn-outline-neutral"
              />
            )}
            {copyRecord && (
              <SimpleButton
                data-testid="copy"
                disabled={!disableGridAction(tableData, "selectedOne")}
                btnType=""
                iconClass="fa fas fa-copy"
                type="button"
                label="Copy"
                onClickHandler={copyNewRecordHandler}
                className="mr-2 btn-outline-neutral"
              />
            )}
            {secondaryActions &&
              secondaryActions.map(({ title, ...action }) => {
                const isDisabled = !disableGridAction(tableData, action.disabledType);
                return (
                  <div className={"d-flex align-items-center"} title={isDisabled ? title : ""}>
                    <CustomButton
                      {...action}
                      onClickHandler={
                        action.actionType === "modal"
                          ? onModalOpen.bind(null, {
                              modalData: gridModalData(
                                tableData.map((val) => ({ ...val })),
                                action.modalDataType
                              ),
                              modalOptions: action.modalOptions,
                              modalContent: {
                                ...action.modalContent,
                                data: action.data,
                              },
                              modalSubmitAction: action.function.bind(null, setTableData, tableData),
                            })
                          : action.function.bind(
                              null,
                              setTableData,
                              tableData.filter((val) => val.selected)
                            )
                      }
                      disabled={action.hasOwnProperty("disabled") ? action.disabled : isDisabled}
                    />
                  </div>
                );
              })}
          </div>
          <div className={"d-flex flex-fill justify-content-end"}>
            <div>
              {editedRecords && editedRecords.invalidRecords && !!editedRecords.invalidRecords.length && (
                <InvalidRecordsNotification invalidRecords={editedRecords.invalidRecords} />
              )}
              {editedRecords && !!editedRecords.editedRecordsLength && <NotificationItem editedRecords={editedRecords.editedRecordsLength} />}
            </div>
            {mainActions &&
              mainActions.map((action) => (
                <CustomButton
                  {...action}
                  onClickHandler={
                    action.actionType === "gridAction" ? action.function.bind(null, tableData, tableGridRef) : action.function.bind(null, tableData)
                  }
                  disabled={
                    action.hasOwnProperty("disabled")
                      ? action.disabled
                      : action.disabledType === "finalize"
                      ? (editedRecords && editedRecords.invalidRecords.length) || !disableGridAction(tableData, action.disabledType)
                      : !disableGridAction(tableData, action.disabledType)
                  }
                />
              ))}
          </div>
        </React.Fragment>
      )}
      <div className="ml-4">
        <SimpleButton
          data-testid="gridScrollLeft"
          btnType=""
          iconClass="fa fas fa-chevron-left"
          type="button"
          title="Scroll Left"
          label=""
          className="mr-2 btn btn-sm btn-outline-neutral"
          onClickHandler={gridScroll.bind(null, tableGridRef, "left")}
        />
        <SimpleButton
          data-testid="gridScrollRight"
          btnType=""
          iconClass="fa fas fa-chevron-right"
          type="button"
          title="Scroll Right"
          label=""
          className="btn btn-sm btn-outline-neutral"
          onClickHandler={gridScroll.bind(null, tableGridRef, "right")}
        />
      </div>
    </div>
  );
};
