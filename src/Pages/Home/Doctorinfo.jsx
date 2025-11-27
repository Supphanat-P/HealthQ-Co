import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AppointmentHeader from "../../components/Shared/AppointmentHeader";
import Calendar from "../../components/Appointment/Calendar"
import SelectTime from "../../components/Appointment/SelectTime";
import BackToNavigate from "../../components/Shared/backToNavigate";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Appointment from "./Appointment/Appointment";
const Doctorinfo = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const location = useLocation();

  const { doctor } = location.state || {};

  const selectedDoctorId = doctor?.doctor_id || null;

  const navigate = useNavigate();

  const AppointmentClick = () => {
    navigate("/appointment", { state: { doctor } });
  }

  return (
    <>
      {!doctor && (
        <div className="alert alert-warning">
          กรุณาเลือกแพทย์ก่อนทำการนัดหมาย
        </div>
      )}
      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <AppointmentHeader label={"ข้อมูลแพทย์"} />
      <div
        className="d-flex flex-row justify-content-center gap-4 "
        style={{ marginBottom: "5rem" }}
      >
        <div
          className=" card shadow p-4"
          style={{
            width: "750px",
            height: "fit-content",
            borderRadius: "20px",
          }}
        >
          <Row className="">
            <Col md={4} className="text-center">
              <img
                src="./public/phdoctor.jpg"
                alt="doc"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Col>

            <Col md={8}>
              <h2 className="text-navy fw-bold">{doctor?.doctor_name}</h2>
              <p className="text-secondary mb-1">
                สาขา/ความชำนาญ: {doctor?.specialty_name}
              </p>
              <p className="text-secondary mb-1">
                โรงพยาบาล: {doctor?.hospital_name}
              </p>
              <p className="text-secondary">
                ประสบการณ์ทำงาน: {doctor?.experience} ปี
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p
                className="text-dark fw-bold fs-4 "
                style={{ marginBottom: "-10px" }}
              >
                การศึกษาและใบรับรอง
              </p>
              <hr style={{ border: "1px solid #000000ff" }} />
              <p>
                แพทย์ผู้เชี่ยวชาญด้าน {doctor?.specialty_name} มีประสบการณ์กว่า
                15 ปี
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p
                className="text-dark fw-bold fs-4 "
                style={{ marginBottom: "-10px" }}
              >
                ติดต่อแพทย์
              </p>
              <hr style={{ border: "1px solid #000000ff" }} />
              <p>02-123-4567</p>
              <p>dr.hongsawadee@hearthrakna.co.th</p>
              <p>123 อาคารแพทย์ ชั้น 4 ถนนพระราม 4 กรุงเทพฯ 10110</p>
              <button className="rounded bg-navy justify-self-end d-flex text-white p-3" onClick={AppointmentClick}>นัดหมาย</button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Doctorinfo;
