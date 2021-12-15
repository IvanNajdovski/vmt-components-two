//@ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { filterBy } from "@progress/kendo-data-query";

export const useFilter = (dataObj) => {
  const [data, setData] = useState(dataObj);
  const [exportedData, setExportedData] = useState(dataObj);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setData(dataObj);
    setExportedData(dataObj);
  }, [dataObj]);

  const updateData = (data) => {
    setData(data);
  };

  const filterData = (filter, data) => {
    return filterBy(data, filter);
  };

  const filterChange = (event) => {
    setData(filterData(event.filter, exportedData));
    setFilter(event.filter.value);
  };

  const onSetFilter = useCallback((filter) => {
    setFilter(filter);
  }, []);

  return { data, filter, updateData, filterChange, onSetFilter };
};
