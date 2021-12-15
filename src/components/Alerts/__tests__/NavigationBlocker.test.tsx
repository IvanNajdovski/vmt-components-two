import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import { NavigationBlocker } from "../NavigationBlocker/NavigationBlocker";
import { BrowserRouter } from 'react-router-dom';

it("renders NavigationBlocker", () => {
    const { container } = render(
        <BrowserRouter>
            <NavigationBlocker blocked={true} />
        </BrowserRouter>);

    expect(container.getElementsByClassName("item").length).toBe(0);
});

it("renders NavigationBlocker", () => {
    const { container } = render(
        <BrowserRouter>
            <NavigationBlocker blocked={false} />
        </BrowserRouter>);

    expect(container.getElementsByClassName("item").length).toBe(0);
});