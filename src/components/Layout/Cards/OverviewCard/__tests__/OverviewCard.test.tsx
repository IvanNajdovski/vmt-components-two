import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { OverviewCard } from "../OverviewCard";
import { BrowserRouter } from 'react-router-dom';

const route = "/route"
const icon = "icon"
const name = "name"
const description = "description"

it("renders OverviewCard component", () => {
    const { container } =
        render(
            <BrowserRouter>
                <OverviewCard route={route}
                    icon={icon}
                    name={name}
                    description={description} />
            </BrowserRouter>);
    expect(container.getElementsByClassName("card").length).toBe(1);
});
