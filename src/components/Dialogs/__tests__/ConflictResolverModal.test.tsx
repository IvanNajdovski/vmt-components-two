import React from "react";
import { render } from "@testing-library/react";
import { CustomerConflictResolverModal } from "../Modal/CustomerConflictResolverModal/CustomerConflictResolverModal";
import { FloorRatesConflictResolverModal } from "../Modal/FloorRateConflictResolverModal/FloorRateConflictResolverModal";
import { FloorAttributesConflictResolverModal } from "../Modal/FloorAttributesConflictResolverModal/FloorAttributesConflictResolverModal";

it("renders ConflictResolverModal component", () => {
  const { container, getByTestId } = render(
  <CustomerConflictResolverModal modalData={{ conflicts: ["1"], originals: ["1"] }} />);

  expect(container.getElementsByClassName("confirmation").length).toBe(0);
});

it("renders ConflictResolverModal component", () => {
  const { container, getByTestId } = render(
    <FloorRatesConflictResolverModal
      modalData={{ conflicts: ["1"], originals: ["1"], requestRecords: ["1"], conflictingRecords: ["1"] }}
    />);

  expect(container.getElementsByClassName("confirmation").length).toBe(0);
});


it("renders FloorAttributesConflictResolverModal component", () => {
  const { container, getByTestId } = render(
    <FloorAttributesConflictResolverModal
      modalData={{ conflicts: ["1"], originals: ["1"], requestRecords: ["1"], conflictingRecords: ["1"] }}
    />);

  expect(container.getElementsByClassName("confirmation").length).toBe(0);
});
