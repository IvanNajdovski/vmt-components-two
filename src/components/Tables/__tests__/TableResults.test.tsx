import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { TableResults } from "../TableResults";

it("renders TableResults component", () => {
    const { container } = render(
        <TableResults
            tableData={[]}
            columns={[{field: "field"}]}
            paginable={true}
            pagingConfig={[]}
            clickableField={""}
            fieldClickEvent={jest.fn} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});