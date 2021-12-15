interface Input {
  wrapperClassName: string;
  label: string;
  name: string;
  textField?: string;
  dataItemKey?: string;
  inputComponent: string;
  dataField?: string;
  dataFromState?: boolean;
}

interface InputGroup {
  group: boolean;
  inputs: Input[];
  actions: any;
}

export interface Inputs {
  fieldsetName?: string;
  rowStyle?: string;
  inputGroup: InputGroup[];
}

export interface FormInterface {
  reducer: any;
  initialInputs: any;
  state: any;
  dispatch: Function;
  inputs: Inputs[];
  onSubmit: any;
  onReset: any;
  data?: any;
  children?: any;
  loading?: any;
  disabled?: any;
  dateLimits?: any;
  required?: any;
  services: any;
  onChangeHandler: Function;
  onChangeServices?: Function;
  toggleable?: Boolean;
}
