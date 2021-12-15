import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PageTitle from "../PageTitle/PageTitle";
import { BrowserRouter } from "react-router-dom";

it("renders PageTitle component", () => {
  const { container } = render(
    <BrowserRouter>
      <PageTitle match={{ url: "/url/path", params: { path: "/url/path" } }} titleRenderLevel={2} />
    </BrowserRouter>,
  );
  expect(container.getElementsByClassName("text-neutral-muted").length).toBe(1);
});
