import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { useVirtualization } from "../../hooks";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import { CustomButton } from "../../Buttons";
import { ColumnMenu, ExportExcel, ExportPDF, CustomTableCell } from "../Shared";
import { getColumns, columnsWidth, columnsValuePosition } from "../../utils";
import { VirtualGridProps, TableStateInterface } from "../models/VirtualTableGrid.interface";

export const VirtualTableGrid: React.FC<VirtualGridProps> = ({
  params,
  columnsInfo = {},
  pageSize,
  fetchData,
  secondaryActions,
  mainActions,
  customCells,
  onModalOpen,
  idField = "id",
  ...props
}) => {
  // const { stompClient } = useWebSocket("https://vmt-local.ibasis.net/api/v1/rms-customer/ws", "/topic/edit");
  // useEffect(() => {
  //   setTimeout(() => {
  //     stompClient.send(
  //       "/edit",
  //       JSON.stringify({
  //         action: "GET",
  //         page: 0,
  //         size: 20,
  //       }),
  //     );
  //   });
  // }, []);
  const exportExcelRef = useRef();
  const exportPDFRef = useRef();
  const [selectedData, setSelectedData] = useState([]);

  const { data, tableSkip, total, page, setData, pageChange, getSlicedGridData, setParams } = useVirtualization(fetchData, pageSize);
  const [columns, setColumns] = useState(getColumns([], columnsInfo, null));
  const [tableState, setTableState] = useState<TableStateInterface>({
    filter: { logic: "and", filters: [] },
    sort: [],
  });

  const onColumnsSubmit = (columnsState) => {
    setColumns(columnsState);
  };

  const filterChange = (event) => {
    setTableState({
      ...tableState,
      filter: event.filter,
    });
  };

  const itemChangeHandler = async (e) => {
    if (e.value && typeof e.value === "object" && !(e.value instanceof Date)) {
      Object.keys(e.value).forEach((val) => {
        e.dataItem[val] = e.value[val];
      });
    } else {
      e.dataItem[e.field] = e.value;
    }

    setData((prevData) => [...prevData]);
    props.onItemChangeHandler && props.onItemChangeHandler(e, setData);
  };

  const LoadingCell = (tdElement, props) => {
    if (data.length > 15 && props.dataItem[idField] === undefined) {
      return (
        <td>
          {" "}
          <span className="k-placeholder-line"></span>
        </td>
      );
    }
    return tdElement;
  };

  // Selection functions
  const selectionChange = (event) => {
    setSelectedData((prevData) => {
      if (!event.dataItem.selected) {
        return [...prevData, event.dataItem];
      } else {
        return prevData.filter((val) => val[idField] !== event.dataItem[idField]);
      }
    });
    setData((prevData) =>
      prevData.map((item) => {
        if (item[idField] === event.dataItem[idField]) {
          item.selected = !event.dataItem.selected;
        }
        return item;
      })
    );
  };

  const headerSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;
    const updatedData = filterBy(orderBy(data, tableState.sort), tableState.filter).map((item) => {
      item.selected = checked;
      return item;
    });
    setData(updatedData);
  };

  useEffect(() => {
    setParams(params);
  }, [params]);

  return (
    <React.Fragment>
      {/* Export components */}
      {/* <ExportExcel exportExcelRef={exportExcelRef} data={data} columns={columns} tableState={tableState} /> */}
      <ExportPDF exportPDFRef={exportPDFRef} data={data} columns={columns} tableState={tableState} />
      <Grid
        //Syle Propsa
        className="my-4 vh-70"
        rowHeight={25}
        //Table State
        sort={tableState.sort}
        filter={tableState.filter}
        onFilterChange={filterChange}
        onPageChange={pageChange}
        scrollable={"virtual"}
        skip={tableSkip}
        total={total}
        pageSize={pageSize}
        //@ts-ignore
        onDataStateChange={(e) => setTableState(e.dataState)}
        //Table Data
        data={getSlicedGridData(data, tableSkip, pageSize, page)}
        //Table Functionalitues
        reorderable
        resizable
        sortable
        onItemChange={itemChangeHandler}
        onSelectionChange={props.selectable && selectionChange}
        selectedField={props.selectable && "selected"}
        onHeaderSelectionChange={props.selectable && headerSelectionChange}
        //Render Functions
        // rowRender={renderers.rowRender}
        cellRender={LoadingCell}
      >
        <GridToolbar>
          <div className="w-100 bg-neutral-light border-light p-3 d-flex justify-content-between">
            <div>
              {secondaryActions.map((action) => (
                <CustomButton
                  {...action}
                  onClickHandler={
                    action.actionType === "modal"
                      ? onModalOpen.bind(null, {
                          modalData: selectedData,
                          modalOptions: action.modalOptions,
                          modalContent: action.modalContent,
                          modalSubmitAction: action.function,
                        })
                      : action.function
                  }
                  disabled={action.disabledType === "data" ? !data.length : !selectedData.length}
                />
              ))}
            </div>
            <div>
              {mainActions.map((action) => (
                <CustomButton {...action} onClickHandler={action.function} disabled={!action.disabled || !data.length} />
              ))}
            </div>
          </div>
        </GridToolbar>
        {props.selectable && (
          <GridColumn
            locked
            field="selected"
            width="45px"
            headerSelectionValue={data.findIndex((dataItem) => dataItem.selected === false || !dataItem.selected) === -1}
          />
        )}

        {columns.map(
          (columnProps) =>
            columnProps.show && (
              <GridColumn
                field={columnProps.field}
                title={columnProps.title}
                className={columnsValuePosition[columnProps.field] || "text-center"}
                width={columnsWidth[columnProps.field] || 150}
                cell={
                  customCells && columnProps.field in customCells
                    ? useCallback((rest) => {
                        return <CustomTableCell {...rest} options={customCells[columnProps.field]} />;
                      }, [])
                    : undefined
                }
                columnMenu={(props) => <ColumnMenu {...props} columns={columns} onColumnsSubmit={onColumnsSubmit} />}
              />
            )
        )}
      </Grid>
    </React.Fragment>
  );
};
