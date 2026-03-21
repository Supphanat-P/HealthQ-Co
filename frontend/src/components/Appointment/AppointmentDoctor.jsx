import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import { Stethoscope } from "lucide-react";

const AppointmentDoctor = ({ selectedDoctor }) => {
  return (
    <div className="d-flex ps-4 ">
      <img
        src="./src/assets/Doctors/doctormint.jpg"
        alt="docmint"
        style={{ borderRadius: "50%", width: "125px", height: "125px" }}
      />
      <div>
        <p className="fs-5 text-navy ps-4 fw-bold d-flex ">
          <Stethoscope /> &nbsp;
          {selectedDoctor?.doctor_name || "กรุณาเลือกแพทย์"}
        </p>
        <p className="text-secondary ps-4 d-flex">
          <Star />
          &nbsp;
          {selectedDoctor?.specialty.specialty_name || "กรุณาเลือกแพทย์"}
        </p>
        <p className="text-secondary ps-4 d-flex">
          <MapPin />
          &nbsp;
          {selectedDoctor?.hospital?.hospital_name || "กรุณาเลือกแพทย์"}
        </p>
      </div>
    </div>
  );
};

export default AppointmentDoctor;
