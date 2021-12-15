import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomerColoComboBox from "../CustomerColoComboBox/CustomerColoComboBox";

it("renders CustomerColoComboBox component, input", () => {
  const { getByRole, container } = render(
    <CustomerColoComboBox
      name={"Name"}
      label={"Label"}
      value={{ name: "name", id: "id" }}
      textField={"name"}
      keyField={"id"}
      keyFieldValue={["name", "id"]}
      pageSize={10}
      service={jest.fn}
      onChange={jest.fn}
      data={[{ name: "name", id: "id" }]}
    />,
  );

  const combobox = getByRole("combobox") as HTMLInputElement;
  fireEvent.change(combobox, { target: { value: "1234" } });

  expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomerColoComboBox component, input", () => {
  const { getByRole, container } = render(
    <CustomerColoComboBox
      name={"Name"}
      label={"Label"}
      textField={"name"}
      keyField={"id"}
      keyFieldValue={["name", "id"]}
      pageSize={10}
      service={jest.fn}
      onChange={jest.fn}
      data={[{ coloCode: "1111" }]}
    />,
  );

  const combobox = getByRole("combobox") as HTMLInputElement;
  fireEvent.change(combobox, { target: { value: "1234" } });

  expect(container.getElementsByClassName("input").length).toBe(0);
});
