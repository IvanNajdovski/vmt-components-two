export function assignInitialValues(obj) {
  return Object.assign(
    obj,
    Object.entries(obj).reduce((acc, [key, val]) => {
      acc[`_${key}`] = val;
      return acc;
    }, {})
  );
}
