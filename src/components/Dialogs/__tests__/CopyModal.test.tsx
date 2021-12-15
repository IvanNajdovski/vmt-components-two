import React from "react";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import { CopyFloorModal } from "../Modal/CopyModal/CopyFloorModal";
import { CopyCurrentModal } from "../Modal/CopyModal/CopyCurrentModal";

const modalData = {
  percentage: 10,
};

it("renders CopyFloorModal component", () => {
  const { getByTestId, getByLabelText, container } = render(<CopyFloorModal modalData={modalData} onChangeModalData={jest.fn} />);
  expect(container.getElementsByClassName("list-group").length).toBe(1);

  const copyForAll = getByTestId("copyFloorForAll") as HTMLInputElement;
  const copyForAllBelowFloor = getByTestId("copyFloorForAllBelowFloor") as HTMLInputElement;
  const copyForEmptyCurrentRates = getByTestId("copyFloorForEmptyCurrentRates") as HTMLInputElement;
  const numericTexBox = getByLabelText("Increase value") as HTMLInputElement;
  const copyFloorAndExcludeNeg = getByTestId("copyFloorAndExcludeNeg") as HTMLInputElement;
  const copyFloorAndExcludeExceptions = getByTestId("copyFloorAndExcludeExceptions") as HTMLInputElement;

  fireEvent.click(copyForAll);
  fireEvent.click(copyForAllBelowFloor);
  fireEvent.click(copyForEmptyCurrentRates);
  fireEvent.click(numericTexBox);
  fireEvent.click(copyFloorAndExcludeNeg);
  fireEvent.click(copyFloorAndExcludeExceptions);

  expect(copyForAll.value).toBe("copyFloorForAll");
  expect(copyForAllBelowFloor.value).toBe("copyFloorForAllBelowFloor");
  expect(copyForEmptyCurrentRates.value).toBe("copyFloorForEmptyCurrentRates");
  expect(copyFloorAndExcludeNeg.value).toBe("copyFloorAndExcludeNeg");
  expect(copyFloorAndExcludeExceptions.value).toBe("copyFloorAndExcludeExceptions");
});

it("renders CopyCurrentModal component", () => {
  const { getByTestId, container } = render(<CopyCurrentModal modalData={modalData} onChangeModalData={jest.fn} />);
  expect(container.getElementsByClassName("list-group").length).toBe(1);

  const copyCurrentForEmptyNewRates = getByTestId("copyCurrentForEmptyNewRates") as HTMLInputElement;

  fireEvent.click(copyCurrentForEmptyNewRates);

  expect(copyCurrentForEmptyNewRates.value).toBe("copyCurrentForEmptyNewRates");
});
