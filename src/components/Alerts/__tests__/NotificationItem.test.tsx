import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import { NotificationItem } from "../NotificationComponents/NotificationItem";

it("renders NotificationItem component without edited record", () => {
  const { container } = render(<NotificationItem />);
  expect(container.getElementsByClassName("item").length).toBe(0);
});

it("renders NotificationItem component with edited record", () => {
  const { container } = render(<NotificationItem editedRecords={1} />);
  expect(container.getElementsByClassName("item").length).toBe(0);
});

it("renders NotificationItem component with edited record", () => {
  const { container } = render(<NotificationItem editedRecords={"1, 2"} />);
  expect(container.getElementsByClassName("item").length).toBe(0);
});
