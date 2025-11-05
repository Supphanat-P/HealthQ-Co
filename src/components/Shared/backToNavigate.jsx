import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackToNavigate = ({ label, linkTo }) => {
  return (
    <div
      className="bg-white m-2 p-2 h-fit rounded shadow-sm"
      style={{ width: "100%" }}
    >
      <Link
        to={`/${linkTo}`}
        className="text-navy text-decoration-none fw-medium"
      >
        <ArrowLeft />
        &nbsp;
        {label}
      </Link>
    </div>
  );
};
export default BackToNavigate;
