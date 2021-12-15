import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { PaginationTableGrid } from "../PaginationTableGrid/PaginationTableGrid";
import actions from "./actions.json"
import columns from "./columns.json"

jest.mock('react-router-dom', () => ({
    useRouteMatch: () => ({
        url: '/url',
        location:
        {
            pathname: "/path"
        }
    })
}));

it("renders PaginationTableGrid component", () => {
    const { container } = render(
        <PaginationTableGrid
            selectable={true}
            tableDataSet={["1"]}
            columnsInfo={columns.columnsInfo}
            secondaryActions={[{ ...actions.secondaryActions.clearChanges, function: jest.fn }]}
            mainActions={[{ ...actions.mainActions.customerRmsFinalize, loading: false, function: jest.fn }]}
        />);
        
    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});