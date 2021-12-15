import React from "react";
import { render } from "@testing-library/react";
import { CustomerDetails } from "../CustomerDetails";

describe("<CustumerDetails/> component", () => {
  it("renders CustumerDetails with array keys", () => {
    const { container } = render(
      <CustomerDetails
        loading={false}
        data={{
          linkedCustomers: [{ customerName: "name" }],
          prefRouteCategories: [{ description: "desc" }],
          productShortName: "PV",
          accountManager: { firstName: "name", lastName: "name" },
          currencyCode: "USD",
          autoRateFull_A_Z: "Y",
          quotingFrequency: "Y",
          currentExchangeRate: 1,
        }}
      />
    );
    expect(container.getElementsByClassName("fa-link").length).toBe(0);
  });

  it("renders CustumerDetails with array keys", () => {
    const { container } = render(
      <CustomerDetails
        loading={false}
        data={{
          linkedCustomers: [],
          prefRouteCategories: [],
          productShortName: "",
          accountManager: 0,
          currencyCode: "",
          autoRateFull_A_Z: "",
          quotingFrequency: "",
          currentExchangeRate: 0,
        }}
      />
    );
    expect(container.getElementsByClassName("fa-link").length).toBe(0);
  });
});
