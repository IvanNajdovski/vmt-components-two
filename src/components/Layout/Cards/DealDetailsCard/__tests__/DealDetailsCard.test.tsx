import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { DealDetailsCard } from "../DealDetailsCard";

const item = {
    card: "Customers"
}

const data = {
    data: "Some data"
}
it("renders DealDetailsCard component", () => {
    const { container } = render(<DealDetailsCard data={data}/>);
    expect(container.getElementsByClassName("card").length).toBe(1);
});
