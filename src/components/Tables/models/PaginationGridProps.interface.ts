import { GridRowProps, GridSelectionChangeEvent } from "@progress/kendo-react-grid";

export interface PaginationGridProps {
  idField?: string;
  gridName?: string;
  tableDataSet: any;
  modalTable?: boolean;
  setDirty?: any;
  tableStateSort?: any[];
  onRowEdit?: boolean;
  columnsInfo?: any;
  columnsLock?: any;
  filterCells?: any;
  customCells?: any;
  selectable?: boolean;
  selectableField?: string;
  onItemChangeHandler?: Function;
  onUpdateNewRecordHandler?: Function;
  onSelectChangeHandler?: (event: GridSelectionChangeEvent) => void;
  onHeaderSelectionChangeHandler?: (event: GridSelectionChangeEvent) => void;
  mainActions?: any[];
  secondaryActions?: any[];
  onSaveHandler?: any;
  onModalOpen?: Function;
  loadingGrid?: boolean;
  inAddCells?: any;
  inAddProccess?: boolean;
  onUnmountHandler?: any;
  exportData?: any;
  createRecord?: boolean;
  copyRecord?: boolean;
  noColumnsWidth?: boolean;
  rowRender?: (row: React.ReactElement<HTMLTableRowElement, string | React.JSXElementConstructor<any>>, props: GridRowProps) => React.ReactNode;
  gridTooltip?: React.ReactElement;
  prompt?: string;
  validationRules?: any;
  gridLegend?: any;
  dense?: boolean;
}

export interface TableStateInterface {
  filter: {
    logic: "and" | "or";
    filters: any[];
  };
  sort: any[];
  skip: number;
  take: number;
}
