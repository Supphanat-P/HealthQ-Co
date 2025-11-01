import React from "react";
import { useNavigate } from "react-router-dom";
import SampleDoctor from "../../assets/Doctors/DoctorZ9.png";
import { FaHospital } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/appointmenttime", { state: { doctor } });
  };

  const handleInfo = () => {
    navigate("/doctorinfo", { state: { doctor } });
  };

  return (
    <div
      className="card card-doctor mt-2 shadow"
      key={doctor.doctor_id}
      style={{ width: "280px" }}
    >
      <img
        src={SampleDoctor}
        alt=""
        style={{
          height: "250px",
          objectFit: "cover",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      />
      <div className="card-doctor-bottom text-white p-3 align-items-center">
        <div className="text-center mb-3 align-items-center">
          <h5 className="mb-0">{doctor.doctor_name}</h5>
          <FaStar />
          <small>&nbsp;{doctor.specialty_name}</small>
          <br />
          <FaHospital />

          <small>&nbsp;{doctor.hospital_name}</small>
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button
            type="button"
            className="btn btn-lg bg-white text-dark w-50 fs-6"
            value={doctor.doctor_id}
            onClick={handleBook}
          >
            นัดหมาย
          </button>

          <button
            className="btn btn-lg bg-white text-dark w-50 fs-6"
            value={doctor.doctor_id}
            onClick={handleInfo}
          >
            รายละเอียด
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
