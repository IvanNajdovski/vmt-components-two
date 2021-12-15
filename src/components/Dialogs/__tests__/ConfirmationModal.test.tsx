import React from "react";
import { render } from "@testing-library/react";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

it("renders ConfirmationModal component", () => {
  const { container } = render(<ConfirmationModal title={"Confirm"} onChangeModalData={jest.fn} />);

  expect(container.getElementsByClassName("confirmation").length).toBe(0);
});
