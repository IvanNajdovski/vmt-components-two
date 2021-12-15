import React from "react";
import { render } from "@testing-library/react";
import { AvatarComponent } from "../AvatarComponent";

it("renders AvatarComponent component", () => {
    const { container } = render(<AvatarComponent />);
    expect(container.getElementsByClassName("avatar").length).toBe(0);
});