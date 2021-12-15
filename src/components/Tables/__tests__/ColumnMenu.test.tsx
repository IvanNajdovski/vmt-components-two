import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { ColumnMenu } from "../Shared";

it("renders ColumnMenu component", () => {
  const { getByText, getByTestId, container } = render(<ColumnMenu columns={["1", "2"]} onColumnsSubmit={jest.fn} onCloseMenu={jest.fn} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(1);

  const input = getByTestId("1") as HTMLInputElement;
  fireEvent.click(input);

  const save = getByText("Save") as HTMLInputElement;
  fireEvent.click(save);

  const reset = getByText("Reset") as HTMLInputElement;
  fireEvent.click(reset);
});

it("renders Menu component", () => {
  const { container } = render(<ColumnMenu />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(1);
});
