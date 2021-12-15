import React from "react";
import { render } from "@testing-library/react";
import ButtonContainer from "../SplitButton/SplitButton";

it("renders ButtonContainer component", () => {
    const { container } = render(<ButtonContainer iconClass={"icon"} buttonClass={"button"}/>);
    expect(container.getElementsByClassName("mr-2").length).toBe(2);
});