import { columnsWidth, columnsValuePosition, valueFormat } from ".";

export const getColumns = (data, info, savedColumns) => {
  if (savedColumns) return savedColumns;
  if (!info && data && data.length) {
    return Object.keys(data[0]).map((val) => ({
      label: val,
      field: val,
    }));
  } else if (info) {
    return info.map((val) => ({
      ...val,
      className: val.className || columnsValuePosition[val.field] || "text-center",
      format: val.format || (valueFormat[val.field] ? valueFormat[val.field] : undefined),
      width: val.width || columnsWidth[val.field],
    }));
  } else {
    return [];
  }
};
