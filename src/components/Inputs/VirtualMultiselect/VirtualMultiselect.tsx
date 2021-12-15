import React from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Skeleton } from "@progress/kendo-react-indicators";
import { useInputVirtualization } from "../../hooks";
interface CustomerMultiselectProps {
  name: string;
  label: string;
  value: any[];
  textField: string;
  keyField: string;
  keyFieldValue: string[];
  pageSize: number;
  selectedIds: any[];
  onChange: any;
  service: Function;
  additionalValues?: any[];
  valid?: boolean;
  validityStyles?: boolean;
  validationMessage?: string;
}
const CustomerMultiselect: React.FC<CustomerMultiselectProps> = ({
  name,
  label,
  value,
  onChange,
  textField,
  keyField,
  keyFieldValue,
  pageSize,
  service,
  additionalValues,
  valid,
  validityStyles,
  validationMessage,
}) => {
  const { data, loading, tableSkip, total, page, pageChange, onFilterChange, getSlicedGridData } = useInputVirtualization(
    service,
    pageSize,
    textField,
    keyFieldValue
  );
  const itemRender = (li, itemProps) => {
    li.props.id = `${name}-${itemProps.dataItem[keyField]}`;
    if (itemProps.dataItem.loading) {
      const loadingItem = <Skeleton shape={"text"} style={{ width: "100%" }} />;
      return React.cloneElement(li, li.props, loadingItem);
    }
    return React.cloneElement(li, li.props, li.props.children);
  };
  return (
    <MultiSelect
      label={label}
      data={getSlicedGridData(additionalValues ? [...additionalValues, ...data] : data, tableSkip, pageSize, page)}
      loading={loading}
      value={value}
      name={name}
      onChange={onChange}
      textField={textField}
      dataItemKey={keyField}
      filterable
      onFilterChange={onFilterChange}
      virtual={{
        pageSize: pageSize,
        skip: tableSkip,
        total,
      }}
      valid={valid}
      validityStyles={validityStyles}
      validationMessage={validationMessage}
      onPageChange={pageChange}
      itemRender={itemRender}
    />
  );
};

export default CustomerMultiselect;
