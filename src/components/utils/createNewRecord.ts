const emptyRecord = (record) =>
  Object.keys(record).reduce((acc, key) => {
    if (!record[key]) {
      acc[key] = record[key];
    } else if (typeof record[key] === "string") {
      acc[key] = "";
    } else if (typeof record[key] === "number") {
      acc[key] = null;
    } else if (typeof record[key] === "boolean") {
      acc[key] = false;
    } else {
      acc[key] = null;
    }
    return acc;
  }, {});

export function createNewRecord(record, idField, type) {
  const today = new Date();

  switch (type) {
    case "new":
      return {
        ...emptyRecord(record),
        [idField]: -1,
        startDate: today,
        createDate: today,
        beginDate: today,
      };
    case "copy":
      return {
        ...record,
        [idField]: -1,
        startDate: today,
        createDate: today,
        beginDate: today,
        changeDate: today,
        endDate: null,
      };
    case "save":
      return {
        ...record,
        [idField]: Math.random() * 1000 + Math.random(),
        draft: true,
        updateType: "create",
      };
    default:
      return record;
  }
}
