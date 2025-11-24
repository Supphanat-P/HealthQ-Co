import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Appointment/Calendar";
import SelectTime from "../../../components/Appointment/SelectTime";
import BackToNavigate from "../../../components/Shared/backToNavigate";
import AppointmentSummary from "../../../components/Appointment/AppointmentSummary";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import AppointmentDoctor from "../../../components/Appointment/AppointmentDoctor";
import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import PatientInfo from "../../../components/Appointment/PatientInfo";
import toast, { Toaster } from "react-hot-toast";

export default function Appointment() {
  const { doctorsSchedule, isLogin, usersInfo, currentUser } = useData();
  const location = useLocation();
  const { doctor } = location.state || {};

  const [selectedDoctorId, setSelectedDoctorId] = useState(doctor?.doctor_id || null);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [mapDatesTimes, setMapDatesTimes] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});

  if (!doctor) {
    return <Navigate to="/doctorsearch" />;
  }

  if (!isLogin) {
    toast.error("กรุณาเข้าสู่ระบบก่อนทำการนัดหมาย", { duration: 2000 });
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const mapped = selectedDates.map((date) => ({
      date,
      time: selectedTimes[date] || null,
    }));
    setMapDatesTimes(mapped);
    console.log("Mapped Dates & Times:", mapped);
  }, [selectedDates, selectedTimes]);

  return (
    <>
      <Toaster />
      {!selectedDoctorId && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4">
          กรุณาเลือกแพทย์ก่อนทำการนัดหมาย
        </div>
      )}

      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <AppointmentHeader />

      <div className="flex flex-col md:flex-row justify-self-center mt-6 px-4 md:px-8 gap-4">
        <div className="flex-1 flex flex-col space-y-6">
          <div className="bg-white shadow-sm rounded-2xl p-4 mb-3">
            <h4 className="text-center text-2xl font-semibold mb-4">ข้อมูลผู้แพทย์</h4>
            <AppointmentDoctor selectedDoctor={doctor} />
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 mb-3">
            <h4 className="text-center text-2xl font-semibold mb-4">เลือกวันและเวลานัดหมาย</h4>
            <div className="flex flex-col md:flex-row gap-5">
              <Calendar
                selectedDates={selectedDates}
                onDateSelect={(dates) => setSelectedDates(dates)}
              />
              <SelectTime
                selectedDates={selectedDates}
                selectedTimes={selectedTimes}
                onTimeChange={(times) => setSelectedTimes(times)}
              />
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 mb-3" style={{ maxWidth: "750px" }}>
            <PatientInfo onChange={(data) => setPatientInfo(data)} />
          </div>
        </div>

        <div className="w-full md:w-96" >
          <AppointmentSummary
            selectedDates={selectedDates}
            selectedTimes={selectedTimes}
            patientInfo={patientInfo}
            doctorId={doctor?.doctor_id}
            doctorName={doctor?.doctor_name || "กรุณาเลือกแพทย์"}
            doctorHospital={doctor?.hospital.hospital_name || "กรุณาเลือกโรงพยาบาล"}
            doctorSpecialty={doctor?.specialty.specialty_name || "กรุณาเลือกสาขาเฉพาะทาง"}
          />
        </div>
      </div>
    </>
  );
}
