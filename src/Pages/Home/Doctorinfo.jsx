import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AppointmentHeader from "../../components/Shared/AppointmentHeader";
import Calendar from "../../components/Shared/Calendar";
import SelectTime from "../../components/Shared/SelectTime";
import BackToNavigate from "../../components/Shared/backToNavigate";
import { useData } from "../../Context/DataContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
const Doctorinfo = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { doctorsSchedule } = useData();
  
  const findSchedule = (doctorId) => {
    return doctorsSchedule.find((schedule) => schedule.doctor_id === doctorId);
  };

  const location = useLocation();
  const { doctor } = location.state || {};

  const selectedDoctorId = doctor?.doctor_id || null;

  console.log(
    "Doctor info page :",
    doctor,
    selectedDoctorId,
    selectedDate,
    selectedTime
  );
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
            </Col>
          </Row>
        </div>
        <div
          className="card shadow p-4"
          style={{
            width: "515px",
            height: "fit-content",
            borderRadius: "20px",
          }}
        >
          <div className="d-flex justify-content-center mb-3">
            <Calendar
              mode="single"
              selectedDoctorId={selectedDoctorId}
              onDateSelect={(d) => setSelectedDate(d)}
              selectedDate={selectedDate}
            />
          </div>
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
    </>
  );
};

export default Doctorinfo;
