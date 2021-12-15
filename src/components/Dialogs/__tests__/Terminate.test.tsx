import React from "react";
import { render } from "@testing-library/react";
import { AttributesTerminate } from "../Modal/AttributesTerminate/AttributesTerminate";

const info = [
  { field: "id", title: "Id", show: true },
  { field: "country", title: "Country", show: true },
];

it("renders AttributesTerminate component", () => {
  const { getByTestId, getByRole, container } = render(
    <AttributesTerminate columnsInfo={info} modalData={[{ id: 1, country: "data" }]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("row").length).toBe(1);
});
