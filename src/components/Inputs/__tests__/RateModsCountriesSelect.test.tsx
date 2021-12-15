import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CountriesMultiselect from "../RateModCountiresMultiselect/RateModCountriesMultiselect";

it("renders CountriesMultiselect component, input", () => {
    const { container } = render(<CountriesMultiselect
        data={[]}
        value={""}
        onChange={jest.fn} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});