import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { SimpleCard } from "../SimpleCard";
import { BrowserRouter } from 'react-router-dom';

const item = {
    card: "Customers"
}

it("renders SimpleCard component", () => {
    const { container } = render(
        <BrowserRouter>
            <SimpleCard item={item} />
        </BrowserRouter>);
    expect(container.getElementsByClassName("card").length).toBe(1);
});
