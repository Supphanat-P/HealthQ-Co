import React from "react";
import { Link } from "react-router-dom";
const ButtonLink = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="btn bg-navy m-5 mt-5 mb-5 d-grid gap-2 container shadow"
    >
      <h3 className="text-white text-center mt-2">{label}</h3>
    </Link>
  );
};
export default ButtonLink;
