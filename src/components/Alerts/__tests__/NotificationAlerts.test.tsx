import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import { NotificationAlerts } from "../NotificationAlerts/NotificationAlerts";

jest.mock('react-dom', () => {
    return {
        ...jest.requireActual('react-dom'),
        createPortal: (element, target) => {
            return element;
        }
    };
});

it("renders NotificationAlerts component", () => {
    const { container } = render(<NotificationAlerts messages={["m1", "m2"]} onDeleteNotification={jest.fn} />);
    expect(container.getElementsByClassName("notification").length).toBe(0);
});

const message ={
    text: "message 1",
    show: true
}
it("renders NotificationAlerts component with value of show", () => {
    const { container } = render(<NotificationAlerts messages={[message]} onFadeNotification={jest.fn} onDeleteNotification={jest.fn}/>);
    expect(container.getElementsByClassName("notification").length).toBe(0);
});