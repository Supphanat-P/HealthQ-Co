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
import PatientInfo from "../../../components/Shared/PatientInfo";
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
      <div className="main d-flex justify-content-center"
        style={{ marginLeft: "7.5rem" }}>
        <div className="d-flex flex-row" width="100%">
          <div className="d-flex flex-column">
            {/* Doctor info */}
            <div
              className="card shadow-lg p-4 m-2"
              style={{
                borderRadius: "20px",
                width: "900px",
                maxWidth: "900px",
              }}
            >
              <h4 className="mb-4 fw-semibold fs-3 text-center">
                ข้อมูลผู้แพทย์
              </h4>

              <AppointmentDoctor selectedDoctor={doctor} />
            </div>
            {/* P */}
            <div
              className="card shadow-lg p-4 m-2"
              style={{
                borderRadius: "20px",
                width: "900px",
                maxWidth: "900px",
              }}
            >
              <h4 className="mb-4 fw-semibold fs-3 text-center">
                เลือกวันและเวลานัดหมาย
              </h4>

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
            <div
              className="card shadow-lg p-4 m-2"
              style={{
                borderRadius: "20px",
                width: "900px",
                maxWidth: "900px",
              }}
            >
              <PatientInfo />
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
