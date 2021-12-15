import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { CustomTableCell } from "../Shared/CustomCells/index";
import { BrowserRouter } from "react-router-dom";

it("renders CustomTableCell component, type link", () => {
    const { container } = render(
        <BrowserRouter>
            <CustomTableCell
                dataItem={{ value: "value" }}
                field="value"
                options={{type: "link"}} />
        </BrowserRouter>);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type input", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "input" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type numeric", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "numeric" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type dropdown", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "dropdown" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type dropdownValue", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "dropdownValue" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type checkBox", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "checkBox" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type checkBoxValue", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "checkBoxValue", values: { true: true } }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type notification", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "notification" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type date", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "date" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component, type dateInput", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "dateInput" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component,no type", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component,type = icon", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "icon" }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders CustomTableCell component,type = acronymCell", () => {
    const { container } = render(
        <CustomTableCell
            options={{ type: "acronymCell", data: ["1", "2"] }}
            dataItem={{ value: "value" }}
            onChange={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});