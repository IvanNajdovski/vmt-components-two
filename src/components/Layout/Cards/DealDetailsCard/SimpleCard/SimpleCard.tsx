import React from "react";
import { Link } from "react-router-dom";

export const SimpleCard = ({item}) => {
  return (
    <div className="card h-100">
      <Link
        className="card-body d-flex btn btn-link text-dark media text-left"
        to={item.route}
      >
        <i className={`align-self-center mr-3 p-3 fa-3x ${item.fontAwesomeBase} ${item.icon}`}></i>
        <div className="media-body">
          <h5 className="mt-0">{item.name}</h5>
          <p className="text-muted mb-0">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};
