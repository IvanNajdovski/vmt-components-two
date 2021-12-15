import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal/Modal";

const info = {
    labels: "Data",
    order: ["oredr1"]
}

jest.mock('react-dom', () => {
    return {
        ...jest.requireActual('react-dom'),
        createPortal: (element, target) => {
            return element;
        }
    };
});

it("renders MarketShiftUpdate component", () => {
    const { getByLabelText, container } = render(
        <Modal
            title={"Title"}
            visible={true}
            onModalClose={jest.fn}
            onContinue={jest.fn}
        />);

    expect(container.getElementsByClassName("quick-import-upload").length).toBe(0);
});
