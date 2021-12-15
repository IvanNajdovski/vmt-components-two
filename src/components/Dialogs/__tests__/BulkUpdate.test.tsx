import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CustomerRmsBulkUpdate } from "../Modal/CustomerRmsBulkUpdate/CustomerRmsBulkUpdate";
import assets from "./assets.json";

const info = [{ field: "id", title: "Id", show: true }];

it("renders BulkUpdate component", () => {
  const { getByLabelText, container } = render(<CustomerRmsBulkUpdate columnsInfo={info} modalData={[]} onChangeModalData={jest.fn} />);

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);

  const groupRates = getByLabelText("Rate for Group Routes") as HTMLInputElement;
  const pufType = getByLabelText("Flag PUF for rates bellow floor") as HTMLInputElement;
  const terminated = getByLabelText("Terminate selected rates") as HTMLInputElement;

  fireEvent.change(groupRates, { target: { value: "0.5" } });
  fireEvent.click(pufType);
  fireEvent.click(terminated);

  fireEvent.blur(groupRates);
  fireEvent.blur(pufType);
  fireEvent.blur(terminated);

  expect(groupRates.value).toBe("0.5");
  expect(terminated.value).toBe("on");
  expect(pufType.value).toBe("on");
});

it("renders BulkUpdate component", () => {
  const { getByText, container } = render(
    <CustomerRmsBulkUpdate
      columnsInfo={info}
      modalData={[{newRate: null, terminate: "Y"}]}
      clearChanges={assets.secondaryActions.clearChanges}
      onChangeModalData={jest.fn} />);

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);

  const groupRates = getByText("Clear New Rates") as HTMLInputElement;

  fireEvent.click(groupRates)
});