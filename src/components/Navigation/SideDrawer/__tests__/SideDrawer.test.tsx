import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { SideDrawer } from "../SideDrawer";

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location:
        {
            pathname: "/path"
        }
    }),
    useRouteMatch: () => ({
        url: '/url',
        location:
        {
            pathname: "/path"
        }
    }),
    useLocation: () => ({
        location:
        {
            pathname: "/path"
        }
    })
}));

it("renders SideDrawer component", () => {
    const { container, getByText } = render(
        <SideDrawer
            breadcrumbs={false}
            children={""}
            routes={[{ text: "route" }]} />);

    const route = getByText("route") as HTMLInputElement;
    fireEvent.click(route)

    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(0);
});

it("renders SideDrawer component, property separator", () => {
    const { container, getByText } = render(
        <SideDrawer
            breadcrumbs={false}
            children={""}
            routes={[{ text: "route", separator: true }]} />);

    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(0);
});

it("renders SideDrawer component, property data-expanded", () => {
    const { container, getByText } = render(
        <SideDrawer
            breadcrumbs={false}
            children={""}
            routes={[{ text: "route", "data-expanded": false}]} />);

    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(0);
});