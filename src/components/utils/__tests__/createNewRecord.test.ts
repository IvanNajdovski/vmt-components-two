import { createNewRecord } from "..";

const data = {
  id: "1",
};

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(2021, 3, 1));
});

afterAll(() => {
  jest.useRealTimers();
});

describe("createNewRecord", () => {
  test("createNewRecord function, new empty record", () => {
    expect(createNewRecord({ record: "" }, -1, "new")).toStrictEqual({
      "-1": -1,
      createDate: new Date("2021-03-31T22:00:00.000Z"),
      record: "",
      startDate: new Date("2021-03-31T22:00:00.000Z"),
      beginDate: new Date("2021-03-31T22:00:00.000Z"),
    });
  });

  test("createNewRecord function, new with array value", () => {
    expect(createNewRecord({ record: [1.5] }, -1, "new")).toStrictEqual({
      "-1": -1,
      createDate: new Date("2021-03-31T22:00:00.000Z"),
      record: null,
      startDate: new Date("2021-03-31T22:00:00.000Z"),
      beginDate: new Date("2021-03-31T22:00:00.000Z"),
    });
  });

  test("createNewRecord function, new number record", () => {
    expect(createNewRecord({ record: 12 }, -1, "new")).toStrictEqual({
      "-1": -1,
      createDate: new Date("2021-03-31T22:00:00.000Z"),
      record: null,
      startDate: new Date("2021-03-31T22:00:00.000Z"),
      beginDate: new Date("2021-03-31T22:00:00.000Z"),
    });
  });

  test("createNewRecord function, new boolean reacord", () => {
    expect(createNewRecord({ record: false }, -1, "new")).toStrictEqual({
      "-1": -1,
      createDate: new Date("2021-03-31T22:00:00.000Z"),
      record: false,
      startDate: new Date("2021-03-31T22:00:00.000Z"),
      beginDate: new Date("2021-03-31T22:00:00.000Z"),
    });
  });

  test("createNewRecord function, copy", () => {
    expect(createNewRecord(12, -1, "copy")).toStrictEqual({
      "-1": -1,
      changeDate: new Date("2021-03-31T22:00:00.000Z"),
      createDate: new Date("2021-03-31T22:00:00.000Z"),
      endDate: null,
      startDate: new Date("2021-03-31T22:00:00.000Z"),
      beginDate: new Date("2021-03-31T22:00:00.000Z"),
    });
  });

  // test("createNewRecord function, save", () => {
  //     expect(createNewRecord(12, -1, "save")).toStrictEqual({"-1": 123213, "draft": true});
  // });

  test("createNewRecord function, default", () => {
    expect(createNewRecord(12, -1, "")).toStrictEqual(12);
  });
});
