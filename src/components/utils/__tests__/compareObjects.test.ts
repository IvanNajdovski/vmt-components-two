import { compareObjectValues } from "..";

const object = {
  data: "data",
};

const object1 = {
  data: "data2",
};

describe("compareObjectValues", () => {
  test("compareObjectValues function", () => {
    expect(compareObjectValues(object, object1)).toBe(true);
  });

  test("compareObjectValues function without value", () => {
    expect(compareObjectValues(null, object1)).toBe(false);
  });
});
