import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { DefaultSpinner, Spinner } from "../Spinner/Spinner";

it("renders DefaultSpinner component", () => {
  const { container } = render(<DefaultSpinner />);
  expect(container.getElementsByClassName("spinner").length).toBe(1);
});

it("renders Spinner component", () => {
  const { container } = render(<Spinner />);
  expect(container.getElementsByClassName("spinner").length).toBe(1);
});
