import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { FiltersWrapper } from "../Filters";

it("renders Filters component", () => {
    const { getByTestId, container } = render(
        <FiltersWrapper
            data={"data"}
            inputs={[{ name: "input" }]}
            state={"state"}
            dispatch={jest.fn}
        />);
        
    expect(container.getElementsByClassName("filters").length).toBe(0);
});