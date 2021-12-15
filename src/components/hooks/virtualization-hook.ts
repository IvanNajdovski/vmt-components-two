//@ts-nocheck
import { useState, useEffect } from "react";
let requestTimer;

export const useVirtualization = (fetchData, pageSize) => {
  const [params, setParams] = useState(null);
  const [data, setData] = useState([]);
  const [tableSkip, setTableSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const requestData = (skipParameter) => {
    fetchData.abortRequest();
    const page = Math.floor(skipParameter / pageSize);
    const nextPage = page + 1;
    Promise.all([
      fetchData.sendRequest({ ...params, page: page, size: pageSize }),
      fetchData.sendRequest({ ...params, page: nextPage, size: pageSize }),
    ])
      .then((promiseResponse) => {
        const { totalElements: totalCount } = promiseResponse[0].data;
        const data = [...promiseResponse[0].data.content, ...promiseResponse[1].data.content];
        const items = data
          .sort((a, b) => a.country.localeCompare(b.country))
          .map((item, i) => {
            const recordNumber = i + Math.floor(skipParameter / pageSize) * pageSize;
            return { ...item, id: recordNumber };
          });
        if (total !== totalCount) {
          setTotal(totalCount);
        }
        setPage(page);
        setData(items);
      })
      .catch((err) => {});
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
          slicedData.fill({}, slicedDataLength, 20);
        }
      }
      return slicedData;
    } else if (sliceIndex > -20) {
      const slicedData = data.slice(0, 0 + 20 + sliceIndex);
      const newArr = new Array(20 - slicedData.length).fill({});
      return [...newArr, ...slicedData];
    } else {
      return new Array(20).fill({});
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await requestData(0);
      } catch {}
    }

    if (!!params) {
      fetchData();
    } else {
      setData([]);
      setPage(0);
      setTotal(0);
      setTableSkip(0);
    }
  }, [!!params]);

  return {
    data,
    tableSkip,
    total,
    page,
    setData,
    pageChange,
    getSlicedGridData,
    setParams,
  };
};
