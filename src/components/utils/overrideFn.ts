import { compareTypesEnum } from "../models";

export function compare(operator, valueForCompare, valueToCompare, value?) {
  switch (operator) {
    case compareTypesEnum.NotEqual:
      return valueForCompare != null && valueToCompare != null && valueForCompare !== valueToCompare;
    case compareTypesEnum.Equal:
      return valueForCompare != null && valueToCompare != null && valueForCompare === valueToCompare;
    case compareTypesEnum.GreaterOrEqual:
      return valueToCompare != null && valueForCompare != null && valueForCompare >= valueToCompare;
    case compareTypesEnum.LowerOrEqual:
      return valueToCompare != null && valueForCompare != null && valueForCompare <= valueToCompare;
    case compareTypesEnum.Greater:
      return valueToCompare != null && valueForCompare != null && valueForCompare > valueToCompare;
    case compareTypesEnum.Lower:
      return valueToCompare != null && valueForCompare != null && valueForCompare < valueToCompare;
    case compareTypesEnum.GreaterThanValue:
      return valueForCompare != null && valueForCompare != null && value != null && value != null && valueForCompare > value;
    case compareTypesEnum.LowerThanValue:
      return valueForCompare != null && valueForCompare != null && value != null && value != null && valueForCompare < value;
    case compareTypesEnum.Truthy:
      return !!valueForCompare;
    case compareTypesEnum.Falsy:
      return !valueForCompare;
    case compareTypesEnum.True:
      return valueForCompare != null;
    case compareTypesEnum.False:
      return valueForCompare == null;
    case compareTypesEnum.CompareValue:
      return valueForCompare === value;
    case compareTypesEnum.NotEqualValue:
      return valueForCompare !== value;
    default:
      return false;
  }
}

export const getBgOverride = (bgSetting, dataItem) => {
  if (!bgSetting) return "";
  return bgSetting.reduce((acc, setting) => {
    return setting.operations.every((val) => compare(val.operator, dataItem[val.field], dataItem[val.fieldToCompare], val.value))
      ? setting.resultValue
      : acc;
  }, "");
};

export const getValueOverride = (settings, dataItem) => {
  if (!settings) return "";
  return settings.reduce((acc, setting) => {
    return setting.operations.every((val) => compare(val.operator, dataItem[val.field], dataItem[val.fieldToCompare], val.value))
      ? setting.displayValue
      : acc;
  }, "");
};

export const getValueUpdate = (settings, dataItem) => {
  if (!settings.settings) return null;
  return settings.settings.reduce((acc, setting) => {
    return setting.operations.every((val) => compare(val.operator, dataItem[val.field], dataItem[val.fieldToCompare], val.value))
      ? setting.value
      : acc;
  }, settings.default || null);
};

export const getValidOverride = (bgSetting, dataItem) => {
  if (!bgSetting) return "";
  return bgSetting.reduce((acc, setting) => {
    return setting.operations.every((val) => compare(val.operator, dataItem[val.field], dataItem[val.fieldToCompare], val.value))
      ? setting.resultValue
      : acc;
  }, "");
};
