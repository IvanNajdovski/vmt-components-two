import React, { useMemo } from "react";
import { Link, Route } from "react-router-dom";
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";

import { BreadcrumbsInterface } from "../../models/interfaces/Breadcrumbs.interface";

const Breadcrumbs: React.FC<BreadcrumbsInterface> = ({ userManualLinks, ...props }) => {
  const url = useMemo(() => userManualLinks && userManualLinks[props.location.pathname], [(props.location.pathname, userManualLinks)]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className={`breadcrumb-item`}>
          <Link to="/">Home</Link>
        </li>
        <Route path="/:path" component={BreadcrumbItem} />
        {url && userManualLinks && (
          <li className="ml-auto">
            <a href={url} target="_blank" title="Go to wiki">
              <i className="fas fa-info"></i>
            </a>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
