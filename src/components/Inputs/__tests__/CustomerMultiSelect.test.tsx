import React from "react";
import { render } from "@testing-library/react";
import CustomerMultiselect from "../VirtualMultiselect/VirtualMultiselect";

it("renders CustomerMultiselectProps component, input", () => {
  const { container } = render(
    <CustomerMultiselect
      name={"Name"}
      label={"Label"}
      value={[]}
      textField={"1"}
      keyField={"1"}
      keyFieldValue={["1"]}
      pageSize={10}
      selectedIds={[1]}
      service={jest.fn}
      onChange={jest.fn}
    />,
  );

  expect(container.getElementsByClassName("input").length).toBe(0);
});
