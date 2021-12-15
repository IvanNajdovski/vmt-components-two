import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { GridColumnMenuFilter, GridColumnMenuItemContent } from "@progress/kendo-react-grid";
import { ColumnMenuNumericFilter } from "./ColumnMenuFilters";

export const ColumnMenu = (props) => {
  const [columns, setColumns] = useState(props.columns);

  const onToggleColumn = (id) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column, idx) => {
        return idx === id ? { ...column, show: !column.show } : column;
      });
    });
  };

  const onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    props.onColumnsSubmit(columns);
    if (props.onCloseMenu) {
      props.onCloseMenu();
    }
  };

  const onReset = (event) => {
    event.preventDefault();
    const allColumns = props.columns.map((col) => {
      return {
        ...col,
        show: true,
      };
    });
    setColumns(allColumns);
    props.onColumnsSubmit(allColumns);
    props.onCloseMenu();
  };

  const oneVisibleColumn = columns && columns.filter((c) => c.show).length === 1;

  return (
    <React.Fragment>
      <GridColumnMenuItemContent show={true}>
        <div className={"k-column-list-wrapper"}>
          <form onSubmit={onSubmit} onReset={onReset}>
            <div className={"k-column-list"}>
              {columns &&
                columns.map((column, idx) => (
                  <div key={idx} className={"k-column-list-item"}>
                    <input
                      data-testid={column}
                      id={`column-visiblity-show-${idx}`}
                      className="k-checkbox"
                      type="checkbox"
                      readOnly={true}
                      disabled={column.show && oneVisibleColumn}
                      checked={column.show}
                      onClick={() => {
                        onToggleColumn(idx);
                      }}
                    />
                    <label htmlFor={`column-visiblity-show-${idx}`} className="k-checkbox-label" style={{ userSelect: "none" }}>
                      {column.title}
                    </label>
                  </div>
                ))}
            </div>
            <div className={"k-columnmenu-actions"}>
              <Button type={"reset"} className={"k-button"}>
                Reset
              </Button>
              <Button className={"k-button k-primary"}>Save</Button>
            </div>
          </form>
        </div>
      </GridColumnMenuItemContent>
      {console.log(props)}
      <GridColumnMenuFilter {...props} filterUI={props.column.filter === "numeric" && ColumnMenuNumericFilter} />
    </React.Fragment>
  );
};
