import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DrawerNavItem from "../DrawerNavItem/DrawerNavItem";

it("renders DrawerNavItem component", () => {
    const { container } = render(
        <DrawerNavItem
            text={""}
            icon={""}
            id={1}
            visible={false}
            name={""} />);
    expect(container.getElementsByClassName("breadcrumb-item").length).toBe(0);
});