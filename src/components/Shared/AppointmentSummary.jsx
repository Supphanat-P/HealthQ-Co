import { Button } from "react-bootstrap";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { useData } from "../../Context/DataContext";
import dayjs from "dayjs";

const AppointmentSummary = ({
  selectedDate,
  selectedTime,
  doctorName,
  doctorHospital,
  doctorSpecialty,
}) => {
  return (
    <>
      <div
        className="sticky-side"
        style={{ position: "sticky", top: 20, zIndex: 100 }}
      >
        <div className="card w-75 shadow m-2 p-3">
          <h5 className="mb-4 text-navy">สรุปรายละเอียดการจอง</h5>

          <div className="mb-3">
            <p className="text-gray mb-1">
              <Stethoscope />
              &nbsp; แพทย์
            </p>
            <p className="text-black mb-1">{doctorName || "กรุณาเลือกแพทย์"}</p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <MapPin />
              &nbsp; โรงพยาบาล
            </p>
            <p className="text-black mb-1">
              {doctorHospital || "กรุณาเลือกโรงพยาบาล"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Star />
              &nbsp; ความชำนาญ/สาขาเฉพาะทาง
            </p>
            <p className="text-black mb-1">
              {doctorSpecialty || "กรุณาเลือกสาขาเฉพาะทาง"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Calendar />
              &nbsp; วันที่
            </p>
            <p className="text-black mb-1">
              {selectedDate
                ? dayjs(selectedDate).format("D MMMM YYYY")
                : "กรุณาเลือกวันที่"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Clock />
              &nbsp; เวลา
            </p>
            <p className="text-black mb-1">
              {selectedTime || "กรุณาเลือกเวลา"}
            </p>
          </div>
          <div className="footer">
            <Button className="btn-navy w-100 mt-4">ยืนยันการจอง</Button>

            <p
              className="text-gray mt-3 text-center"
              style={{ fontSize: "12px" }}
            >
              คุณสามารถยกเลิกหรือเปลี่ยนแปลงนัดหมายได้ภายใน 24
              ชั่วโมงก่อนเวลานัด
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AppointmentSummary;
