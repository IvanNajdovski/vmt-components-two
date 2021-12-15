import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SimpleDialog } from "../SimpleDialog";

it("renders SimpleDialog component", () => {
    const { container } = render(
        <SimpleDialog />);
    expect(container.getElementsByClassName("dialog").length).toBe(0);
});