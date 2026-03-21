import React from "react";
import { Link } from "react-router-dom";
const ButtonLink = ({ label, to }) => {
  return (
    <Link to={to} className="btn bg-navy m-5 w-100 d-grid shadow">
      <h3 className="text-white text-center mt-2 fs-5 fw-light">{label}</h3>
    </Link>
  );
};
export default ButtonLink;
