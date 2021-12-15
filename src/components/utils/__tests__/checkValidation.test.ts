import { checkValidation } from "..";

const validation = {
  validationRules: [["rule 1"]],
};

describe("checkValidation", () => {
  test("checkValidation function", () => {
    expect(checkValidation({ value: "data" }, validation)).toBe(false);
  });
});
