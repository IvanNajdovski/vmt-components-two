import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectRoutes from "../SelectRoute/SelectRoute";

it("renders SelectRoutes component, input", () => {
    const { getByLabelText, container } = render(<SelectRoutes
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        selectedCountries={["Mk"]}
        service={""}
        inputComponent={"input"} />);

    const input = getByLabelText('Routes') as HTMLInputElement
    fireEvent.change(input, { target: { value: "All" } })

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders SelectRoutes component, empty selected countries", () => {
    const { container } = render(<SelectRoutes
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        selectedCountries={[]}
        service={""}
        inputComponent={"input"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});