export function filterCaseAll(data: { id: number | string }[]) {
  return data.length
    ? data[data.length - 1].id === "all"
      ? [data[data.length - 1]]
      : data.length > 1
      ? data.filter((val) => val.id !== "all")
      : data
    : [];
}

export function filterDuplicateValues(data, field) {
  return data.reduce(
    (acc, val) => {
      if (val.hasOwnProperty(field) && !acc.uniqueList.includes(val[field])) {
        acc.uniqueList.push(val[field]);
        acc.data.push(val);
      }
      return acc;
    },
    { data: [], uniqueList: [] }
  ).data;
}
