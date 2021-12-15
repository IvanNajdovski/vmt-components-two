import { getColumns } from "..";

const data = [
  {
    id: "2",
    country: "Country",
  },
];

const info = [{ field: "id", title: "Id", show: true }];

describe("getColumns", () => {
  test("getColumns function, without saved columns", () => {
    expect(getColumns(data, info, null)).toStrictEqual([
      {
        className: "text-center",
        field: "id",
        format: undefined,
        show: true,
        title: "Id",
        width: undefined,
      },
    ]);
  });

  test("getColumns function", () => {
    expect(getColumns(data, info, "Saved columns")).toStrictEqual("Saved columns");
  });
});
