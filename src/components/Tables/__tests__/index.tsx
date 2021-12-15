import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { CustomFilterCell } from "../Shared";

it("renders CustomFilterCell component, input", () => {
  const { getByDisplayValue, container } = render(<CustomFilterCell options={{ type: "input" }} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomFilterCell component, dropdown", () => {
  const { getByDisplayValue, container } = render(<CustomFilterCell options={{ type: "dropdown" }} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomFilterCell component, multiSelect", () => {
  const { getByDisplayValue, container } = render(<CustomFilterCell onChange={jest.fn} options={{ type: "multiSelect" }} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomFilterCell component, default", () => {
  const { getByDisplayValue, container } = render(<CustomFilterCell options={{ type: "" }} />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
