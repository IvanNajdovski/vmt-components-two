export function getUpdateEventValue(e) {
  let value = {};
  if (e.value && typeof e.value === "object" && !(e.value instanceof Date)) {
    Object.keys(e.value).forEach((val) => {
      value[val] = e.value[val];
    });
  } else {
    value[e.field] = e.value;
  }
  return value;
}
