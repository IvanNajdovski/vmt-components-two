import React, { useState, useEffect } from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";

const CustomerColoComboBox = (props) => {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  const filterData = (filter) => {
    return filterBy(props.data, filter);
  };

  const fetchCustomerHandler = async (e) => {
    try {
      const customerData = await props.service(e.value.coloCode);
      const customers = customerData.data.map((customer) => ({ ...customer, customerName: `${customer.customerName} - ${customer.customerId}` }));
      if (!customers.length) return;
      if (!props.data || customers[0].customerId !== props.data.customerId) {
        props.onChange({ value: { ...customers[0], coloCode: e.value.coloCode }, target: { name: "customer" } });
        setFilteredData(customers[0].coloCodes);
      }
    } catch {}
  };

  const onFilterChangeHandler = async (e) => {
    setFilter(e.filter.value);
    setFilteredData(filterData(e.filter));
    if (e.filter.value.length === 4) await fetchCustomerHandler(e);
  };

  const onChange = async (e) => {
    setFilter(e.value.coloCode);

    if (e.value.coloCode) await fetchCustomerHandler(e);
  };

  useEffect(() => {
    if (props.value && props.value.coloCode !== filter) {
      setFilter(props.value.coloCode);
      setFilteredData(props.data);
    } else if (props.data.length !== 0 && props.data.length < 5) {
      setFilter(props.data[0].coloCode);
      setFilteredData(props.data)
    } else if (!props.value) {
      setFilter("");
    }
  }, [props.value, props.data]);

  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey] || props.value}`;
    return React.cloneElement(li, li.props, li.props.children);
  };

  return (
    <ComboBox
      {...props}
      filterable
      filter={filter}
      onChange={onChange}
      onFilterChange={onFilterChangeHandler}
      allowCustom={true}
      clearButton={false}
      data={filter ? filteredData : props.data}
      disabled={props.loading || props.disabled}
      itemRender={itemRender}
    />
  );
};

export default CustomerColoComboBox;
