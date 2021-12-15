import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { FloorBulkUpdate } from "../Modal/FloorBulkUpdate/FloorBulkUpdate";

const info = [{ field: "id", title: "Id", show: true }];

it("renders FloorBulkUpdate component", () => {
  const { getByLabelText, getByTestId, container } = render(
    <FloorBulkUpdate data={{ floorOrigins: [] }} columnsInfo={info} modalColumnsInfo={info} modalData={["data"]} onChangeModalData={jest.fn} />
  );

  const markup = getByLabelText("Markup") as HTMLInputElement;
  fireEvent.change(markup, { target: { value: 0.000006 } });
  expect(markup.value).toBe("0.000006");
  fireEvent.blur(markup);

  const markupPercent = getByLabelText("Markup Percent") as HTMLInputElement;
  fireEvent.change(markupPercent, { target: { value: 0.6 } });
  expect(markupPercent.value).toBe("");

  const floorCost = getByLabelText("Floor Cost") as HTMLInputElement;
  fireEvent.change(floorCost, { target: { value: 0.6 } });
  expect(floorCost.value).toBe("0.6");

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});
