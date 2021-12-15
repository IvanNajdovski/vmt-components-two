import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomerIdInput from "../CustomerIdInput/CustomerIdInput";

it("renders CustomerIdInput component, input", () => {
    const { getByTestId, container } = render(
        <CustomerIdInput
            data={[{customerId: "1"}]}
            name={"Name"}
            label={"Label"}
            value={[]}
            textField={"1"}
            keyField={"1"}
            keyFieldValue={["1"]}
            pageSize={10}
            selectedIds={[1]}
            service={jest.fn}
            onChange={jest.fn}
        />);

    const input = getByTestId('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: "0.5" } })

    expect(container.getElementsByClassName("input").length).toBe(0);
});