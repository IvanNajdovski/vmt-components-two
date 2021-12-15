import React from "react";
import { useHistory } from "react-router-dom";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { GridColumn, Grid } from "@progress/kendo-react-grid";

const ExportPDF = (props) => {
  const { location } = useHistory();
  return (
    <GridPDFExport
      paperSize={props.columns.length > 8 ? "A2" : "A4"}
      margin="0.5cm"
      landscape={true}
      scale={0.3}
      fileName={`VMT-Customer-RMS${location.pathname.replace(
        /\/|-/g,
        "-"
      )}.pdf`}
      ref={props.exportPDFRef}
    >
      <Grid
        pageable={{ pageSizes: [20, 50, 100] }}
        {...props.tableState}
        data={props.data}
      >
        {props.columns.map((val) => {
          if (val.field === "areas") {
            return (
              <GridColumn
                key={val.field}
                field={"areasValue"}
                title={val.title}
              />
            );
          } else if (val.field === "serviceAccessTypes") {
            return (
              <GridColumn
                key={val.field}
                field={"serviceAccessTypesValues"}
                title={val.title}
              />
            );
          }
          return (
            <GridColumn key={val.field} field={val.field} title={val.title} />
          );
        })}
      </Grid>
    </GridPDFExport>
  );
};

export default ExportPDF;
