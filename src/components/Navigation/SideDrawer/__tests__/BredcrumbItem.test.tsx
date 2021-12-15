import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import BreadcrumbItem from "../Breadcrumbs/BreadcrumbItem/BreadcrumbItem";
import { BrowserRouter } from "react-router-dom";

const match = {
    params: {
        path: "path/"
    }
}
it("renders BreadcrumbItem component", () => {
    const { container } = render(
        <BrowserRouter>
            <BreadcrumbItem match={match} />
        </BrowserRouter>);
    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(1);
});