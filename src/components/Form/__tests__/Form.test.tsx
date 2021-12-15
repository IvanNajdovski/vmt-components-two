import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FormWrapper } from "../Form";
import inputs from "./inputs.json"

const initialInputs = {
    customer: null
};

it("renders FormWrapper component", () => {
    const { getByTitle, container } = render(
        <FormWrapper
            reducer={jest.fn}
            initialInputs={initialInputs}
            inputs={inputs}
            loading={false}
            data={""}
            onSubmit={jest.fn}
            onReset={jest.fn}
            children={null}
            services={jest.fn}
            onChangeHandler={jest.fn}
            state={null}
            dispatch={null}
        />);

    const search = getByTitle('Search') as HTMLInputElement
    fireEvent.click(search)

    const clear = getByTitle('Undo') as HTMLInputElement
    fireEvent.click(clear)

    expect(container.getElementsByClassName("formwrapper").length).toBe(0);
});