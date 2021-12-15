import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { VirtualTableGrid } from "../VirtualTableGrid/Legasy-VirtualTableGrid";
import actions from "./actions.json";
import columns from "./columns.json";

const info = columns.columnsInfo;

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "/path",
    },
  }),
  useRouteMatch: () => ({
    url: "/url",
    location: {
      pathname: "/path",
    },
  }),
  useLocation: () => ({
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

const customCell = {
  field: "field",
};

it("renders Legasy-VirtualTableGrid component", () => {
  const { container } = render(
    <VirtualTableGrid
      selectable={true}
      tableDataSet={["1", "2"]}
      columnsInfo={columns.columnsInfo}
      customCells={columns.customCells}
      modalColumnsInfo={info}
      modalCustomCells={[]}
      fetchData={jest.fn}
      startFetching={false}
      pageSize={1}
      params={[]}
      secondaryActions={[{ ...actions.secondaryActions.clearChanges, function: jest.fn }]}
      mainActions={[{ ...actions.mainActions.customerRmsFinalize, loading: false, function: jest.fn }]}
    />,
  );

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
