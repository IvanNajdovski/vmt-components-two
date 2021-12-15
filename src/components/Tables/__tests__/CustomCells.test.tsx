import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen, getByTestId, getByRole, getByText } from "@testing-library/react";
import CheckBoxCell from "../Shared/CustomCells/CheckBoxCell";
import CustomDateCell from "../Shared/CustomCells/CustomDateCell";
import DateInputCell from "../Shared/CustomCells/DateInputCell";
import DropdownCell from "../Shared/CustomCells/DropdownCell";
import DropdownValueCell from "../Shared/CustomCells/DropdownValueCell";
import InputCell from "../Shared/CustomCells/InputCell";
import LinkCell from "../Shared/CustomCells/LinkCell";
import NotificationCell from "../Shared/CustomCells/NotificationCell";
import NumericCell from "../Shared/CustomCells/NumericCell";
import PopupCell from "../Shared/CustomCells/PopupCell";
import PopupItem from "../Shared/CustomCells/PopupCell";
import PopupHeader from "../Shared/CustomCells/PopupCell";

const options = {
  disabled: false,
  validation: null,
  field: 1,
  data: ["1", "2"],
  revertOption: "option",
  valueOverride: null,
  required: true,
  filterBy: {
    filters: [[{ operator: "eq" }]],
  },
};

const options1 = {
  disabled: false,
  validation: null,
  field: 1,
  data: ["1", "2"],
  valueOverride: null,
  required: true,
  revertOption: null,
};

it("renders CheckBoxCell component", () => {
  const { getByRole, container } = render(<CheckBoxCell options={options} dataItem={[]} onChange={jest.fn} />);

  const checkbox = getByRole("checkbox") as HTMLInputElement;
  fireEvent.change(checkbox, { target: { value: "selected" } });

  expect(container.getElementsByClassName("text-center").length).toBe(0);
});

it("renders CustomDateCell component", () => {
  const { container } = render(<CustomDateCell options={options} dataItem={[]} onChange={jest.fn} />);

  expect(container.getElementsByClassName("text-center").length).toBe(0);
});

it("renders DateInputCell component", () => {
  const { container } = render(<DateInputCell options={options} dataItem={[]} onChange={jest.fn} />);

  expect(container.getElementsByClassName("text-center").length).toBe(0);
});

it("renders DropdownCell component with", () => {
  const { getByTestId, container } = render(<DropdownCell options={options} dataItem={[]} onChange={jest.fn} />);

  const restore = getByTestId("restore") as HTMLInputElement;
  fireEvent.click(restore);

  expect(container.getElementsByClassName("btn-outline-neutral").length).toBe(1);
});

it("renders DropdownCell component, without revert option", () => {
  const { getByRole, container } = render(<DropdownCell options={options1} dataItem={{ value: "value" }} onChange={jest.fn} />);

  const dropDownList = getByRole("combobox") as HTMLInputElement;
  fireEvent.click(dropDownList);

  expect(container.getElementsByClassName("btn-outline-neutral").length).toBe(0);
});

it("renders DropdownValueCell component", () => {
  const { getByRole, container } = render(<DropdownValueCell options={options} dataItem={[]} onChange={jest.fn} />);

  const dropDownList = getByRole("combobox") as HTMLInputElement;
  fireEvent.change(dropDownList, { target: { value: "2" } });

  expect(container.getElementsByClassName("flex-nowrap").length).toBe(0);
});

it("renders InputCell component", () => {
  const { getByDisplayValue, container } = render(<InputCell onChange={jest.fn} dataItem={[1, 2, 3]} options={options} />);

  const input = getByDisplayValue("") as HTMLInputElement;
  fireEvent.blur(input);
  fireEvent.change(input, { target: { value: "0.5" } });

  expect(container.getElementsByClassName("w-100").length).toBe(1);
});

it("renders LinkCell component", () => {
  const { container } = render(
    <BrowserRouter>
      <LinkCell dataItem={{ value: "value" }} field="value" options={options} />
    </BrowserRouter>
  );

  expect(container.getElementsByClassName("text-center").length).toBe(0);
});

it("renders NotificationCell component", () => {
  const { container } = render(<NotificationCell dataItem={[1, 2, 3]} options={options} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders NumericCell component", () => {
  const { getByTestId, getByDisplayValue, container } = render(<NumericCell dataItem={{ value: "value" }} options={options} onChange={jest.fn} />);

  const restore = getByTestId("restore") as HTMLInputElement;
  fireEvent.click(restore);

  const input = getByDisplayValue("") as HTMLInputElement;
  fireEvent.blur(input);
  fireEvent.change(input, { target: { value: "0.5" } });

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders NumericCell component, without revert options", () => {
  const { container } = render(<NumericCell dataItem={{ value: "value" }} options={options1} onChange={jest.fn} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders PopupCell component", () => {
  const { getByLabelText, container } = render(<PopupCell dataItem={{ value: "value" }} options={options1} onChange={jest.fn} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders PopupCell component", () => {
  const { container } = render(<PopupCell dataItem={{ value: "value" }} options={options1} onChange={jest.fn} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders PopupItem component", () => {
  const { container } = render(<PopupItem dataItem={{ value: "value" }} options={options1} onChange={jest.fn} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});

it("renders PopupHeader component", () => {
  const { container } = render(<PopupHeader dataItem={{ value: "value" }} options={options1} onChange={jest.fn} />);

  expect(container.getElementsByClassName("w-100").length).toBe(0);
});
