import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "./ColumnMenu";
import { process } from "@progress/kendo-data-query";

interface TableProps {
  tableData: any[];
  columns: any[];
  paginable: boolean;
  pagingConfig: {};
  clickableField: any;
  fieldClickEvent: any;
}

interface IUseState {
  items: any[];
  result: any;
  dataState: {};
}

export const TableResults: React.FC<TableProps> = (props) => {
  const { tableData = [], columns, paginable, pagingConfig, clickableField, fieldClickEvent } = props;

  const [{ items, result, dataState }, setState] = useState<IUseState>({
    items: tableData.map((dataItem) => Object.assign({ selected: false }, dataItem)),
    result: [],
    dataState: pagingConfig,
  });

  let lastSelectedIndex = 0;

  useEffect(() => {
    setState((curentState) => ({
      ...curentState,
      ...createDataState(dataState),
    }));
  }, []);

  const selectionChange = (event) => {
    const data = items.map((item) => {
      if (item.ID === event.dataItem.ID) {
        item.selected = !event.dataItem.selected;
      }

      return item;
    });

    setState((curentState) => ({
      ...curentState,
      items: data,
    }));
  };

  const rowClick = (event) => {
    let last = lastSelectedIndex;
    const data = [...items];
    const current = data.findIndex((dataItem) => dataItem === event.dataItem);

    if (!event.nativeEvent.shiftKey) {
      lastSelectedIndex = last = current;
    }

    if (!event.nativeEvent.ctrlKey) {
      data.forEach((item) => (item.selected = false));
    }

    const select = !event.dataItem.selected;

    for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
      data[i].selected = select;
    }

    setState((curentState) => ({
      ...curentState,
      items: data,
    }));
  };

  const headerSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;

    const data = items.map((item) => {
      item.selected = checked;
      return item;
    });

    setState((curentState) => ({
      ...curentState,
      items: data,
    }));
  };

  const createDataState = (dataState) => {
    return {
      result: process(items.slice(0), dataState),
      dataState: dataState,
    };
  };

  const dataStateChange = (event) => {
    setState((curentState) => ({
      ...curentState,
      ...createDataState(event.dataState),
    }));
  };

  return (
    <Grid
      className="table-results"
      data={result}
      {...dataState}
      total={items.length}
      pageable={paginable}
      selectedField="selected"
      onSelectionChange={selectionChange}
      onHeaderSelectionChange={headerSelectionChange}
      onDataStateChange={dataStateChange}
      onRowClick={rowClick}
      sortable={true}
    >
      <Column
        field="selected"
        className="table-column"
        filterable
        headerSelectionValue={items.findIndex((dataItem) => dataItem.selected === false) === -1}
      />
      {columns.map((column) => (
        <Column
          field={column.field}
          title={column.title}
          width={column.width}
          columnMenu={ColumnMenu}
          cell={
            column.field === clickableField
              ? (props) => {
                  return (
                    <td className="clickable-field" onClick={() => fieldClickEvent(props.dataItem)}>
                      {props.dataItem[clickableField]}
                    </td>
                  );
                }
              : null
          }
        />
      ))}
    </Grid>
  );
};
