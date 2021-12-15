interface Reducer {
  type: string;
  value: any;
  data: any;
}

export interface FiltersInterface {
  data?: any;
  inputs: any;
  state: any;
  dispatch: Function;
}
