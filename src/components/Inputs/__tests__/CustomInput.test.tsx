import React from "react";
import { render } from "@testing-library/react";
import CustomInput from "../CustomInput";

it("renders CustomInput component, input", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"input"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, numericTexBox", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"numericTextBox"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, dropDownList", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"dropDownList"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customerDropdown", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customerDropdown"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customerIdInput", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customerIdInput"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customDatePicker", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customDatePicker"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, countryMultiSelect", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"countryMultiSelect"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customerColo", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customerColo"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customMultiSelect", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customMultiSelect"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customComboBox", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"customComboBox"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, virtualDropdown", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={"virtualDropdown"} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, default", () => {
    const { container } = render(<CustomInput
        data={[]}
        value={""}
        onChange={jest.fn}
        loading={false}
        label={"Label"}
        service={""}
        inputComponent={""} />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, customDateInput", () => {
    const { container } = render(
        <CustomInput
            data={[]}
            value={""}
            onChange={jest.fn}
            loading={false}
            label={"Label"}
            service={""}
            inputComponent={"customDateInput"}
        />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, virtualMultiselect", () => {
    const { container } = render(
        <CustomInput
            data={[]}
            value={""}
            onChange={jest.fn}
            loading={false}
            label={"Label"}
            service={""}
            inputComponent={"virtualMultiselect"}
        />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});

it("renders CustomInput component, checkbox", () => {
    const { container } = render(
        <CustomInput
            data={[]}
            value={""}
            onChange={jest.fn}
            loading={false}
            label={"Label"}
            service={""}
            inputComponent={"checkbox"}
        />);

    expect(container.getElementsByClassName("input").length).toBe(0);
});