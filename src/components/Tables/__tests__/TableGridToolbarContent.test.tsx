import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { TableGridToolbarContent } from "../Shared/TableGridToolbarContent/TableGridToolbarContent";
import actions from "./actions.json";

const initialTableState = {
  filter: { logic: "and", filters: [] },
  sort: [],
  skip: 0,
  take: 100,
};
const info = {
  labels: ["1"],
  order: ["order1"],
};

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

it("renders TableGridToolbarContent component", () => {
  const { getByLabelText, getByTestId, container } = render(
    <TableGridToolbarContent
      tableState={initialTableState}
      tableData={["1", "2"]}
      setTableData={jest.fn}
      columns={["column1"]}
      secondaryActions={[{ ...actions.secondaryActions.clearChanges, function: jest.fn }]}
      mainActions={[{ ...actions.mainActions.customerRmsFinalize, loading: false, function: jest.fn }]}
      onModalOpen={jest.fn}
      setNewRecord={jest.fn}
      tableGridRef={jest.fn}
      newRecord={"newRecord"}
      createRecord={true}
      idField={"1"}
      exportData={actions.exportData}
      copyRecord={true}
    />,
  );

  const remove = getByTestId("remove") as HTMLInputElement;
  fireEvent.click(remove);

  // const save = getByTestId('saveNew') as HTMLInputElement
  // fireEvent.click(save)

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders TableGridToolbarContent component, without new record", () => {
  const { getByTestId, container } = render(
    <TableGridToolbarContent
      tableState={initialTableState}
      tableData={["1", "2"]}
      setTableData={jest.fn}
      columns={["column1"]}
      secondaryActions={[{ ...actions.secondaryActions.clearChanges, function: jest.fn }]}
      mainActions={[{ ...actions.mainActions.customerRmsFinalize, loading: false, function: jest.fn }]}
      onModalOpen={jest.fn}
      setNewRecord={jest.fn}
      tableGridRef={jest.fn}
      newRecord={null}
      createRecord={true}
      idField={"1"}
      exportData={{ data: "data" }}
      copyRecord={true}
    />,
  );

  const copy = getByTestId("copy") as HTMLInputElement;
  fireEvent.click(copy);

  const finalize = getByTestId("finalize") as HTMLInputElement;
  fireEvent.click(finalize);

  const addNew = getByTestId("addNew") as HTMLInputElement;
  fireEvent.click(addNew);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
