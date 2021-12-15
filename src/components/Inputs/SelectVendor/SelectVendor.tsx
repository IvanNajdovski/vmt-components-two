import React, { useState, useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const SelectVendor = (props) => {
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
    <DropDownList
      label="Vendor"
      textField="vendorDisplay"
      dataItemKey="id"
      name={"selectedVendor"}
      loading={props.loading}
      data={state.subsetData}
      value={props.value}
      onChange={props.onChange}
      filterable
      filter={filter}
      onFilterChange={filterChange}
      virtual={{
        total: state.total,
        pageSize: pageSize,
        skip: state.skip,
      }}
      onPageChange={pageChange}
    />
  );
};

export default SelectVendor;
