export interface GridProps {
  tableDataSet: any;
  modalTable?: boolean;
  columnsInfo?: any;
  customCells?: any;
  selectable?: boolean;
  onItemChangeHandler?: Function;
  mainActions?: any[];
  secondaryActions?: any[];
  idField?: string;
  onModalOpen?: Function;
  loadingGrid?: boolean;
  inEditCells?: any;
  inAddCells?: any;
  inAddProccess?: boolean;
  onUnmountHandler?: any;
}

export interface TableStateInterface {
  filter: {
    logic: "and" | "or";
    filters: any[];
  };
  sort: any[];
}
