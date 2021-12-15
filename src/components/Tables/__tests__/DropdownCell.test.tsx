import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import DropdownCell from "../Shared/CustomFilterCells/DropdownCell";

it("renders DropdownCell component", () => {
    const { container } = render(
        <DropdownCell
            dataItem={[]}
            options={{max: "10.02.2021", min: "21.03.2021"}}
            field={"startDate"} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
