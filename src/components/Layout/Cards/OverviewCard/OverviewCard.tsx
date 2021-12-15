import React from "react";
import { Link } from "react-router-dom";
import { OverviewCardInterface } from "../../models/interfaces/OverviewCard.interface";

export const OverviewCard: React.FC<OverviewCardInterface> = ({
  route,
  icon,
  name,
  description,
}) => {
  return (
    <div className="col mb-4">
      <div className="card h-100">
        <Link
          className="card-body d-flex btn btn-link media text-left align-items-center"
          to={route}
        >
          <i
            className={`align-self-center mr-3 py-2 px-3 fa-2x fa fas ${icon}`}
          ></i>
          <div className="media-body">
            <h5 className="mt-0">{name}</h5>
            <p className="text-muted mb-0">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
