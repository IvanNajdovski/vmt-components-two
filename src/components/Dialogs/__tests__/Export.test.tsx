import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Export } from "../Modal/Export/Export";

const initialTableState = {
  filter: { logic: "and", filters: [] },
  sort: [],
  skip: 0,
  take: 1,
};
it("renders Export component", () => {
  const { container } = render(<Export tableState={initialTableState} />);
  expect(container.getElementsByClassName("row").length).toBe(1);
});
