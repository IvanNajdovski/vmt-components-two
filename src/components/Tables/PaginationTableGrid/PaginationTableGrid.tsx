import React, { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import { useColumns } from "../../hooks/updateColumns-hook";
import { Grid, GridColumn, GridToolbar, GridFilterCell, GridColumnMenuFilter, GridHeaderCell } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { TableSpinner } from "../../Spinners";
import { NavigationBlocker } from "../../Alerts";
import {
  compareObjectValues,
  getBgOverride,
  checkValidation,
  updateDateData,
  moveGrid,
  moveGridOnColumnReorder,
  setGridFilterIndicators,
  getUpdateEventValue,
  valueFormat,
} from "../../utils";
import {
  ColumnMenu,
  TableGridToolbarContent,
  CustomTableCell,
  CustomFilterCell,
  ClearFilterCell,
  IconCell,
  VirtualPager,
  GridLegend,
  filterOperators,
} from "../Shared";
import { TableStateInterface, PaginationGridProps } from "../models/PaginationGridProps.interface";

const initialTableState: TableStateInterface = {
  filter: null /*{ logic: "and", filters: [] }*/,
  sort: [],
  skip: 0,
  take: 100,
};

export const PaginationTableGrid: React.FC<PaginationGridProps> = ({
  idField = "id",
  selectableField = "selected",
  selectable,
  gridName,
  tableStateSort,
  columnsInfo,
  columnsLock,
  filterCells,
  customCells,
  inAddCells,
  mainActions,
  secondaryActions,
  onSaveHandler,
  onModalOpen,
  loadingGrid,
  tableDataSet,
  createRecord,
  copyRecord,
  exportData,
  noColumnsWidth,
  rowRender,
  gridTooltip,
  validationRules,
  gridLegend,
  onSelectChangeHandler,
  onHeaderSelectionChangeHandler,
  dense,
  ...props
}) => {
  const tableGridRef = useRef();
  const [defaultSort, setDefaultSort] = useState(true);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [editedRecords, setEditedRecords] = useState({ editedRecordsLength: 0, invalidRecords: [] });
  const [newRecord, setNewRecord] = useState(null);
  const [tableData, setTableData] = useState(tableDataSet);
  const [tableState, setTableState] = useState(
    tableStateSort && tableStateSort.length ? { ...initialTableState, sort: [...initialTableState.sort, ...tableStateSort] } : initialTableState
  );
  const { columns, onColumnReorderHandler, onColumnResizeHandler, onColumnsToggleHandler } = useColumns(columnsInfo, gridName);

  useLayoutEffect(() => {
    setTableData(tableDataSet.map(updateDateData));
    moveGrid(tableGridRef);
  }, [tableDataSet]);

  useLayoutEffect(() => {
    const { total, data } = process(tableData, tableState);
    setTotal(total);
    setData(data);
  }, [tableData, tableState]);

  useLayoutEffect(() => {
    setGridFilterIndicators(tableGridRef);
    moveGridOnColumnReorder(tableGridRef, 200);
  }, []);

  useEffect(() => {
    const editedRecords = tableData.filter((el) => el.draft);
    const invalidRecords = [];
    if (validationRules) {
      invalidRecords.push.apply(
        invalidRecords,
        editedRecords.filter((record) => Object.values(validationRules).some((validation) => !checkValidation(record, validation)))
      );
    }
    setEditedRecords({ editedRecordsLength: editedRecords.length, invalidRecords });
  }, [tableData]);

  const onDataStateChangeHandler = (e) => setTableState((prevData) => ({ ...prevData, ...e.dataState /* skip: prevData.skip*/ }));

  const sortChangeHandler = (e) => {
    setDefaultSort(false);
    setTableState((prevData) => {
      let sort = e.sort;
      if (defaultSort) {
        sort = e.sort.filter((val) => {
          const sortObj = prevData.sort.find((item) => item.field === val.field);
          return !sortObj || sortObj.dir !== val.dir;
        });
      }
      return { ...prevData, sort };
    });
  };

  const filterChangeHandler = (e) => setTableState((prevData) => ({ ...prevData, filter: e.filter }));

  const resetFilterSort = () => {
    setDefaultSort(true);
    setTableState((prevData) => ({ ...prevData, filter: initialTableState.filter, sort: [...tableStateSort] }));
  };

  // Selection functions
  const selectionChange = (e) => {
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item[idField] === e.dataItem[idField]) {
          item[selectableField] = !e.dataItem[selectableField];
        }
        return item;
      })
    );
    onSelectChangeHandler && onSelectChangeHandler(e);
  };

  const headerSelectionChange = (e) => {
    const checked = e.syntheticEvent.target.checked;
    setData((prevData) =>
      prevData.map((item) => {
        item[selectableField] = checked;
        return item;
      })
    );
    onHeaderSelectionChangeHandler && onHeaderSelectionChangeHandler(e);
  };

  const itemChangeHandler = async (e) => {
    //This is checking for record id if not it will exit the function;
    //We will need to remove it in the later stages
    if (!e.dataItem[idField]) return;
    const value = getUpdateEventValue(e);

    setTableData((prevData) =>
      prevData.map((item) => {
        if (item[idField] === e.dataItem[idField]) {
          const originalItem = tableDataSet.find((val) => e.dataItem[idField] === val[idField]);
          const draft = (item.draft && item.updateType === "create") || compareObjectValues(originalItem, { ...item, ...value });
          return {
            ...item,
            ...value,
            updateType: draft ? (item.updateType ? item.updateType : "update") : undefined,
            draft,
          };
        } else return item;
      })
    );
  };

  const onUpdateNewRecord = (e) => setNewRecord((prevData) => ({ ...prevData, ...getUpdateEventValue(e) }));

  //Custom Cells
  const CustomCell = useCallback(
    ({ className, style, ...rest }) => (
      <td
        title={customCells[rest.field] && !rest.dataItem[rest.field] && customCells[rest.field].title}
        className={`${className} ${
          customCells[rest.field] && customCells[rest.field].bgOverride ? getBgOverride(customCells[rest.field].bgOverride, rest.dataItem) : ""
        }`}
        style={style}
      >
        <CustomTableCell {...rest} options={customCells[rest.field] || {}} />
      </td>
    ),
    [customCells]
  );

  const customFilterCell = useCallback(
    (rest) => (
      <React.Fragment>
        <div className={"p-2"} style={{ minHeight: "52px" }}>
          <CustomFilterCell
            {...rest}
            operator={filterCells && filterCells[rest.field] ? filterCells[rest.field].filter : "contains"}
            options={(filterCells && filterCells[rest.field]) || { type: rest.filterType }}
          />
        </div>
        {newRecord && (
          <div
            className={"p-2 d-flex justify-content-center align-items-center bg-white border-top"}
            style={{ minHeight: "52px" }}
            title={inAddCells[rest.field] && inAddCells[rest.field].title}
          >
            {inAddCells && inAddCells[rest.field] && (
              <CustomTableCell
                {...rest}
                onChange={props.onUpdateNewRecordHandler ? props.onUpdateNewRecordHandler.bind(null, setNewRecord, tableData) : onUpdateNewRecord}
                dataItem={newRecord}
                options={inAddCells[rest.field]}
              />
            )}
          </div>
        )}
      </React.Fragment>
    ),
    [newRecord, inAddCells, filterCells]
  );

  const additionalColumnProps = (field) => isFilterActive(field, tableState) && { headerClassName: "filter-active" };

  const isFilterActive = (field, tableState) => GridColumnMenuFilter.active(field, tableState.filter);

  return (
    <React.Fragment>
      {props.prompt && <NavigationBlocker blocked={editedRecords.editedRecordsLength} message={props.prompt} />}
      {loadingGrid && <TableSpinner />}
      <Grid
        //Syle Props

        ref={tableGridRef}
        className={`mt-4 ${dense ? "dense" : ""}`}
        rowHeight={dense ? 36 : 48}
        //Table State
        {...tableState}
        filterable
        filterOperators={filterOperators}
        reorderable
        resizable
        sortable={{ allowUnsort: true, mode: "multiple" }}
        pageable={{ buttonCount: 6, pageSizes: [20, 50, 100, 200] }}
        pageSize={20}
        data={data}
        total={total}
        //Table Data
        onDataStateChange={onDataStateChangeHandler}
        onSortChange={sortChangeHandler}
        onFilterChange={filterChangeHandler}
        onColumnResize={onColumnResizeHandler}
        onColumnReorder={onColumnReorderHandler}
        onItemChange={props.onItemChangeHandler ? props.onItemChangeHandler.bind(null, setTableData, tableData) : itemChangeHandler}
        selectedField={selectable && selectableField}
        onSelectionChange={selectable && selectionChange}
        onHeaderSelectionChange={selectable && headerSelectionChange}
        rowRender={rowRender && rowRender}
        pager={VirtualPager}
      >
        <GridToolbar>
          {gridTooltip ? (
            gridTooltip
          ) : (
            <TableGridToolbarContent
              editedRecords={editedRecords}
              createRecord={createRecord}
              copyRecord={copyRecord}
              newRecord={newRecord}
              setNewRecord={setNewRecord}
              exportData={exportData}
              tableGridRef={tableGridRef}
              tableData={tableData}
              tableState={tableState}
              setTableData={setTableData}
              columns={columns}
              secondaryActions={secondaryActions}
              mainActions={mainActions}
              onSaveHandler={onSaveHandler}
              onModalOpen={onModalOpen}
              idField={idField}
            />
          )}
        </GridToolbar>
        <GridColumn
          locked
          field={selectable ? selectableField : ""}
          width="45px"
          headerSelectionValue={
            tableData.length && tableData.findIndex((dataItem) => dataItem[selectableField] === false || !dataItem[selectableField]) === -1
          }
          filterCell={() => (
            <React.Fragment>
              <ClearFilterCell filter={tableState.filter} defaultSort={defaultSort} resetFilters={resetFilterSort} />
              {newRecord && <IconCell options={{ icon: "k-i-plus", styleClass: "border-top bg-white" }} />}
            </React.Fragment>
          )}
        />
        {columns.map(
          (columnProps, index, arr) =>
            columnProps.show && (
              <GridColumn
                {...columnProps}
                {...additionalColumnProps(columnProps.field)}
                filterCell={customFilterCell}
                filter={columnProps.filter}
                width={noColumnsWidth ? undefined : columnProps.width ? columnProps.width : 200}
                locked={(columnsLock && columnsLock[columnProps.field]) || undefined}
                cell={customCells && customCells.hasOwnProperty(columnProps.field) ? CustomCell : undefined}
                columnMenu={(props) => <ColumnMenu {...props} columns={arr} onColumnsSubmit={onColumnsToggleHandler} />}
                headerCell={(rest) => (
                  <div className={"mr-3 k-link"} title={columnProps.title}>
                    <GridHeaderCell {...rest} />
                  </div>
                )}
              />
            )
        )}
      </Grid>
      {gridLegend && <GridLegend legend={gridLegend} tableGridRef={tableGridRef} />}
    </React.Fragment>
  );
};
