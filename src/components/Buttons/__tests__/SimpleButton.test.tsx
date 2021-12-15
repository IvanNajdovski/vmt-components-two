import React from "react";
import { render } from "@testing-library/react";
import { SimpleButton } from "../SimpleButton/SimpleButton";

it("renders SimpleButton component", () => {
    const { container } = render(
        <SimpleButton label={"Simple"} loading={true} />);
    expect(container.getElementsByClassName("simpleButton").length).toBe(0);
});