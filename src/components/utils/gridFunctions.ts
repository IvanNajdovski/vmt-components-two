import { assignInitialValues } from ".";

export function disableGridAction(tableData, type) {
  const selectedData = tableData.filter((val) => val.selected);
  if (!type) {
    return true;
  }
  switch (type) {
    case "finalize":
      return tableData.some((val) => val.draft);
    case "selectedOne":
      return selectedData.length === 1;
    case "selected":
      return selectedData.length;
    case "selectedForCopy":
      return selectedData.length && selectedData.some((val) => !val.agreementRate && val.terminate !== "Y");
    case "selectedNotTerminated":
      return selectedData.length && selectedData.some((val) => val.terminate !== "Y");
    case "selectedNotTerminatedNoAgreement":
      return selectedData.length && selectedData.some((val) => val.terminate !== "Y" && !val.agreementRate);
    case "sameCountrySelected":
      return !selectedData.some((val, index, arr) => arr[0].country !== val.country || !val.floorRate) && selectedData.length;
    case "ratesTerminate":
      return (
        //Check if there are selected rows
        selectedData.length &&
        //Check if some of them are PV
        !selectedData.some((val) => val.product === "PV") &&
        //Check if there are origin groups and if all are selected
        Object.values(
          selectedData.reduce((acc, val) => {
            //Check if there is origin and origin group in row and check if in the previous array members alredy is check for that combination
            if (!(val.originGroupId || val.preferredRouteId)) return acc;
            const accumulatorKey = `${val.productId}${val.preferredRouteId}${val.originGroupId}`;
            if (acc.hasOwnProperty(accumulatorKey)) return acc;
            acc[accumulatorKey] = tableData
              .filter(
                (item) =>
                  item.productId === val.productId && item.preferredRouteId === val.preferredRouteId && item.originGroupId === val.originGroupId
              )
              .every((item) => item.selected);
            return acc;
          }, {})
        ).every(Boolean)
      );
    case "selected&noDestination&country":
      return selectedData.length && !selectedData.some((val) => val.shortName !== null && !(val.countryName || val.plRouteDesc));

    default:
      return !!tableData.length;
  }
}

export function gridModalData(tableData, type) {
  if (!type) {
    tableData.filter((val) => val.selected);
  }
  switch (type) {
    case "noDestination&CountryAttributes":
      return tableData.filter((val) => val.selected && (val.plRouteDesc || val.countryName));
    case "noDestination&CountryRates":
      return tableData.filter((val) => val.selected && (val.sellDestinations || val.country));
    case "noTerminatedNoAgreement":
      return tableData.filter((val) => val.selected && val.terminate !== "Y" && !val.agreementRate).map(assignInitialValues);
    case "copyTo":
      return {
        selectedValue: null,
        percentage: null,
      };
    default:
      return tableData.filter((val) => val.selected);
  }
}
