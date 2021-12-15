import React from "react";

const AdditionalValues = ({ dataItem, options, ...props }) => {
  const { additionalValues, separator } = options;
  return (
    <React.Fragment>
      {dataItem[props.field] &&
        additionalValues
          .map((valueKey) => dataItem[valueKey])
          .filter(Boolean)
          .join(separator)}
    </React.Fragment>
  );
};

export default AdditionalValues;
