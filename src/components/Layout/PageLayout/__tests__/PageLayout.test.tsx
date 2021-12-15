import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PageLayout } from "../PageLayout";
import { BrowserRouter } from 'react-router-dom';

const routes = ["/route1", "route2"]
const location = {
    pathname: "/route1"
}

it("renders PageLayout component", () => {
    const { container } = render(
        <BrowserRouter>
            <PageLayout routes={routes} location={location} icon={"icon"} pageIcon={"icon"}/>
        </BrowserRouter>);
    expect(container.getElementsByClassName("content").length).toBe(1);
});
