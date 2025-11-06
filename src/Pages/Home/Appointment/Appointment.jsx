import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Shared/Calendar";
import SelectTime from "../../../components/Shared/SelectTime";
import BackToNavigate from "../../../components/Shared/backToNavigate";
import AppointmentSummary from "../../../components/Shared/AppointmentSummary";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import AppointmentDoctor from "../../../components/Shared/AppointmentDoctor";
import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
export default function Appointment() {
  const location = useLocation();
  const { selectedDate: initDate } = location.state || {};
  const { doctor } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(initDate || null);

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctor?.doctor_id || null
  );

  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // console.log("----------------------------");
    // console.log("Selected Date:", selectedDate);
    // console.log("Selected Time:", selectedTime);
    // console.log("Doctor:", selectedDoctorId);
    // console.log("Doctor info", doctor);
    // console.log("----------------------------");
  }, [selectedTime, selectedDate, selectedDoctorId]);
  return (
    <>
      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <AppointmentHeader />
      <div className="main d-flex justify-content-center">
        <div className="d-flex flex-row" width="100%">
          <div className="d-flex flex-column">
            {/* Doctor info */}
            <div className="card shadow p-3 m-2" style={{ width: "500px" }}>
              <AppointmentDoctor selectedDoctor={doctor} />
            </div>
            {/* P */}
            <div className="card m-2 shadow-sm" style={{ width: "500px" }}>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selectedDoctorId={selectedDoctorId}
                  onDateSelect={(d) => setSelectedDate(d)}
                  selectedDate={selectedDate}
                />
                <hr />
                <SelectTime
                  selectedDoctorId={selectedDoctorId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeChange={(slot) =>
                    setSelectedTime(`${slot.start_time} - ${slot.end_time}`)
                  }
                />
              </div>
            </div>
            {/* Patient Info */}
            <div className="card shadow p-3 m-2" style={{ width: "500px" }}>
              คนไข้กรอกข้อมูลตรงนี้
            </div>
            <div className="card shadow p-3 m-2" style={{ width: "500px" }}>
              แนบไฟล์ตรงนี้
            </div>
          </div>
          <AppointmentSummary
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            doctorName={doctor?.doctor_name || "กรุณาเลือกแพทย์"}
            doctorHospital={doctor?.hospital_name || "กรุณาเลือกโรงพยาบาล"}
            doctorSpecialty={doctor?.specialty_name || "กรุณาเลือกสาขาเฉพาะทาง"}
          />
        </div>
      </div>
    </>
  );
}
