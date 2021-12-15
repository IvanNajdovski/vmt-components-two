import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BrowserRouter } from "react-router-dom";

it("renders Breadcrumbs component", () => {
    const { container } = render(
        <BrowserRouter>
            <Breadcrumbs /> 
        </BrowserRouter>);
    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(1);
});