import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import ExportPdf from "../Shared/ExportComponents/ExportPdf";

const data = {
    exportData: ["exportData"]
}

const columns = [{
    field: "areas"
},
{
    field: "serviceAccessTypes"
}]

jest.mock('react-dom', () => {
    return {
        ...jest.requireActual('react-dom'),
        createPortal: (element, target) => {
            return element;
        }
    };
});

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location:
        {
            pathname: "/path"
        }
    }),
    useRouteMatch: () => ({
        url: '/url',
        location:
        {
            pathname: "/path"
        }
    }),
    useLocation: () => ({
        location:
        {
            pathname: "/path"
        }
    })
}));

it("renders ExportPdf component", () => {
    const { container } = render(
        <ExportPdf data={data} columns={columns} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});

it("renders ExportPdf component, columns length > 8", () => {
    const { container } = render(
        <ExportPdf data={data} columns={[1,2,3,4,5,6,7,8,9]} />);

    expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});