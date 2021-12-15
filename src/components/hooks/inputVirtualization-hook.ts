//@ts-nocheck
import { useState, useEffect } from "react";
let requestTimer;
export const useInputVirtualization = (fetchData, pageSize, textField, keyFieldValue) => {
  const [params, setParams] = useState({ pattern: "" });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [tableSkip, setTableSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const emptyItem = { [textField]: "loading ...", loading: true };

  const requestData = (skipParameter) => {
    fetchData.abortRequest();
    setLoading(true);
    const page = Math.floor(skipParameter / pageSize);
    const nextPage = page + 1;
    Promise.all([
      fetchData.sendRequest({ ...params, page: page, size: pageSize }),
      fetchData.sendRequest({ ...params, page: nextPage, size: pageSize }),
    ])
      .then((promiseResponse) => {
        const { totalElements: totalCount } = promiseResponse[0].data;
        const data = [...promiseResponse[0].data.content, ...promiseResponse[1].data.content];
        const items = data.map((item, i) => {
          const recordNumber = i + Math.floor(skipParameter / pageSize) * pageSize;
          return { ...item, [textField]: `${keyFieldValue.map((val) => item[val]).join(" - ")}`, id: recordNumber };
        });
        if (total !== totalCount) {
          setTotal(totalCount);
        }
        setPage(page);
        setData(items);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const requestIfNeeded = (skip, reverse) => {
    if (reverse && skip < page * pageSize) {
      clearTimeout(requestTimer);
      requestTimer = setTimeout(() => {
        requestData(skip);
      }, 300);
    } else if (skip + pageSize > (page + 2) * pageSize) {
      clearTimeout(requestTimer);
      requestTimer = setTimeout(() => {
        requestData(skip);
      }, 300);
    }
  };
  const pageChange = (event) => {
    if (params) {
      const skip = event.page.skip;
      setTableSkip(skip);
      requestIfNeeded(event.page.skip, skip < tableSkip);
    }
  };
  const getSlicedGridData = (data, tableSkip, pageSize, page) => {
    if (!data.length) {
      return data;
    }
    const sliceIndex = tableSkip - pageSize * page;
    if (sliceIndex >= 0) {
      const slicedData = data.slice(sliceIndex, sliceIndex + 20);
      if (total > tableSkip + pageSize) {
        if (slicedData.length < 15) {
          const slicedDataLength = slicedData.length;
          slicedData.length = 20;
          slicedData.fill(emptyItem, slicedDataLength, 20);
        }
      }
      return slicedData;
    } else if (sliceIndex > -20) {
      const slicedData = data.slice(0, 0 + 20 + sliceIndex);
      const newArr = new Array(20 - slicedData.length).fill(emptyItem);
      return [...newArr, ...slicedData];
    } else {
      return new Array(20).fill(emptyItem);
    }
  };
  const onFilterChange = (event) => {
    const filter = event.filter.value;
    setFilter(filter);
    setParams({ ...params, pattern: filter });
    pageChange({ page: { skip: 0 } });
    setTableSkip(0);
  };

  useEffect(() => {
    clearTimeout(requestTimer);
    requestTimer = setTimeout(() => {
      requestData(tableSkip);
    }, 500);
  }, [filter]);

  return {
    data,
    tableSkip,
    total,
    page,
    setData,
    pageChange,
    getSlicedGridData,
    setParams,
    filter,
    onFilterChange,
    loading,
  };
};
