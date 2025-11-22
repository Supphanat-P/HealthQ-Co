import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import SampleDoctor from "../../assets/Doctors/DoctorZ9.png";
import "./DoctorCard.css";
import { FaHospital } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

const DoctorCard = ({ doctor, selectedDate }) => {
  const { isLogin } = useData();
  const navigate = useNavigate();
  const { hospitals } = useData();

  const handleBook = () => {
    if (!isLogin) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการนัดหมาย", { duration: 2000 });
    } else {
      navigate("/appointment", { state: { doctor, selectedDate } });
    }
  };
  const handleInfo = () => {
    navigate("/doctorinfo", { state: { doctor } });
  };

  return (
    <div className="card doctor-card mt-2 shadow-sm" key={doctor.doctor_id}>
      <div className="card-header-img">
        <img src={SampleDoctor} alt="doctor" className="header-photo" />

        <div className="hospital-badge w-100 bg-none">
          <img
            src={`/Hospitals/${doctor.hospital.imgPath}`}
            alt={doctor.hospital.hospital_name || "hospital"}
            className="hospital-logo p-2"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div className="doctor-avatar">
          <img src={SampleDoctor} alt="avatar" className="avatar-img" />
        </div>
      </div>

      <div className="card-body custom-body bg-white">
        <div className="doctor-info">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-0 fw-bold">{doctor.doctor_name}</h5>
          </div>

          <div className="mt-2 d-flex gap-8">
            <div className="d-flex align-items-center bg-light px-2 py-1 rounded chip">
              <FaUserDoctor />
              <small className="mb-0 ms-2">{doctor.specialty.specialty_name}</small>
            </div>
          </div>

          <div className="mt-2 d-flex gap-8">
            <div className="d-flex align-items-center bg-light px-2 py-1 rounded chip">
              <FaHospital />
              <small className="mb-0 ms-2">{doctor.hospital.hospital_name}</small>
            </div>
          </div>

          <div className="mt-3 d-flex gap-10 buttons-row">
            <button
              onClick={handleBook}
              className="btn text-white btn-navy w-50"
            >
              นัดหมาย
            </button>
            <button
              onClick={handleInfo}
              className="btn btn-outline-secondary  w-50"
            >
              รายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
