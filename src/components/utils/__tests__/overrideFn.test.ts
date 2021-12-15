import { compare, getBgOverride, getValueOverride, getValueUpdate, getValidOverride } from "../overrideFn";

describe("compare", () => {
  test("compare function, operator: no-eq", () => {
    expect(compare("no-eq", 0.2, 0.2)).toBe(false);
  });

  test("compare function, operator: eq", () => {
    expect(compare("eq", 0.2, 0.2)).toBe(true);
  });

  test("compare function, operator: greaterThen", () => {
    expect(compare("greaterThen", 0.5, 0.2)).toBe(true);
  });

  test("compare function, operator: lowerThen", () => {
    expect(compare("lowerThen", 0.1, 0.2)).toBe(true);
  });

  test("compare function, operator: truthy", () => {
    expect(compare("truthy", 0.2, 0.2)).toBe(true);
  });

  test("compare function, operator: falsy", () => {
    expect(compare("falsy", 0.2, null)).toBe(false);
  });

  test("compare function, operator: compareValue", () => {
    expect(compare("compareValue", 0.2, null)).toBe(false);
  });

  test("compare function, operator: greaterThanValue", () => {
    expect(compare("greaterThanValue", 0.2, null)).toBe(false);
  });

  test("compare function, operator: lowerThanValue", () => {
    expect(compare("lowerThanValue", 0.2, null)).toBe(false);
  });

  test("compare function, operator: false", () => {
    expect(compare("false", 0.2, null)).toBe(false);
  });

  test("compare function, operator: true", () => {
    expect(compare("true", 0.2, null)).toBe(true);
  });

  test("compare function, operator: noEqualValue", () => {
    expect(compare("noEqualValue", 0.2, null)).toBe(true);
  });
});

const dataItem = 2;

const bgSetting = [1, 2, 3, 4, 5];

const settings = {
  settings: [
    {
      operations: [1, 2],
    },
  ],
};

describe("getValueUpdate", () => {
  test("getValueUpdate function", () => {
    expect(getValueUpdate(bgSetting, dataItem)).toBe(null);
  });

  test("getValueUpdate function, with settings", () => {
    expect(getValueUpdate(settings, dataItem)).toBe(null);
  });
});

const validationSettings = [
  {
    operations: ["1", "2"],
  },
];

describe("getValidOverride", () => {
  test("getValidOverride function, settings null", () => {
    expect(getValidOverride(null, dataItem)).toBe("");
  });

  test("getValidOverride function, with settings", () => {
    expect(getValidOverride(validationSettings, dataItem)).toBe("");
  });
});

describe("getBgOverride", () => {
  test("getBgOverride function, no bgOverride", () => {
    expect(getBgOverride(null, dataItem)).toBe("");
  });

  test("getBgOverride function", () => {
    expect(getBgOverride([{ operations: [{ operator: "1" }] }], dataItem)).toBe("");
  });
});

describe("getValueOverride", () => {
  test("getValueOverride function, no getValueOverride value", () => {
    expect(getValueOverride(null, dataItem)).toBe("");
  });

  test("getValueOverride function", () => {
    expect(getValueOverride([{ operations: ["2"] }], dataItem)).toBe("");
  });
});
