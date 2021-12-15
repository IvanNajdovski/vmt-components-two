import {
  getGmt,
  createDateObject,
  createGmtDateObject,
  createIsoString,
  updateDateData,
  setEndDayValidation,
  createDateForInput
} from "../dateFn";

const date = new Date("2021-06-06T22:00:00.000Z");

describe("getGmt", () => {
  test("getGmt function, createAll", () => {
    expect(getGmt(date, date)).toStrictEqual(new Date("2021-06-06T20:00:00.000Z"));
  });

  test("getGmt function", () => {
    expect(getGmt(date)).toStrictEqual(new Date("2021-06-05T22:00:00.000Z"));
  });

  test("createDateObject function", () => {
    expect(createDateObject(date)).toStrictEqual(new Date("2021-06-06T22:00:00.000Z"));
  });

  test("createGmtDateObject function", () => {
    expect(createGmtDateObject(date)).toStrictEqual(new Date("2021-06-06T22:00:00.000Z"));
  });

  test("createIsoString function", () => {
    expect(createIsoString(date)).toStrictEqual("2021-06-07T00:00:00.000Z");
  });

  test("updateDateData function, with own property startDate", () => {
    const data = { startDate: date };
    expect(updateDateData(data)).toStrictEqual({ startDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property beginDate", () => {
    const data = { beginDate: date };
    expect(updateDateData(data)).toStrictEqual({ beginDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property backupBeginDate", () => {
    const data = { backupBeginDate: date };
    expect(updateDateData(data)).toStrictEqual({ backupBeginDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property backupEndDate", () => {
    const data = { backupEndDate: date };
    expect(updateDateData(data)).toStrictEqual({ backupEndDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property endDate", () => {
    const data = { endDate: date };
    expect(updateDateData(data)).toStrictEqual({ endDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property createDate", () => {
    const data = { createDate: date };
    expect(updateDateData(data)).toStrictEqual({ createDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("updateDateData function, with own property pendingDate", () => {
    const data = { pendingDate: date };
    expect(updateDateData(data)).toStrictEqual({ pendingDate: new Date("2021-06-06T22:00:00.000Z") });
  });

  test("setEndDayValidation function, null data", () => {
    expect(setEndDayValidation(null)).toStrictEqual(undefined);
  });

  test("setEndDayValidation function", () => {
    expect(setEndDayValidation(new Date("10.10.2021 00:00:00"))).toStrictEqual(new Date("2021-10-09T21:59:59.000Z"));
  });

  test("createDateForInput function", () => {
    expect(createDateForInput("2021", "10", "10")).toStrictEqual(new Date("2021-11-09T23:00:00.000Z"));
  });

  test("createDateForInput function, day = null", () => {
    expect(createDateForInput("2021", "10", null)).toStrictEqual(new Date("2021-10-31T23:00:00.000Z"));
  });

  test("createDateForInput function, day = null, month = null", () => {
    expect(createDateForInput("2021", null, null)).toStrictEqual(new Date("2020-12-30T23:00:00.000Z"));
  });

  test("createDateForInput function, year = null", () => {
    expect(createDateForInput(null, "10", "10")).toStrictEqual(new Date("1900-11-09T23:00:00.000Z"));
  });

  test("createDateForInput function, year = null, day = null", () => {
    expect(createDateForInput(null, "10", null)).toStrictEqual(new Date("1900-10-31T23:00:00.000Z"));
  });

  test("createDateForInput function, year = null, month = null", () => {
    expect(createDateForInput(null, null, "10")).toStrictEqual(new Date("1900-01-09T23:00:00.000Z"));
  });

  test("createDateForInput function, default", () => {
    expect(createDateForInput(null, null, null)).toStrictEqual(null);
  });
});
