import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ModalContent } from "../Modal/ModalContent";

const info = [{ field: "id", title: "Id", show: true }];

it("renders ModalContent component, bulk update", () => {
  const { container } = render(
    <ModalContent data={[]} componentType={"bulkUpdate"} componentText={""} columnsInfo={[]} modalData={[]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, floor Bulk Update", () => {
  const { container } = render(
    <ModalContent
      data={{ floorOrigins: [] }}
      componentType={"floorBulkUpdate"}
      componentText={""}
      columnsInfo={info}
      modalColumnsInfo={info}
      modalData={["data"]}
      onChangeModalData={jest.fn}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, uploadModal", () => {
  const { container } = render(
    <ModalContent data={[]} componentType={"uploadModal"} componentText={""} columnsInfo={[]} modalData={[]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(1);
});

it("renders ModalContent component, marketShiftUpdate", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"marketShiftUpdate"}
      componentText={""}
      modalColumnsInfo={info}
      columnsInfo={info}
      modalData={[]}
      onChangeModalData={jest.fn}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, export", () => {
  const { container } = render(
    <ModalContent data={[]} componentType={"export"} componentText={""} columnsInfo={[]} modalData={[]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, terminateRecord", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"terminateRecord"}
      componentText={""}
      modalColumnsInfo={info}
      columnsInfo={info}
      modalData={[]}
      onChangeModalData={jest.fn}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, sendEmail", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"sendEmail"}
      componentText={""}
      columnsInfo={[]}
      modalData={{ attachments: ["att1", "att2"] }}
      onChangeModalData={jest.fn}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, copyFloorModal", () => {
  const { container } = render(
    <ModalContent data={[]} componentType={"copyFloorModal"} componentText={""} columnsInfo={[]} modalData={[]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, copyCurrentModal", () => {
  const { container } = render(
    <ModalContent data={[]} componentType={"copyCurrentModal"} componentText={""} columnsInfo={[]} modalData={[]} onChangeModalData={jest.fn} />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, default", () => {
  const { container } = render(<ModalContent componentType={""} componentText={"Default"} onChangeModalData={jest.fn} />);

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, customerConflictResolver", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"customerConflictResolver"}
      componentText={""}
      columnsInfo={[]}
      onChangeModalData={jest.fn}
      modalData={{ conflicts: ["1"], originals: ["1"] }}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, floorRateConflictResolver", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"floorRateConflictResolver"}
      componentText={""}
      columnsInfo={[]}
      onChangeModalData={jest.fn}
      modalData={{ conflicts: ["1"], originals: ["1"], requestRecords: ["1"], conflictingRecords: ["1"] }}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});

it("renders ModalContent component, floorAttributesConflictResolver", () => {
  const { container } = render(
    <ModalContent
      data={[]}
      componentType={"floorAttributesConflictResolver"}
      componentText={""}
      columnsInfo={[]}
      onChangeModalData={jest.fn}
      modalData={{ conflicts: ["1"], originals: ["1"], requestRecords: ["1"], conflictingRecords: ["1"] }}
    />
  );

  expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});
