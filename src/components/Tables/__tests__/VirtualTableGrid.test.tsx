import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId, getByText } from "@testing-library/react";
import { VirtualTableGrid } from "../VirtualTableGrid/VirtualTableGrid";
import actions from "./actions.json";
import columns from "./columns.json";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({
    url: "/url",
    location: {
      pathname: "/path",
    },
  }),
}));

jest.mock("react-dom", () => {
  return {
    //@ts-ignore
    ...jest.requireActual("react-dom"),
    createPortal: (element, target) => {
      return element;
    },
  };
});

it("renders VirtualTableGrid component", () => {
  const { container } = render(
    <VirtualTableGrid
      onItemChangeHandler={jest.fn}
      selectable={true}
      onModalOpen={jest.fn}
      tableDataSet={["1", "2"]}
      columnsInfo={columns.columnsInfo}
      idField={"rowNumber"}
      customCells={columns.customCells}
      modalColumnsInfo={[]}
      modalCustomCells={[]}
      fetchData={jest.fn}
      startFetching={false}
      pageSize={1}
      params={[]}
      exportData={{ data: "data" }}
      secondaryActions={[{ ...actions.secondaryActions.clearChanges, function: jest.fn }]}
      mainActions={[{ ...actions.mainActions.customerRmsFinalize, loading: false, function: jest.fn }]}
    />
  );

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
