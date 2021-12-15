import React, { useMemo } from "react";
import { Skeleton } from "@progress/kendo-react-indicators";
import CustomerDetailsItem from "./CustomerDetailsItem";
import { main, extended } from "./CustomerDetailsList.json";

export const CustomerDetails = ({ data, loading = false }: { data: any; loading?: boolean }) => {
  const customerData = useMemo(() => {
    return data ? { ...data, accountManager: data.accountManager ? data.accountManager.firstName + data.accountManager.lastName : "" } : data;
  }, [data]);

  return (
    <div className="deal-details w-100">
      <details className="card flex-fill">
        <summary className="card-header d-flex align-items-center">
          <i className="fa fas fa-list mr-2"></i>
          <span className="text-uppercase mr-4 mr-auto">Customer Details</span>
          {loading ? (
            <Skeleton shape={"text"} className={"w-75 mx-2"} />
          ) : (
            <React.Fragment>
              {main.map((element, index) => {
                return (
                  <span className={`bg-light py-1 px-2 rounded-lg ${main.length - 1 === index ? "ml-2 mr-3" : "mx-2"}`} key={index}>
                    <span>{element.title} </span>
                    <strong>
                      {customerData[element.field] ? element.values[customerData[element.field]] || customerData[element.field] : element.noData}
                    </strong>
                  </span>
                );
              })}
            </React.Fragment>
          )}
        </summary>
        <div className="list-group list-group-flush position-absolute shadow-lg w-100 z-index-sticky">
          {extended.map((element, index) => (
            <CustomerDetailsItem customerDetails={element} data={customerData} loading={loading} key={index} />
          ))}
        </div>
      </details>
    </div>
  );
};
