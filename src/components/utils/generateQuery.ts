type GenerateQuery = (n: object) => string;
export const generateQuery: GenerateQuery = (params) =>
  params && Object.entries(params).length > 0
    ? Object.entries(params).reduce((acc, [key, val]) => {
        if (val == null || (Array.isArray(val) && !val.length)) return acc;
        return acc + `${acc ? "&" : "?"}${key}=${val}`;
      }, "")
    : "";
