import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge, Col, Row } from "react-bootstrap";

const AppointmentHistory = () => {
  const appointments = [
    {
      id: 1,
      doctorName: "นพ. สมชาย ใจดี",
      specialty: "อายุรกรรม",
      hospital: "โรงพยาบาลกรุงเทพ",
      appointmentDate: "2025-11-16",
      appointmentTime: "10:30 น.",
      status: "booked",
      note: "มาตามนัดหมายปกติ",
    },
    {
      id: 2,
      doctorName: "นพ. สมชาย ใจดี",
      specialty: "อายุรกรรม",
      hospital: "โรงพยาบาลกรุงเทพ",
      appointmentDate: "2023-10-15",
      appointmentTime: "10:30 น.",
      status: "completed",
      note: "มาตามนัดหมายปกติ",
    },
    {
      id: 3,
      doctorName: "นพ. สมชาย ใจดี",
      specialty: "อายุรกรรม",
      hospital: "โรงพยาบาลกรุงเทพ",
      appointmentDate: "2023-10-15",
      appointmentTime: "10:30 น.",
      status: "completed",
      note: "มาตามนัดหมายปกติ",
    },
  ];

  const commingAppointments = appointments.filter(
    (appointment) => appointment.status === "booked"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status !== "booked"
  );
  return (
    <div className="mx-auto mb-5" style={{ maxWidth: "1000px" }}>
      <div className="card shadow-lg rounded-4 p-4">
        <h4 className="fw-bold text-navy mb-4">
          <Calendar size={24} className="me-2" />
          ประวัติการนัดหมาย
        </h4>
        {appointments.length === 0 ? (
          <div className="alert alert-light text-center py-4 rounded-3">
            <p className="text-muted mb-0">ยังไม่มีประวัติการนัดหมาย</p>
          </div>
        ) : (
          <>
            <hr />
            <Badge
              bg="warning"
              text="dark"
              className="mb-3"
              style={{ maxWidth: "fit-content" }}
            >
              ที่กำลังจะมาถึง
            </Badge>
            <Row className="g-3">
              {commingAppointments.map((appointment) => (
                <Col md={6} key={appointment.id}>
                  <div
                    className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all"
                    style={{
                      borderLeft: "5px solid #1f2054",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 4px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h6 className="fw-bold text-navy mb-1">
                          {appointment.doctorName}
                        </h6>
                        <small className="text-muted">
                          {appointment.specialty}
                        </small>
                      </div>
                      <div>
                        {appointment.status === "booked" && (
                          <Badge bg="warning" text="dark">
                            <AlertCircle size={14} className="me-1" />
                            กำลังมาถึง
                          </Badge>
                        )}
                      </div>
                    </div>
                    <hr className="my-2" />

                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">
                        <MapPin size={14} className="me-1" />
                        โรงพยาบาล
                      </small>
                      <p className="mb-0 fw-500 text-navy">
                        {appointment.hospital}
                      </p>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <small className="text-muted d-block mb-1">
                          <Calendar size={14} className="me-1" />
                          วันที่
                        </small>
                        <p className="mb-0 fw-500 text-navy">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block mb-1">
                          <Clock size={14} className="me-1" />
                          เวลา
                        </small>
                        <p className="mb-0 fw-500 text-navy">
                          {appointment.appointmentTime}
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
              ))}
            </Row>
          </>
        )}
        <hr className="my-4" />
        <Badge
          bg="success"
          className="mb-3"
          style={{ maxWidth: "fit-content" }}
        >
          เสร็จสิ้น
        </Badge>
        <Row className="g-3">
          {completedAppointments.map((appointment) => (
            <Col md={6} key={appointment.id}>
              <div
                className="card h-100 border-0 shadow-sm rounded-3 p-4 transition-all"
                style={{
                  borderLeft: "5px solid #1f2054",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-bold text-navy mb-1">
                      {appointment.doctorName}
                    </h6>
                    <small className="text-muted">
                      {appointment.specialty}
                    </small>
                  </div>
                  <div>
                    {appointment.status === "completed" && (
                      <Badge bg="success">
                        <CheckCircle size={14} className="me-1" />
                        เสร็จสิ้น
                      </Badge>
                    )}
                    {appointment.status === "pending" && (
                      <Badge bg="warning" text="dark">
                        <AlertCircle size={14} className="me-1" />
                        รอดำเนินการ
                      </Badge>
                    )}
                    {appointment.status === "confirmed" && (
                      <Badge bg="info">
                        <CheckCircle size={14} className="me-1" />
                        ยืนยันแล้ว
                      </Badge>
                    )}
                  </div>
                </div>

                <hr className="my-2" />

                <div className="mb-3">
                  <small className="text-muted d-block mb-1">
                    <MapPin size={14} className="me-1" />
                    โรงพยาบาล
                  </small>
                  <p className="mb-0 fw-500 text-navy">
                    {appointment.hospital}
                  </p>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block mb-1">
                      <Calendar size={14} className="me-1" />
                      วันที่
                    </small>
                    <p className="mb-0 fw-500 text-navy">
                      {new Date(appointment.appointmentDate).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block mb-1">
                      <Clock size={14} className="me-1" />
                      เวลา
                    </small>
                    <p className="mb-0 fw-500 text-navy">
                      {appointment.appointmentTime}
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
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AppointmentHistory;
