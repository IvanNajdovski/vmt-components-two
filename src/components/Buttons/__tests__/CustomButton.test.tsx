import React from "react";
import { render } from "@testing-library/react";
import { CustomButton } from "../CustomButton";

it("renders CustomButton component", () => {
    const { container } = render(
        <CustomButton
            label={"Custom"}
            disabled={false}
            onClickHandler={jest.fn} />);
    expect(container.getElementsByClassName("custom").length).toBe(0);
});

it("renders CustomButton component split type", () => {
    const { container } = render(
        <CustomButton
            label={"Custom"}
            disabled={false}
            onClickHandler={jest.fn}
            btnType={"split"} />);
    expect(container.getElementsByClassName("custom").length).toBe(0);
});