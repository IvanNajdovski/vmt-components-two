import { undash } from "..";

describe("undash", () => {
  test("undash function", () => {
    expect(undash("name-one")).toBe("name one");
  });
});
