import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import SampleDoctor from "../../assets/Doctors/DoctorZ9.png";
import "./DoctorCard.css";
import { FaHospital } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Calendar } from "lucide-react";

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
            src={`${import.meta.env.BASE_URL}Hospitals/${
              doctor.hospital.imgPath
            }`}
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
              <small className="mb-0 ms-2">
                {doctor.specialty.specialty_name}
              </small>
            </div>
          </div>

          <div className="mt-2 d-flex gap-8">
            <div className="d-flex align-items-center bg-light px-2 py-1 rounded chip">
              <FaHospital />
              <small className="mb-0 ms-2">
                {doctor.hospital.hospital_name}
              </small>
            </div>
          </div>

          <div className="mt-3 d-flex gap-10 buttons-row">
            <button
              onClick={handleBook}
              className="
          group
          flex! items-center! gap-2! 
          bg-navy
          text-white! font-medium!
          px-5! py-2 !
          rounded-full!
          shadow-md! hover:shadow-lg!
          transition-all! duration-200! ease-in-out!
          transform! hover:-translate-y-1!
        "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:animate-bounce"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              นัดหมาย
            </button>
            <button
              onClick={handleInfo}
              className="w-1/2! rounded-full! border! border-gray-500! text-gray-500! hover:bg-gray-500! hover:text-white! px-4! py-2! transition! duration-300!"
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
