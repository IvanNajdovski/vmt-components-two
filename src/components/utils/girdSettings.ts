export const gridFilter = {
  //return values can be text for strings, numeric for numbers, boolean for booleans, date for dates
  //Numeric values
  //Boolean values
  //Date values
};

export const customCell = {
  //Date values
};

export const columnsValuePosition = {
  //return values can be text for strings, numeric for numbers, boolean for booleans, date for dates
  //Numeric values align right
  country: "text-left",
  countryName: "text-left",
  plRouteDesc: "text-left",
  productDesc: "text-left",
  sellDestination: "text-left",
  originGroup: "text-left",
  origin: "text-left",
  floorOrigin: "text-left",
};

export const valueFormat = {
  //return values can be text for strings, numeric for numbers, boolean for booleans, date for dates
  currentCost: "0.######",
  floorRate: "0.####",
  beginDate: "{0:dd/MMM/yyyy}",
  startDate: "{0:dd/MMM/yyyy}",
  endDate: "{0:dd/MMM/yyyy HH:mm:ss}",
  createDate: "{0:dd/MMM/yyyy}",
  changeDate: "{0:dd/MMM/yyyy}"
};

export const exportFormat = {
  //return values can be text for strings, numeric for numbers, boolean for booleans, date for dates
  //Export format date without time component
  startDate: "DD-MMM-YYYY",
  beginDate: "DD-MMM-YYYY",
  rateStartDate: "DD-MMM-YYYY",
  pendingDate: "DD-MMM-YYYY",
  createDate: "DD-MMM-YYYY",
  changeDate: "DD-MMM-YYYY",
  pendingStartDate: "DD-MMM-YYYY",
  increaseEffectiveDate: "DD-MMM-YYYY",
  decreaseEffectiveDate: "DD-MMM-YYYY",

  //Export format date with time component
  endDate: "DD-MMM-YYYY HH:MM",
  rateEndDate: "DD-MMM-YYYY HH:MM",
  pendingEndDate: "DD-MMM-YYYY HH:MM",
  rateModDate: "DD-MMM-YYYY HH:MM",
  rateChangeDate: "DD-MMM-YYYY HH:MM",

  //Export format numbers
  currentCost: "0.######",
};

export const excludeColumns = {};

export const columnsWidth = {
  country: 150,
  countryCurrency: 100,
  destination: 200,
  sellDestination: 200,
  customerOrigin: 150,
  timeOfDay: 100,
  obrGroup: 150,
  CRMP: 75,
  period: 75,
  settlementRate: 100,
  dealFlag: 75,
  pufType: 75,
  manualFlag: 150,
  product: 130,
  pufRate: 75,
  originGroup: 210,
  origin: 210,
  floorRate: 130,
  currentRate: 100,
  newRate: 150,
  customerRate: 100,
  changes: 100,
  exceptionFlag: 150,
  warning: 150,
  pendingRate: 100,
  ampm: 100,
  acpm: 100,
  terminated: 100,
  markup: 200,
  markupPer: 200,
  floorCost: 200,
  floorOrigin: 250,
};
