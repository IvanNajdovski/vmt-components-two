import React, { useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Skeleton } from "@progress/kendo-react-indicators";
import { useInputVirtualization } from "../../hooks";
interface VirtualMultiselectProps {
  name: string;
  label: string;
  value: any[];
  textField: string;
  dataItemKey: string;
  keyFieldValue: string[];
  pageSize: number;
  selectedIds: any[];
  onChange: any;
  service: Function;
  required?: boolean;
  visited?: boolean;
}
const VirtualMultiselect: React.FC<VirtualMultiselectProps> = ({
  name,
  label,
  value,
  onChange,
  textField,
  dataItemKey,
  keyFieldValue,
  pageSize,
  service,
  ...props
}) => {
  const { data, loading, tableSkip, total, page, filter, pageChange, onFilterChange, getSlicedGridData } = useInputVirtualization(
    service,
    pageSize,
    textField,
    keyFieldValue
  );

  useEffect(() => {
    if (filter && !value) {
      onFilterChange({ filter: { value: "" } });
    }
  }, [value]);

  const itemRender = (li, itemProps) => {
    li.props.id = `${name}-${itemProps.dataItem[dataItemKey]}`;
    if (itemProps.dataItem.loading) {
      const loadingItem = <Skeleton shape={"text"} style={{ width: "100%" }} />;
      return React.cloneElement(li, li.props, loadingItem);
    }
    return React.cloneElement(li, li.props, li.props.children);
  };

  return (
    <DropDownList
      {...props}
      label={label}
      data={getSlicedGridData(data, tableSkip, pageSize, page)}
      loading={loading}
      value={value}
      name={name}
      onChange={onChange}
      textField={textField}
      dataItemKey={dataItemKey}
      filterable
      filter={filter}
      onFilterChange={onFilterChange}
      virtual={{
        pageSize: pageSize,
        skip: tableSkip,
        total,
      }}
      itemRender={itemRender}
      onPageChange={pageChange}
    />
  );
};

export default VirtualMultiselect;
