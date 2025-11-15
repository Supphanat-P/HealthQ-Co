import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import { useState, useEffect } from "react";
const AppointmentHistory = () => {
  const {
    doctors = [],
    appointments = [],
    currentUser,
    hospitals = [],
    specialties = [],
    doctorsSchedule = [],
  } = useData();

  const [selectedTab, setSelectedTab] = useState("1");

  const navigate = useNavigate();

  const handleDoctorInfo = (doctorId) => {
    const findDoctor = doctors.find((doc) => doc.doctor_id === doctorId);
    navigate("/doctorinfo", { state: { doctor: findDoctor } });
  };

  const rawUser = localStorage.getItem("user");
  const user = currentUser;

  const userAppointments = (appointments || []).filter(
    (app) => String(app.patient_id) === String(user?.userId)
  );

  const getDoctor = (doctorId) => doctors.find((d) => d.doctor_id === doctorId);
  const getHospitalByDoctor = (doctor) =>
    hospitals.find((h) => h.hospital_id === doctor?.hospital_id);
  const getSpecialtyByDoctor = (doctor) =>
    specialties.find((s) => s.specialty_id === doctor?.specialty_id);

  const getSlotData = (doctorId, slotId) => {
    const schedule = (doctorsSchedule || []).find(
      (s) => s.doctor_id === doctorId
    );
    return schedule?.slots?.find((sl) => sl.slot_id === slotId);
  };

  const enrichedAppointments = (userAppointments || []).map((a) => {
    const doctor = getDoctor(a.doctor_id);
    const hospital = getHospitalByDoctor(doctor) || {};
    const specialty = getSpecialtyByDoctor(doctor) || {};
    const slot = getSlotData(a.doctor_id, a.slot_id);
    const apptDate = slot?.date || null;
    const apptStartTime = slot?.start_time || "";
    const apptEndTime = slot?.end_time || "";
    const status = slot?.status;
    const note = a.patient_symptom || "";
    return {
      ...a,
      doctorName: doctor?.doctor_name || "ไม่ระบุ",
      hospitalName: hospital.hospital_name || "-",
      specialtyName: specialty.specialty_name || "-",
      status,
      apptDate,
      apptStartTime,
      apptEndTime,
      note,
      key: a.appointment_id,
    };
  });

  const pendingAppointments = enrichedAppointments.filter(
    (appointment) => appointment.status === "pending"
  );
  const comingAppointments = enrichedAppointments.filter(
    (appointment) => appointment.status === "booked"
  );
  const completedAppointments = enrichedAppointments.filter(
    (appointment) => appointment.status === "completed"
  );
  const currentAppointments =
    selectedTab === "coming"
      ? comingAppointments
      : selectedTab === "pending"
      ? pendingAppointments
      : completedAppointments;

  const renderCard = (appointment) => (
    <Col md={6} key={appointment.key}>
      <div
        className="card h-100 border-0 shadow rounded-3 p-4 transition-all"
        style={{
          borderLeft: "5px solid #1f2054",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="fw-bold text-navy mb-1">{appointment.doctorName}</h6>
            <a
              onClick={() => handleDoctorInfo(appointment.doctor_id)}
              className="text-decoration-none d-block mb-2"
              style={{ fontSize: 13 }}
            >
              ดูรายละเอียดแพทย์
            </a>
            <small className="text-muted">{appointment.specialtyName}</small>
          </div>

          <div>
            {appointment.status === "booked" && (
              <Badge bg="info" text="dark">
                <AlertCircle size={14} className="me-1" /> กำลังมาถึง
              </Badge>
            )}
            {appointment.status === "pending" && (
              <Badge bg="warning" text="dark">
                <AlertCircle size={14} className="me-1" /> รอการอนุมัติ
              </Badge>
            )}
            {appointment.status === "completed" && (
              <Badge bg="success">
                <CheckCircle size={14} className="me-1" /> เสร็จสิ้น
              </Badge>
            )}
            {appointment.status === "available" && (
              <Badge bg="secondary">
                <AlertCircle size={14} className="me-1" /> ไม่ระบุ
              </Badge>
            )}
          </div>
        </div>

        <hr className="my-2" />

        <div className="mb-3">
          <small className="text-muted d-block mb-1">
            <MapPin size={14} className="me-1" /> โรงพยาบาล
          </small>
          <p className="mb-0 fw-500 text-navy">{appointment.hospitalName}</p>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <small className="text-muted d-block mb-1">
              <Calendar size={14} className="me-1" /> วันที่
            </small>
            <p className="mb-0 fw-500 text-navy">
              {appointment.apptDate
                ? new Date(appointment.apptDate).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-"}
            </p>
          </div>
          <div className="col-6">
            <small className="text-muted d-block mb-1">
              <Clock size={14} className="me-1" /> เวลา
            </small>
            <p className="mb-0 fw-500 text-navy">
              {appointment.apptStartTime || "-"} -{" "}
              {appointment.apptEndTime || "-"}
            </p>
          </div>
        </div>

        <div className="alert alert-light rounded-2 p-2 mb-0">
          <small className="text-muted">
            <strong>หมายเหตุ:</strong> {appointment.note}
          </small>
        </div>
      </div>
    </Col>
  );

  return (
    <div className="container my-5">
      <Button
        onClick={() => setSelectedTab("1")}
        variant={selectedTab === "1" ? "primary" : "outline-primary"}
        className="me-2 rounded-pill shadow-sm py-2 px-3"
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        นัดหมายที่กำลังจะมาถึง ({comingAppointments.length})
      </Button>

      <Button
        onClick={() => setSelectedTab("2")}
        variant={selectedTab === "2" ? "warning" : "outline-warning"}
        className="me-2 rounded-pill shadow-sm py-2 px-3"
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        รอการอนุมัติ ({pendingAppointments.length})
      </Button>

      <Button
        onClick={() => setSelectedTab("3")}
        variant={selectedTab === "3" ? "success" : "outline-success"}
        className="me-2 rounded-pill shadow-sm py-2 px-3"
        style={{ transition: "all 0.2s ease-in-out" }}
      >
        นัดหมายที่เสร็จสิ้น ({completedAppointments.length})
      </Button>

      <div className="card p-4 mt-4">
        {selectedTab === "1" && comingAppointments.length > 0 && (
          <div className="mb-5">
            <h5 className="text-navy fw-bold mb-3">นัดหมายที่กำลังจะมาถึง</h5>
            <hr />
            <Row className="g-4">
              {comingAppointments.map((appointment) => renderCard(appointment))}
            </Row>
          </div>
        )}
        {selectedTab === "2" && pendingAppointments.length > 0 && (
          <div className="mb-5 ">
            <h5 className="text-navy fw-bold mb-3">รอการอนุมัติ</h5>
            <hr />
            <Row className="g-4">
              {pendingAppointments.map((appointment) =>
                renderCard(appointment)
              )}
            </Row>
          </div>
        )}
        {selectedTab === "3" && completedAppointments.length > 0 && (
          <div className="mb-5 ">
            <h5 className="text-navy fw-bold mb-3">นัดหมายที่เสร็จสิ้น</h5>
            <hr />
            <Row className="g-4">
              {completedAppointments.map((appointment) =>
                renderCard(appointment)
              )}
            </Row>
          </div>
        )}
        {enrichedAppointments.length === 0 && (
          <div className="text-center text-muted mt-5">
            ไม่มีประวัติการนัดหมาย ❌
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
