import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SendEmail } from "../Modal/SendEmail/SendEmail";

it("renders SendEmail component", () => {
    const { getByLabelText, getByTestId, container } = render(
        <SendEmail onChangeModalData={jest.fn} />);
    expect(container.getElementsByClassName("col-lg-24").length).toBe(4);

    const sendTo = getByLabelText('Send to') as HTMLInputElement
    const subject = getByLabelText('Subject') as HTMLInputElement

    fireEvent.change(sendTo , { target: { value: "recepient" } })
    fireEvent.change(subject , { target: { value: "subject" } })

    expect(subject.value).toBe("subject")
    expect(sendTo.value).toBe("recepient")
});