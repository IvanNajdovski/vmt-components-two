import React, { useState } from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { useFilter } from "../../hooks/filter-hook";

const CountriesMultiselect = (props) => {
  const [loading, setLoading] = useState(false);
  const { data, filter, filterChange } = useFilter(props.data);

  const itemRender = (li, itemProps) => {
    li.props.id = `${props.name}-${itemProps.dataItem[props.dataItemKey]}`;
    return React.cloneElement(li, li.props, li.props.children);
  };

  const onChangeHandler = async (e) => {
    if (e.value.length) {
      setLoading(true);
      const selectedCountries = props.value.filter((val) => val.id).length;
      const eventSelectedCountries = e.value.filter((val) => val.id).length;
      try {
        if (eventSelectedCountries > selectedCountries) {
          const linkedCountries = await props.service({ id: e.value[e.value.length - 1].id });
          e.value = [...e.value, ...linkedCountries.data];
        } else if (eventSelectedCountries < selectedCountries) {
          const eventValueIds = e.value.map((val) => val.id);
          const linkedCountries = await props.service({ id: props.value.find((val) => !eventValueIds.includes(val.id)).id });
          const resCountriesId = linkedCountries.data.map((val) => val.id);
          e.value = e.value.filter((val) => !resCountriesId.includes(val.id));
        }
      } catch (err) {}
      setLoading(false);
    }
    props.onChange(e);
  };

  return (
    <MultiSelect
      {...props}
      onChange={onChangeHandler}
      data={data}
      filterable
      filter={filter}
      autoClose={false}
      onFilterChange={filterChange}
      loading={props.loading || loading}
      itemRender={itemRender}
    />
  );
};

export default CountriesMultiselect;
