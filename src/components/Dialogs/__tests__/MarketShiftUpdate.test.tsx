import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MarketShiftUpdate } from "../Modal/MarketShiftUpdate/MarketShiftUpdate";

const info = [{ field: "id", title: "Id", show: true }];

it("renders MarketShiftUpdate component", () => {
  const { getByLabelText, getByTestId, container } = render(
    <MarketShiftUpdate columnsInfo={info} modalColumnsInfo={info} modalData={[{ id: 1 }]} onChangeModalData={jest.fn} />,
  );

  const markup = getByLabelText("Markup") as HTMLInputElement;
  fireEvent.change(markup, { target: { value: 0.6 } });
  expect(markup.value).toBe("0.6");
  fireEvent.blur(markup);

  const floorCost = getByLabelText("Floor Cost") as HTMLInputElement;
  fireEvent.change(floorCost, { target: { value: 0.000006 } });
  expect(floorCost.value).toBe("0.000006");
  fireEvent.blur(floorCost);

  const textArea = getByTestId("textArea") as HTMLInputElement;
  fireEvent.change(textArea, { target: { value: 0.5 } });
  fireEvent.blur(textArea);

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});
