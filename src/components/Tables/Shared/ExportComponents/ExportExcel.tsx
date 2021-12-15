import React, { useState, useEffect, useRef } from "react";
import { process } from "@progress/kendo-data-query";
import { useModal } from "../../../hooks";
import { useRouteMatch } from "react-router-dom";
import { Modal, ModalContent } from "../../../Dialogs";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
import { CustomButton } from "../../../Buttons";
import { columnsWidth, updateDateData, exportFormat } from "../../../utils";

const ExportExcel = (props) => {
  const exportExcelRef = useRef();
  const [exportData, setExportData] = useState(props.data);
  const {
    modalData,
    modalOpen,
    modalOptions,
    modalContentOptions,
    modalSumbitLoading,
    onModalOpen,
    onModalClose,
    onModalSubmit,
    setModalData,
    formRef,
  } = useModal(false);

  const { url } = useRouteMatch();
  const [exportOptions, setExportOptions] = useState(null);
  const exportTitleName = url.split("/");
  exportTitleName.splice(0, 2);

  useEffect(() => {
    if (modalData && modalData.options) {
      setExportOptions(modalData.options);
    }
  }, [modalData]);

  useEffect(() => {
    setExportData(props.data);
  }, [props.data]);

  const onFetchExport = async (fetchFn, additionalActions) => {
    try {
      const data = await fetchFn(additionalActions);
      setExportData(data.data.content.map(updateDateData));
      setTimeout(() => {
        //@ts-ignore
        exportExcelRef.current && exportExcelRef.current.save();
      }, 500);
      setTimeout(() => {
        setExportData(props.data);
        setExportOptions(null);
      }, 600);
    } catch {}
  };

  const onExportGrid = () => {
    //@ts-ignore
    exportExcelRef.current && exportExcelRef.current.save();
  };

  const onModalSubmitHandler = async (modalState) => {
    if (modalState.options.getDataFunction) {
      await onFetchExport(modalState.options.getDataFunction, { currencyId: modalState.currency.currencyId });
    } else {
      onExportGrid();
    }
  };
  const { data } = process(exportData, { filter: props.tableState.filter, sort: props.tableState.sort });
  return (
    <React.Fragment>
      <CustomButton
        disabled={!exportData.length}
        onClickHandler={
          props.exportData && props.exportData.data.length
            ? onModalOpen.bind(null, {
                modalData: props.exportData.data[0],
                modalOptions: props.exportData.modalOptions,
                modalContent: { ...props.exportData.modalContent, data: props.exportData.data },
                modalSubmitAction: onModalSubmitHandler,
              })
            : onExportGrid
        }
        iconClass={"fa fas fa-download"}
        className={"mr-2 btn-outline-neutral"}
        label={"Export"}
      />
      <ExcelExport fileName={`${exportTitleName.join("_")}_${new Date().toUTCString()}.xlsx`} data={data} ref={exportExcelRef}>
        {props.columns &&
          ((exportOptions && exportOptions.columns) || props.columns)
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((val) => {
              return (
                ((exportOptions && exportOptions.exportHidden) || val.show) && (
                  <ExcelExportColumn
                    key={val.field}
                    field={val.field}
                    title={val.title}
                    width={columnsWidth[val.field] || 200}
                    cellOptions={{ format: val.exportFormat || exportFormat[val.field] || "general" }}
                  />
                )
              );
            })}
      </ExcelExport>
      <Modal {...modalOptions} submitLoading={modalSumbitLoading} visible={modalOpen} onModalClose={onModalClose} onContinue={onModalSubmit}>
        <ModalContent {...modalContentOptions} onChangeModalData={setModalData} modalData={modalData} formRef={formRef} />
      </Modal>
    </React.Fragment>
  );
};
export default ExportExcel;
