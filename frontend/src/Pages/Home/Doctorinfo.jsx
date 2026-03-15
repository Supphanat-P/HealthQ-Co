import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import AppointmentHeader from "../../components/Shared/AppointmentHeader";
import BackToNavigate from "../../components/Shared/backToNavigate";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarFold } from "lucide-react";

const Doctorinfo = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const location = useLocation();
  const { doctor } = location.state || {};

  const navigate = useNavigate();
  const AppointmentClick = () => {
    navigate("/appointment", { state: { doctor } });
  };

  const universityList = [
    "จุฬาลงกรณ์มหาวิทยาลัย",
    "มหาวิทยาลัยมหิดล",
    "มหาวิทยาลัยเชียงใหม่",
    "มหาวิทยาลัยขอนแก่น",
    "มหาวิทยาลัยสงขลานครินทร์",
    "มหาวิทยาลัยธรรมศาสตร์",
    "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "มหาวิทยาลัยรังสิต",
    "มหาวิทยาลัยกรุงเทพ",
    "Harvard Medical School",
    "Johns Hopkins University",
    "Oxford University Medical Sciences",
  ];

  useEffect(() => {
    const randomUni =
      universityList[Math.floor(Math.random() * universityList.length)];
    setSelectedUniversity(randomUni);
  }, []);

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
        className="d-flex flex-row justify-content-center gap-4"
        style={{ marginBottom: "5rem" }}
      >
        <div
          className="card shadow p-4"
          style={{ width: "750px", borderRadius: "20px" }}
        >
          <Row>
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
                สาขา/ความชำนาญ: {doctor?.specialty.specialty_name}
              </p>
              <p className="text-secondary mb-1">
                โรงพยาบาล: {doctor?.hospital.hospital_name}
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-dark fw-bold fs-4">การศึกษาและใบรับรอง</p>
              <hr style={{ border: "1px solid #737373" }} />

              <p>แพทย์ผู้เชี่ยวชาญด้าน: {doctor?.specialty.specialty_name}</p>
              <p>จบการศึกษาที่: <b>{selectedUniversity}</b></p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-dark fw-bold fs-4">ติดต่อแพทย์</p>
              <hr style={{ border: "1px solid #737373" }} />

              <p>02-123-4567</p>
              <p>dr.hongsawadee@hearthrakna.co.th</p>
              <p>123 อาคารแพทย์ ชั้น 4 ถนนพระราม 4 กรุงเทพฯ 10110</p>

              <button
                className="rounded-full! py-3! bg-navy d-flex text-white p-3 mt-3"
                onClick={AppointmentClick}
              >
                <CalendarFold /> &nbsp; นัดหมาย
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Doctorinfo;
