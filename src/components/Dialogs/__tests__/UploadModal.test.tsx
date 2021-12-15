import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UploadModal } from "../Modal/UploadModal/UploadModal";

it("renders UploadModal component", () => {
    const { container } = render(
        <UploadModal onChangeModalData={jest.fn} />);
    expect(container.getElementsByClassName("quick-import-upload").length).toBe(1);
});