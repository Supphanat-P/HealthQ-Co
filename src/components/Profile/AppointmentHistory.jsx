import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const AppointmentHistory = ({ lang }) => {
  const {
    doctors = [],
    appointments = [],
    currentUser,
    hospitals = [],
    specialties = [],
  } = useData();

  const [selectedTab, setSelectedTab] = useState("1");

  const navigate = useNavigate();

  const handleDoctorInfo = (doctorId) => {
    const findDoctor = doctors.find((doc) => doc.doctor_id === doctorId);
    navigate("/doctorinfo", { state: { doctor: findDoctor } });
  };

  const user = currentUser;

  const userAppointments = (appointments || []).filter(
    (app) => String(app.user_id) === String(user?.user_id)
  );

  const getDoctor = (doctorId) => doctors.find((d) => d.doctor_id === doctorId);
  const getHospitalByDoctor = (doctor) =>
    hospitals.find((h) => h.hospital_id === doctor?.hospital_id);
  const getSpecialtyByDoctor = (doctor) =>
    specialties.find((s) => s.specialty_id === doctor?.specialty_id);

  const formatAppointments = (userAppointments || []).map((a) => {
    const doctor = getDoctor(a.doctor_id);
    const hospital = getHospitalByDoctor(doctor) || {};
    const specialty = getSpecialtyByDoctor(doctor) || {};

    const slotsGroupedByDate = {};
    if (a.appointment_slots && a.appointment_slots.length > 0) {
      a.appointment_slots.forEach(slot => {
        const date = dayjs(slot.slot_datetime).format("YYYY-MM-DD");
        const time = dayjs(slot.slot_datetime).format("HH:mm");
        if (!slotsGroupedByDate[date]) {
          slotsGroupedByDate[date] = [];
        }
        slotsGroupedByDate[date].push(time);
      });
    }

    const formattedSlots = Object.keys(slotsGroupedByDate).map(date => ({
      date: date,
      times: slotsGroupedByDate[date].sort(),
    }));

    const status = a.status;
    const symptoms = a.note || "";

    return {
      ...a,
      doctorName: doctor?.doctor_name || "ไม่ระบุ",
      hospitalName: hospital.hospital_name || "-",
      specialtyName: specialty.specialty_name || "-",
      status,
      formattedSlots,
      symptoms,
      key: a.app_id,
    };
  });

  const pendingAppointments = formatAppointments.filter(
    (appointment) => appointment.status === "pending"
  );
  const comingAppointments = formatAppointments.filter(
    (appointment) => appointment.status === "booked"
  );
  const completedAppointments = formatAppointments.filter(
    (appointment) => appointment.status === "completed"
  );

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
              <Search className="me-2 inline-flex" />
              ดูรายละเอียดแพทย์
            </a>
            <small className="text-muted">{appointment.specialtyName}</small>
          </div>
          <div>
            {appointment.status === "booked" && (
              <span className="inline-flex items-center bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                <AlertCircle size={16} className="me-1" />{" "}
                กำลังมาถึง
              </span>
            )}
            {appointment.status === "pending" && (
              <span className="inline-flex items-center bg-yellow-500 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                <Clock size={16} className="me-1" /> รออนุมัติ
              </span>
            )}
            {appointment.status === "completed" && (
              <span className="inline-flex items-center bg-green-700 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                <CheckCircle size={16} className="me-1" /> เสร็จสิ้น
              </span>
            )}
            {appointment.status === "available" && (
              <span bg="secondary">
                <AlertCircle size={16} className="me-1" /> ไม่ระบุ
              </span>
            )}
          </div>
        </div>

        <hr className="my-2" />

        <div className="mb-3">
          <small className="text-muted d-block mb-1">
            <MapPin size={14} className="me-1 inline-flex" /> โรงพยาบาล
          </small>
          <p className="mb-0 fw-500 text-navy">{appointment.hospitalName}</p>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block mb-1">
            <Calendar size={14} className="me-1 inline-flex" /> วันที่ & เวลา
          </small>
          {appointment.formattedSlots && appointment.formattedSlots.length > 0 ? (
            appointment.formattedSlots.map((slot, index) => (
              <p key={index} className="mb-0 fw-500 text-navy">
                {dayjs(slot.date).locale("th").format("D MMMM YYYY")} — {slot.times.join(", ")} น.
              </p>
            ))
          ) : (
            <p className="mb-0 fw-500 text-muted">ไม่ระบุวันและเวลา</p>
          )}
        </div>

        <div className="alert alert-light rounded-2 p-2 mb-0">
          <small className="text-muted">
            <strong>อาการของผู้ป่วย:</strong> {appointment.symptoms}
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
        รออนุมัติ ({pendingAppointments.length})
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
            <h5 className="text-navy fw-bold mb-3">รออนุมัติ</h5>
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
        {formatAppointments.length === 0 && (
          <div className="text-center text-muted mt-5">
            ไม่มีประวัติการนัดหมาย ❌
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
