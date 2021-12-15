//@ts-nocheck
import { useState, useCallback } from "react";
import { getColumns } from "../utils";

export const useColumns = (columnsInfo, gridName) => {
  const savedColumns = (localStorage.getItem("test-user-columns") && JSON.parse(localStorage.getItem("test-user-columns"))) || {};
  const [columns, setColumns] = useState(getColumns([], columnsInfo, savedColumns && savedColumns[gridName]));
  const onPersistendSaveColumns = (columns) => {
    if (!gridName) return;
    savedColumns[gridName] = columns.filter((val) => val.field !== "selected");
    localStorage.setItem("test-user-columns", JSON.stringify(savedColumns));
  };

  const onColumnsToggleHandler = useCallback((columns) => {
    onPersistendSaveColumns(columns);
    setColumns(columns);
  }, []);

  const onColumnReorderHandler = useCallback((e) => {
    onPersistendSaveColumns(e.columns);
    setColumns(
      e.columns
        .filter((val) => val.field !== "selected")
        .map((val) => ({
          field: val.field,
          title: val.title,
          width: val.width,
          orderIndex: val.orderIndex,
          show: val.show,
          className: val.className,
          format: val.format,
        }))
    );
  }, []);

  const onColumnResizeHandler = useCallback((e) => {
    if (e.end) {
      setColumns((columns) => {
        const updatedColumns = columns.map((column, index) => (e.index - 1 !== index ? column : { ...column, width: e.newWidth }));
        onPersistendSaveColumns(updatedColumns);
        return updatedColumns;
      });
    }
  }, []);

  return { columns, onColumnsToggleHandler, onColumnReorderHandler, onColumnResizeHandler };
};
