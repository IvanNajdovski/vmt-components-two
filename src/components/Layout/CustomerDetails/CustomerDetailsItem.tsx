import React from "react";
import { Skeleton } from "@progress/kendo-react-indicators";
import { formatDate } from "@telerik/kendo-intl";

const CustomerDetailsItem = ({ customerDetails, data, loading }) => {
  return (
    <div className="list-group-item">
      <div className="row">
        {customerDetails.map((element, index) => {
          return (
            <div className="col-lg-12" key={index}>
              <div className="row">
                <div className="col-lg-14">{element.title}</div>
                <div className="col-lg-10 font-weight-bold">
                  {loading ? (
                    <Skeleton shape={"text"} style={{ width: "100%" }} />
                  ) : Array.isArray(data[element.field]) ? (
                    data[element.field].map((val) => val[element.keyField]).join(", ") || element.noData
                  ) : element.type === "date" ? (
                    data[element.field] ? (
                      formatDate(new Date(data[element.field]), "dd/MMM/yyyy")
                    ) : (
                      element.noData
                    )
                  ) : (
                    element.values[data[element.field]] || data[element.field] || element.noData
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerDetailsItem;
