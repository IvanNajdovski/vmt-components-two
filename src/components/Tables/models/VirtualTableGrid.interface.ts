import { GridRowProps } from "@progress/kendo-react-grid";

export interface VirtualGridProps {
  modalColumnsInfo: any;
  modalCustomCells: any;
  fetchData: any;
  params: {};
  startFetching: boolean;
  columnsInfo?: any;
  pageSize: number;
  secondaryActions: any[];
  mainActions: any[];
  customCells?: any;
  selectable?: boolean;
  onModalOpen?: any;
  onItemChangeHandler?: Function;
  idField?: string;
  tableDataSet?: any;
}

export interface FloorVirtualGridProps {
  dataSet?: any;
  tableStateSort?: any[];
  modalColumnsInfo: any;
  modalCustomCells: any;
  fetchData: any;
  params: {};
  startFetching: boolean;
  columnsInfo?: any;
  pageSize: number;
  secondaryActions: any[];
  mainActions: any[];
  filterCells?: any;
  customCells?: any;
  selectable?: boolean;
  selectableField?: string;
  onModalOpen?: any;
  onItemChangeHandler?: Function;
  onUpdateItemAdditionalValuesHadler?: Function;
  onSaveEdited?: Function;
  idField?: string;
  tableDataSet?: any[];
  exportData: any;
  onSelect?: any;
  loadingGrid?: boolean;
  columnsLock?: boolean;
  noColumnsWidth?: boolean;
  gridName?: string;
  rowRender?: (row: React.ReactElement<HTMLTableRowElement, string | React.JSXElementConstructor<any>>, props: GridRowProps) => React.ReactNode;
  prompt?: string;
  gridLegend?: any;
  hasEditedRecords?: boolean;
  dense?: boolean;
  filterConditions?: any;
}

export interface TableStateInterface {
  filter: {
    logic: "and" | "or";
    filters: any[];
  };
  sort: any[];
}
