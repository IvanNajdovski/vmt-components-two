import { compare } from ".";

const compareFn = (validationSet, dataItem) =>
  validationSet.every((validationRule) => {
    const compareResult = compare(
      validationRule.operator,
      dataItem[validationRule.field],
      dataItem[validationRule.fieldToCompare],
      validationRule.value
    );
    if (compareResult) {
      if (!validationRule.conditionsIfTrue) {
        return compareResult;
      } else {
        return compareFn(validationRule.conditionsIfTrue, dataItem);
      }
    } else {
      if (!validationRule.conditionsIfFalse) {
        return compareResult;
      } else {
        return compareFn(validationRule.conditionsIfFalse, dataItem);
      }
    }
  });

export const checkValidation = (dataItem, validation) => validation.validationRules.some((validationSet) => compareFn(validationSet, dataItem));
