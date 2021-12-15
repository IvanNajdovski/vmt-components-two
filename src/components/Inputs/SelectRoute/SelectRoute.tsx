import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";

const textField = "routeDisplay";
const keyField = "id";
const pageSize = 20;
const total = 20000;
const emptyItem = { [textField]: "loading ..." };
let requestTimer;
const loadingData = [];
while (loadingData.length < pageSize) {
  loadingData.push({ ...emptyItem });
}

const SelectRoutes = (props) => {
  const { selectedCountries } = props;
  const [total, setTotal] = useState(0);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [skipIndex, setSkipIndex] = useState(0);
  const [tableSkip, setTableSkip] = useState(0);
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    total: 0,
    value: null,
    filter: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await requestData(0, "");
      } catch {}
    }
    if (selectedCountries.length && selectedCountries[0].id !== "all") {
      fetchData();
    } else {
      setData([]);
    }
  }, [selectedCountries]);

  const requestData = async (skip, filter) => {
    const countriesIds = props.selectedCountries.map((val) => val.id).filter((val) => val !== "all");

    if (requestInProgress) {
      return;
    }

    setRequestInProgress(true);
    const page = Math.floor(skip / pageSize);
    const nextPage = page + 1;

    const promiseResponse = await Promise.all([
      // getRoutes(countriesIds, { size: pageSize, page: page.toString() }),
      // getRoutes(countriesIds, { size: pageSize, page: nextPage.toString() }),
    ]);
    const { totalCount } = promiseResponse[0].data;
    const data = [...promiseResponse[0].data.data, ...promiseResponse[1].data.data];
    const items = data.map((item, index) => ({
      ...item,
      index: index + Math.floor(skip / pageSize) * pageSize,
      routeDisplay: `${item.operator ? item.operator + " - " : ""}${item.routeDescription} (${item.id})`,
    }));
    if (total !== totalCount) {
      setTotal(totalCount);
    }
    setRequestInProgress(false);
    setData(items);
    const skipIndex = items.findIndex((val) => val.index === skip);
    setSkipIndex(skipIndex);
  };

  async function requestIfNeeded(skip, filter, reverse) {
    const index = data.findIndex((val) => (reverse && skip >= 0 ? val.index === skip : val.index === skip + 14));
    if (index < 0) {
      await requestData(skip, "");
    } else {
      const skipIndex = data.findIndex((val) => val.index === skip);
      setSkipIndex(skipIndex);
    }
  }

  const onFilterChange = (event) => {
    const filter = event.filter.value;
    requestData(0, filter);
    setTableSkip(0);
    setState((prevState) => ({
      ...prevState,
      filter: filter,
    }));
  };

  const pageChange = (event) => {
    const skip = event.page.skip;
    setTableSkip(skip);
    requestIfNeeded(event.page.skip, "", skip < tableSkip);
  };
  return (
    <MultiSelect
      label={"Routes"}
      data={props.selectedCountries.length ? data.slice(skipIndex, skipIndex + pageSize) : [{ id: "all", routeDisplay: "All Routes" }]}
      value={props.value}
      onChange={props.onChange}
      textField={textField}
      dataItemKey={keyField}
      filterable
      onFilterChange={onFilterChange}
      virtual={{
        pageSize: pageSize,
        skip: tableSkip,
        total,
      }}
      onPageChange={pageChange}
      required
    />
  );
};

export default SelectRoutes;
