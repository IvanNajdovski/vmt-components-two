import { createGmtDateObject } from "./dateFn";

export function compareObjectValues(value, valueToCompare) {
  const valuesToNotCompare = ["updateType", "selected", "draft"];
  if (!value) return false;
  return Object.keys(value).some((val) => {
    if (valuesToNotCompare.includes(val) || val.startsWith("_")) {
      return false;
    } else if (valueToCompare[val] instanceof Date) {
      const valueToCompareYear = valueToCompare[val].getFullYear();
      const valueToCompareMonth = valueToCompare[val].getMonth();
      const valueToCompareDate = valueToCompare[val].getDate();
      if (value[val]) {
        const valueDate = createGmtDateObject(value[val]);
        const valueYear = valueDate.getFullYear();
        const valueMonth = valueDate.getMonth();
        const valueDay = valueDate.getDate();
        return valueToCompareYear !== valueYear || valueToCompareMonth !== valueMonth || valueToCompareDate !== valueDay;
      }
      return !!valueToCompareYear || !!valueToCompareMonth || !!valueToCompareDate;
    }
    return value[val] != valueToCompare[val];
  });
}

export function compareObject(obj) {
  return Object.keys(obj).some((key) => {
    if (!key.includes("_")) {
      return obj[key] != obj[`_${key}`];
    }
    return false;
  });
}

export function resetObject(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = !key.includes("_") ? obj[`_${key}`] : obj[key];
    return acc;
  }, {});
}
