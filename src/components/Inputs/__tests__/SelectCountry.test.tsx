import React from "react";
import { render } from "@testing-library/react";
import SelectCountry from "../SelectCountry/SelectCountry";

it("renders SelectCountry component, input", () => {
    const { container } = render(<SelectCountry
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"input"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});