import React from "react";
import { render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import { VirtualPager } from "../Shared/VirtualPager/VirtualPager";

it("renders VirtualPager component", () => {
  const { container } = render(<VirtualPager />);

  expect(container.getElementsByClassName("k-column-list-wrapper").length).toBe(0);
});
