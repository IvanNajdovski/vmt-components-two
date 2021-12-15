import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { OriginPopup, PrefixPopup } from "../Shared/CustomCells/PopupComponents";

it("renders OriginPopup component", () => {
    const { container } = render(
        <OriginPopup
            dataItem={[]}
            show={true}
            options={[]}
            anchor={""}
        />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});


it("renders PrefixPopup component", () => {
    const { container } = render(
        <PrefixPopup
            dataItem={[]}
            show={true}
            options={[]}
            anchor={""}
        />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
