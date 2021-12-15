import React, { useState, useLayoutEffect, useCallback, useRef } from "react";
import { useColumns } from "../../hooks/updateColumns-hook";
import { Grid, GridColumn, GridToolbar, GridColumnMenuFilter, GridHeaderCell } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { NavigationBlocker } from "../../Alerts";
import { TableSpinner } from "../../Spinners";
import {
  ColumnMenu,
  TableGridToolbarContent,
  CustomTableCell,
  CustomFilterCell,
  ClearFilterCell,
  VirtualPager,
  GridLegend,
  filterOperators,
} from "../Shared";
import {
  getBgOverride,
  updateDateData,
  moveGrid,
  moveGridOnColumnReorder,
  setGridFilterIndicators,
  getUpdateEventValue,
  checkValidation,
  valueFormat,
} from "../../utils";
import { FloorVirtualGridProps, TableStateInterface } from "../models/VirtualTableGrid.interface";

const initialTableState: TableStateInterface = {
  filter: null /*{ logic: "and", filters: [] }*/,
  sort: [],
};
export const VirtualTableGrid: React.FC<FloorVirtualGridProps> = ({
  idField = "id",
  selectableField = "selected",
  selectable,
  onSelect,
  gridName,
  hasEditedRecords,
  tableStateSort,
  columnsInfo,
  secondaryActions,
  mainActions,
  filterCells,
  customCells,
  onModalOpen,
  loadingGrid,
  exportData,
  tableDataSet,
  columnsLock,
  noColumnsWidth,
  onSaveEdited,
  rowRender,
  gridLegend,
  dense,
  filterConditions,
  ...props
}) => {
  const tableGridRef = useRef();
  const [defaultSort, setDefaultSort] = useState(true);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [tableSkip, setTableSkip] = useState(0);
  const [tableData, setTableData] = useState(tableDataSet);
  const [tableState, setTableState] = useState<TableStateInterface>(
    tableStateSort && tableStateSort.length ? { ...initialTableState, sort: [...initialTableState.sort, ...tableStateSort] } : initialTableState
  );
  const { columns, onColumnReorderHandler, onColumnResizeHandler, onColumnsToggleHandler } = useColumns(columnsInfo, gridName);

  useLayoutEffect(() => {
    setTableData(tableDataSet.map(updateDateData));
    moveGrid(tableGridRef);
  }, [tableDataSet]);

  useLayoutEffect(() => {
    const { data } = process(tableData, tableState);
    const filteredData = filterConditions ? data.filter((item) => checkValidation(item, { validationRules: filterConditions })) : data;
    setTotal(filteredData.length);
    setData(filteredData);
  }, [tableData, tableState, filterConditions]);

  useLayoutEffect(() => {
    setGridFilterIndicators(tableGridRef);
    moveGridOnColumnReorder(tableGridRef, 200);
  }, []);

  const pageChange = (event) => setTableSkip(event.page.skip);

  const onDataStateChangeHandler = (e) => setTableState((prevData) => ({ filter: e.dataState.filter, sort: e.dataState.sort }));

  const sortChangeHandler = (e) => {
    setDefaultSort(false);
    setTableState((prevData) => {
      if (defaultSort) {
        const sortObject = e.sort.find((val) => {
          const sortObj = prevData.sort.find((item) => item.field === val.field);
          return !sortObj || sortObj.dir !== val.dir;
        });
        return { ...prevData, sort: [sortObject] };
      } else {
        return { ...prevData, sort: e.sort };
      }
    });
  };

  const filterChangeHandler = (e) => setTableState((prevData) => ({ ...prevData, filter: e.filter }));

  const resetFilterSort = () => {
    setDefaultSort(true);
    setTableState((prevData) => ({ ...prevData, filter: initialTableState.filter, sort: tableStateSort }));
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
  };

  const headerSelectionChange = (e) => {
    const checked = e.syntheticEvent.target.checked;
    setData((prevData) =>
      prevData.map((item) => {
        //@ts-ignore
        item[selectableField] = checked;
        return item;
      })
    );
  };

  const itemChangeHandler = async (e) => {
    const value = getUpdateEventValue(e);
    const itemToUpdate = { ...e.dataItem, ...value };
    setTableData((prevData) => prevData.map((item) => (item[idField] === e.dataItem[idField] ? itemToUpdate : item)));
  };

  //Custom Cells
  const CustomCell = useCallback(
    ({ className, style, ...rest }) => (
      <td
        className={`${className} ${
          customCells[rest.field] && customCells[rest.field].bgOverride ? getBgOverride(customCells[rest.field].bgOverride, rest.dataItem) : ""
        }`}
        style={rest.style}
      >
        <CustomTableCell {...rest} options={customCells[rest.field]} />
      </td>
    ),
    [customCells]
  );

  const customFilterCell = useCallback(
    (rest) => (
      <div className={"p-2"}>
        <CustomFilterCell
          {...rest}
          operator={filterCells && filterCells[rest.field] ? filterCells[rest.field].filter : "contains"}
          options={(filterCells && filterCells[rest.field]) || { type: rest.filterType }}
        />
      </div>
    ),
    [filterCells]
  );
  //Column events update functions
  const additionalColumnProps = (field) => isFilterActive(field, tableState) && { headerClassName: "filter-active" };

  const isFilterActive = (field, tableState) => GridColumnMenuFilter.active(field, tableState.filter);

  const virtualPager = useCallback((rest) => <VirtualPager skip={0} buttonCount={0} take={rest.total} total={rest.total} info={true} />, []);

  return (
    <React.Fragment>
      {props.prompt && <NavigationBlocker blocked={hasEditedRecords} message={props.prompt} />}
      {loadingGrid && <TableSpinner />}
      <Grid
        //Syle Props
        ref={tableGridRef}
        className={`mt-4 ${dense ? "dense" : ""}`}
        style={{ height: "90vh" }}
        rowHeight={dense ? 36 : 48}
        //Table State
        pageable
        sort={tableState.sort}
        filter={tableState.filter}
        onPageChange={pageChange}
        scrollable={"virtual"}
        total={total}
        skip={tableSkip}
        pageSize={30}
        //Table Data
        onDataStateChange={onDataStateChangeHandler}
        onSortChange={sortChangeHandler}
        onFilterChange={filterChangeHandler}
        data={data.slice(tableSkip, tableSkip + 30)}
        //Table Functionalitues
        filterable
        filterOperators={filterOperators}
        reorderable
        resizable
        sortable={{ allowUnsort: true, mode: "multiple" }}
        onColumnResize={onColumnResizeHandler}
        onColumnReorder={onColumnReorderHandler}
        onItemChange={props.onItemChangeHandler ? props.onItemChangeHandler.bind(null, setTableData, tableData) : itemChangeHandler}
        onSelectionChange={selectable && selectionChange}
        selectedField={selectable && selectableField}
        onHeaderSelectionChange={selectable && headerSelectionChange}
        //Render Functions
        rowRender={rowRender && rowRender}
        pager={virtualPager}
      >
        <GridToolbar>
          <TableGridToolbarContent
            tableGridRef={tableGridRef}
            exportData={exportData}
            tableData={tableData}
            tableState={tableState}
            setTableData={setTableData}
            columns={columns}
            secondaryActions={secondaryActions}
            mainActions={mainActions}
            onModalOpen={onModalOpen}
            idField={idField}
          />
        </GridToolbar>
        <GridColumn
          locked
          field={selectable ? selectableField : ""}
          className={"align-middle text-center"}
          width="45px"
          headerSelectionValue={
            tableData.length && tableData.findIndex((dataItem) => dataItem[selectableField] === false || !dataItem[selectableField]) === -1
          }
          filterCell={() => <ClearFilterCell filter={tableState.filter} defaultSort={defaultSort} resetFilters={resetFilterSort} />}
        />
        {columns.map(
          (columnProps) =>
            columnProps.show && (
              <GridColumn
                filter={columnProps.filter}
                {...columnProps}
                {...additionalColumnProps(columnProps.field)}
                width={columnProps.width ? columnProps.width : noColumnsWidth ? undefined : 100}
                locked={(columnsLock && columnsLock[columnProps.field]) || undefined}
                cell={customCells && customCells.hasOwnProperty(columnProps.field) ? CustomCell : undefined}
                columnMenu={(props) => <ColumnMenu {...props} columns={columns} onColumnsSubmit={onColumnsToggleHandler} />}
                headerCell={(rest) => (
                  <div className={"mr-3 k-link"} title={columnProps.title}>
                    <GridHeaderCell {...rest} />
                  </div>
                )}
                filterCell={customFilterCell}
              />
            )
        )}
      </Grid>
      {gridLegend && <GridLegend legend={gridLegend} tableGridRef={tableGridRef} />}
    </React.Fragment>
  );
};
