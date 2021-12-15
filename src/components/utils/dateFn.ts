import { formatDate } from "@telerik/kendo-intl";

export function getGmt(date, createAll?) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  if (createAll) {
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return new Date(year, month, day, hour, minutes, seconds, milliseconds);
  }
  return new Date(year, month, day /* hour, minutes, seconds, milliseconds*/);
}

export function createDateObject(dateValue) {
  return dateValue ? (dateValue instanceof Date ? dateValue : new Date(dateValue)) : undefined;
}

export function createGmtDateObject(dateValue, createAll = false) {
  return dateValue ? (dateValue instanceof Date ? dateValue : getGmt(new Date(dateValue), createAll)) : undefined;
}

export function createIsoString(dateValue) {
  return dateValue && formatDate(createDateObject(dateValue), "yyy-MM-dd") + "T00:00:00.000" + "Z";
}

export function createIsoStringFromValue(dateValue) {
  return dateValue ? createDateObject(dateValue).toISOString() : null;
}

//Prevet object mutation
export function updateDateData(data) {
  const newObj = { ...data };
  //Dates objects without time component
  if (newObj.startDate && !(newObj.startDate instanceof Date)) newObj.startDate = createGmtDateObject(newObj.startDate);
  if (newObj.beginDate && !(newObj.beginDate instanceof Date)) newObj.beginDate = createGmtDateObject(newObj.beginDate);
  if (newObj.rateStartDate && !(newObj.rateStartDate instanceof Date)) newObj.rateStartDate = createGmtDateObject(newObj.rateStartDate);
  if (newObj.pendingDate && !(newObj.pendingDate instanceof Date)) newObj.pendingDate = createGmtDateObject(newObj.pendingDate);
  if (newObj.pendingStartDate && !(newObj.pendingStartDate instanceof Date)) newObj.pendingStartDate = createGmtDateObject(newObj.pendingStartDate);
  if (newObj.increaseEffectiveDate && !(newObj.increaseEffectiveDate instanceof Date))
    newObj.increaseEffectiveDate = createGmtDateObject(newObj.increaseEffectiveDate);
  if (newObj.decreaseEffectiveDate && !(newObj.decreaseEffectiveDate instanceof Date))
    newObj.decreaseEffectiveDate = createGmtDateObject(newObj.decreaseEffectiveDate);

  //Dates objects with time component
  if (newObj.endDate && !(newObj.endDate instanceof Date)) newObj.endDate = createGmtDateObject(newObj.endDate, true);
  if (newObj.rateEndDate && !(newObj.rateEndDate instanceof Date)) newObj.rateEndDate = createGmtDateObject(newObj.rateEndDate, true);
  if (newObj.pendingEndDate && !(newObj.pendingEndDate instanceof Date)) newObj.pendingEndDate = createGmtDateObject(newObj.pendingEndDate, true);
  if (newObj.createDate && !(newObj.createDate instanceof Date)) newObj.createDate = createGmtDateObject(newObj.createDate, true);
  if (newObj.changeDate && !(newObj.changeDate instanceof Date)) newObj.changeDate = createGmtDateObject(newObj.changeDate, true);
  if (newObj.rateModDate && !(newObj.rateModDate instanceof Date)) newObj.rateModDate = createGmtDateObject(newObj.rateModDate, true);
  if (newObj.rateChangeDate && !(newObj.rateChangeDate instanceof Date)) newObj.rateChangeDate = createGmtDateObject(newObj.rateChangeDate, true);

  return newObj;
}

//Function to get date object and set it to the last second of the day
export function setEndDayDate(date) {
  if (!date) return undefined;
  const endDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  endDay.setDate(endDay.getDate() + 1);
  endDay.setSeconds(endDay.getSeconds() - 1);
  return endDay;
}

export function setEndDayValidation(date) {
  if (!date) return undefined;
  const endDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  endDay.setDate(endDay.getDate());
  endDay.setSeconds(endDay.getSeconds() - 1);
  return endDay;
}

//Function to create date object for CustomDateInput
export const createDateForInput = (year, month, day) => {
  switch (true) {
    case year != null && month != null && day != null:
      return new Date(year.toString(), month, day);
    case year != null && month != null && day == null:
      return new Date(year.toString(), month);
    case year != null && month == null && day == null:
      return new Date(year.toString(), null, day);
    case year != null && month == null && day == null:
      return new Date(year.toString());
    case year == null && month != null && day != null:
      return new Date(null, month, day);
    case year == null && month != null && day == null:
      return new Date(null, month);
    case year == null && month == null && day != null:
      return new Date(null, null, day);
    default:
      return null;
  }
};
