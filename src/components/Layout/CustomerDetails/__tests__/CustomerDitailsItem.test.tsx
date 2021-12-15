import React from "react";
import { render } from "@testing-library/react";
import CustomerDetailsItem from "../CustomerDetailsItem";
import CustomerDetailsList from "../CustomerDetailsList.json";

describe("<CustomerDetailsItem/> component", () => {
  it("renders CustomerDetailsItem", () => {
    const { container } = render(
      <CustomerDetailsItem
        loading={false}
        customerDetails={CustomerDetailsList.extended[1]}
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

  it("renders CustomerDetailsItem, loading=true", () => {
    const { container } = render(
      <CustomerDetailsItem
        loading={true}
        customerDetails={CustomerDetailsList.extended[1]}
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

  it("renders CustomerDetailsItem, no subfield", () => {
    const { container } = render(
      <CustomerDetailsItem
        loading={true}
        customerDetails={[{
            "title": "Account manager",
            "field": "accountManager",
            "value": [
              { "field": "accountManager" }
            ],
            "noData": "Not set"
          }]}
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

  it("renders CustomerDetailsItem, no subfield & field", () => {
    const { container } = render(
      <CustomerDetailsItem
        loading={true}
        customerDetails={[{
            "title": "Account manager",
            "field": "accountManager",
            "value": [
              { "someData": "accountManager" }
            ],
            "noData": "Not set"
          }]}
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
});
