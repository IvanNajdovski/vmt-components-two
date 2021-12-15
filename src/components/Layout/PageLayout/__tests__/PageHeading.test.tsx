import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PageHeading from "../PageHeading/PageHeading";
import { BrowserRouter } from 'react-router-dom';

it("renders PageHeading component", () => {
    const { container } = render(
        <BrowserRouter>
            <PageHeading match={{ url: "/url/path"}} />
        </BrowserRouter>);
    expect(container.getElementsByClassName("text-neutral-muted").length).toBe(0);
});