import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import { InvalidRecordsNotification, PopupItem, PopupHeader } from "../NotificationComponents/InvalidRecordsNotification";
import { LinkNotification } from "../NotificationComponents/LinkNotification";
import { NavigationBlocker } from "../NavigationBlocker/NavigationBlocker";
import { BrowserRouter } from 'react-router-dom';

it("renders InvalidRecordsNotification", () => {
    const { container } = render(<InvalidRecordsNotification invalidRecords={[]} />);
    expect(container.getElementsByClassName("item").length).toBe(0);
});

it("renders LinkNotification", () => {
    const { container } = render(
        <BrowserRouter>
            <LinkNotification textStart={"Start"} textEnd={"End"} id={1} linkAddress={""} />);
        </BrowserRouter>)

    expect(container.getElementsByClassName("item").length).toBe(0);
});


it("renders PopupItem", () => {
    const { container } = render(
        <PopupItem dataItem={{
            country: "MK",
            countryName: "MK",
            sellDestination: "AL",
            plRouteDesc: "Route",
            product: "PV",
            shortName: "short"
        }} />)

    expect(container.getElementsByClassName("item").length).toBe(0);
});

it("renders PopupHeader", () => {
    const { container } = render(
        <PopupHeader />)

    expect(container.getElementsByClassName("item").length).toBe(0);
});
