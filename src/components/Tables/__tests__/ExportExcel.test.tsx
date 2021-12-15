import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import ExportExcel from "../Shared/ExportComponents/ExportExcel";

const initialTableState = {
  filter: { logic: "and", filters: [] },
  sort: [],
  skip: 0,
  take: 1,
};
const data = {
  exportData: ["exportData"],
};

jest.mock("react-dom", () => {
  return {
    //@ts-ignore
    ...jest.requireActual("react-dom"),
    createPortal: (element, target) => {
      return element;
    },
  };
});

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

it("renders ExportExcel component", () => {
  const { container } = render(<ExportExcel data={data} columns={["1"]} tableState={initialTableState} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
