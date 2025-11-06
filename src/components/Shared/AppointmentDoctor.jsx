import { Button } from "react-bootstrap";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { useData } from "../../Context/DataContext";
import dayjs from "dayjs";

const AppointmentDoctor = ({ selectedDoctor }) => {
  console.log(selectedDoctor);

  return (
    <div className="d-flex ps-4 ">
      <img
        src="./src/assets/Doctors/doctormint.jpg"
        alt="docmint"
        style={{ borderRadius: "50%", width: "150px", height: "150px" }}
      />

      <div className="">
        <p className="fs-5 text-navy ps-4 fw-bold  ">
          <Stethoscope /> &nbsp;
          {selectedDoctor.doctor_name || "ชื่อหมอ"}
        </p>
        <p className="text-secondary ps-4">
          <Star />&nbsp;
          {selectedDoctor.specialty_name || "ชำนาญ"}
        </p>
        <p className="text-secondary ps-4">
          <MapPin />&nbsp;
          {selectedDoctor.hospital_name || "โรงพยาบาล"}
        </p>
      </div>
    </div>
  );
};

export default AppointmentDoctor;
