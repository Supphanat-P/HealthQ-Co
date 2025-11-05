import React, { useState } from "react";
import { Calendar } from "../../components/Shared/Calendar";
import SelectTime from "../../components/Shared/SelectTime";
import BackToNavigate from "../../components/Shared/backToNavigate";
import AppointmentSummary from "../../components/Shared/AppointmentSummary";

export default function DatePickerExample() {
  const [selectedDoctorId, setSelectedDoctorId] = useState("D001");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <div className="main d-flex justify-content-center">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column">
            {/* Doctor info */}
            <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              หมออยู่ตรงนี้
            </div>
            {/* P */}
            <div className="card m-2" style={{ width: "600px" }}>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selectedDoctorId={selectedDoctorId}
                  onDateSelect={(d) => setSelectedDate(d)}
                />
                <hr />
                <SelectTime
                  selectedDoctorId={selectedDoctorId}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
            {/* Patient Info */}
            <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              คนไข้กรอกข้อมูลตรงนี้
            </div>
            <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              แนบไฟล์ตรงนี้
            </div>
          </div>
          <AppointmentSummary />
        </div>
      </div>
    </>
  );
}
