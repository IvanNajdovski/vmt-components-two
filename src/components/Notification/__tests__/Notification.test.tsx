import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { NotificationBox } from "../Notification";

it("renders NotificationBox component", () => {
    const { container } = render(<NotificationBox />);
    expect(container.getElementsByClassName("notificationBox").length).toBe(0);
});