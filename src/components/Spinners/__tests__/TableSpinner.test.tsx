import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { TableSpinner } from "../TableSpinner/TableSpinner";

it("renders TableSpinner component", () => {
    const { container } = render(<TableSpinner />);

    expect(container.getElementsByClassName("spinner").length).toBe(1);
});
