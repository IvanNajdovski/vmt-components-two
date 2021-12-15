import React, { useEffect } from "react";
import { Pager } from "@progress/kendo-react-data-tools";

export const VirtualPager = (props) => {
  useEffect(() => {
    if (props.skip > props.total) {
      props.onPageChange({ dataState: { skip: 0 } });
    }
  }, [props.total, props.skip]);
  return <Pager {...props} />;
};
