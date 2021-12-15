import React, { memo } from "react";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import DropDownList from "./CustomDropdown/CustomDropdown";
import CustomerDropdown from "./CustomerDropdown/CustomerDropdown";
import CustomerIdInput from "./CustomerIdInput/CustomerIdInput";
import CountriesMultiselect from "./CountiresMultiselect/CountriesMultiselect";
import RateModCountriesMultiselect from "./RateModCountiresMultiselect/RateModCountriesMultiselect";
import CustomDatePicker from "./CustomDatePicker/CustomDatePicker";
import CustomDateInput from "./CustomDateInput/CustomDateInput";
import CustomerColoComboBox from "./CustomerColoComboBox/CustomerColoComboBox";
import VirtualDropdown from "./VirtualDropdown/VirtualDropdown";
import CustomMultiSelect from "./CustomMultiSelect/CustomMultiSelect";
import CustomComboBox from "./CustomComboBox/CustomComboBox";
import VirtualMultiselect from "./VirtualMultiselect/VirtualMultiselect";
import CheckboxValueInput from "./CheckboxValueInput/CheckboxValueInput";

interface CustomInputInterface {
  inputComponent?: string;
  validityStyles?: boolean;
  data: any[];
  value: any;
  onChange: any;
  loading: any;
  editorId?: any;
  label: any;
  service: any;
}

const CustomInput: React.FC<CustomInputInterface> = memo((props) => {
  switch (props.inputComponent) {
    case "input":
      return <Input {...props} />;
    case "numericTextBox":
      return <NumericTextBox {...props} />;
    case "dropDownList":
      return <DropDownList {...props} />;
    case "customerDropdown":
      return <CustomerDropdown {...props} />;
    case "customerIdInput":
      return <CustomerIdInput {...props} />;
    case "customDatePicker":
      return <CustomDatePicker {...props} />;
    case "customDateInput":
      return <CustomDateInput {...props} />;
    case "countryMultiSelect":
      return <CountriesMultiselect {...props} />;
    case "rateModCountryMultiSelect":
      return <RateModCountriesMultiselect {...props} />;
    case "customerColo":
      return <CustomerColoComboBox {...props} />;
    case "customMultiSelect":
      return <CustomMultiSelect {...props} />;
    case "customComboBox":
      return <CustomComboBox {...props} />;
    case "checkbox":
      return <CheckboxValueInput {...props} />;
    case "virtualDropdown":
      //@ts-ignore
      return <VirtualDropdown {...props} />;
    case "virtualMultiselect":
      //@ts-ignore
      return <VirtualMultiselect {...props} />;
    default:
      return <Input />;
  }
});

export default CustomInput;
