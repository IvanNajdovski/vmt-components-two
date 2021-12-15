import { disableGridAction, gridModalData } from "..";

describe("gridFunctions", () => {
  const tableData = [
    {
      countryId: 1,
      productId: 1,
      currencyId: 1,
      regionAnalistId: 1,
    },
  ];

  const tableDataSelected = [
    {
      countryId: 1,
      productId: 1,
      currencyId: 1,
      regionAnalistId: 1,
      selected: true
    },
  ];


  test("disableGridAction function no type", () => {
    expect(disableGridAction(tableData, "")).toBe(true);
  });

  test("disableGridAction function no type", () => {
    expect(disableGridAction(tableData, "randomType")).toBe(true);
  });

  test("disableGridAction function selectedOne case", () => {
    expect(disableGridAction(tableData, "selectedOne")).toBe(false);
  });

  test("disableGridAction function selected case", () => {
    expect(disableGridAction(tableData, "selected")).toBe(0);
  });

  test("disableGridAction function finalize case", () => {
    expect(disableGridAction(tableData, "finalize")).toBe(false);
  });

  test("disableGridAction function selected&noDestination&country case", () => {
    expect(disableGridAction(tableData, "selected&noDestination&country")).toBe(0);
  });

  test("gridModalData function sameCountrySelected", () => {
    expect(disableGridAction(tableData, "sameCountrySelected")).toStrictEqual(0);
  });

  test("gridModalData function ratesTerminate", () => {
    expect(disableGridAction(tableDataSelected, "ratesTerminate")).toStrictEqual(true);
  });

  test("gridModalData function no type", () => {
    expect(gridModalData(tableData, "")).toStrictEqual([]);
  });

  test("gridModalData function noDestination&country", () => {
    expect(gridModalData(tableData, "noDestination&country")).toStrictEqual([]);
  });

  test("gridModalData function copyTo", () => {
    expect(gridModalData(tableData, "copyTo")).toStrictEqual({ percentage: null, selectedValue: null });
  });

  test("gridModalData function noDestination", () => {
    expect(gridModalData(tableData, "noDestination")).toStrictEqual([]);
  });

  test("gridModalData function noDestination&CountryAttributes", () => {
    expect(gridModalData(tableData, "noDestination&CountryAttributes")).toStrictEqual([]);
  });

  test("gridModalData function noDestination&CountryRates", () => {
    expect(gridModalData(tableData, "noDestination&CountryRates")).toStrictEqual([]);
  });
});
