import React, { useState, useEffect } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const SelectCountry = (props) => {
  const { data, filter, filterChange } = useFilter(props.data);

  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [state, setState] = useState({
    skip: 0,
    total: total,
    subsetData: data.slice(0, pageSize),
  });

  useEffect(() => {
    setTotal(props.data.length);
    setState({
      skip: 0,
      total: total,
      subsetData: data.slice(0, pageSize),
    });
  }, [data, total]);

  const pageChange = (event) => {
    const skip = event.page.skip;
    const take = event.page.take;
    const newSubsetData = data.slice(skip, skip + take);

    setState({
      subsetData: newSubsetData,
      skip: skip,
      total: total,
    });
  };

  return (
    <MultiSelect
      label="Countries"
      dataItemKey="id"
      textField="name"
      name={"selectedCountries"}
      loading={props.loading}
      data={data}
      value={props.value}
      filterable
      filter={filter}
      onFilterChange={filterChange}
      onChange={props.onChange}
      virtual={{
        total: state.total,
        pageSize: pageSize,
        skip: state.skip,
      }}
      required
      onPageChange={pageChange}
    />
  );
};

export default SelectCountry;
