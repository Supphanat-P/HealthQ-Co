import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Shared/Calendar";
import SelectTime from "../../../components/Shared/SelectTime";
import BackToNavigate from "../../../components/Shared/backToNavigate";
import AppointmentSummary from "../../../components/Shared/AppointmentSummary";
import { useLocation } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import dayjs from "dayjs";
import AppointmentDoctor from "../../../components/Shared/AppointmentDoctor";
import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
export default function Appointment() {
  const { doctorsSchedule } = useData();

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
    console.log("Doctor info", doctor);
    // console.log("----------------------------");
    // console.log(
    //   "Doctor Schedule:",
    //   doctorsSchedule.find(
    //     (schedule) => schedule.doctor_id === selectedDoctorId
    //   )
    // );
  }, [selectedTime, selectedDate, selectedDoctorId]);
  return (
    <>
      {!selectedDoctorId && (
        <div className="alert alert-warning">
          กรุณาเลือกแพทย์ก่อนทำการนัดหมาย
        </div>
      )}
      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <AppointmentHeader />
      <div className="main d-flex justify-content-center">
        <div className="d-flex flex-row" width="100%">
          <div className="d-flex flex-column">
            {/* Doctor info */}
            <div className="card shadow p-3 m-2" style={{ width: "851px" }}>
              <AppointmentDoctor selectedDoctor={doctor} />
            </div>
            {/* P */}
            <div className="card shadow p-3 m-2" style={{ width: "851px" }}>
              <div className="d-flex flex-row p-3">
                <Calendar
                  mode="single"
                  selectedDoctorId={selectedDoctorId}
                  onDateSelect={(d) => setSelectedDate(d)}
                  selectedDate={selectedDate}
                />
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
