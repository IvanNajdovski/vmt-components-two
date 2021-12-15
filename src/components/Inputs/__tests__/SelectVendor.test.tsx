import React from "react";
import { render } from "@testing-library/react";
import SelectVendor from "../SelectVendor/SelectVendor";

it("renders SelectVendor component, input", () => {
    const { container } = render(<SelectVendor
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"input"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});