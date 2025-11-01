import { useEffect, React } from "react";
import AppointmentHeader from "../../components/AppointmentComponents/AppointmentHeader";
import Stepper from "../../components/Shared/Stepper/Stepper";
import FooterButton from "../../components/AppointmentComponents/FooterButton";
import { Row, Col } from "react-bootstrap";
import DoctorZ9 from "../../assets/Doctors/DoctorZ9.png";
import { useLocation } from "react-router-dom";
const AppointmentInfomation = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  console.log("Selected Date:", selectedDate);
  console.log("Selected Time:", selectedTime);
  return (
    <>
      <AppointmentHeader />
      <div
        className="d-flex justify-content-center mb-5"
        style={{ marginRight: "11rem" }}
      >
        {" "}
        <Stepper Step={4} />
        <div
          className="AppointmentBackground"
          style={{ height: "fit-content" }}
        >
          <div
            className="d-flex w-100 flex-grow-1 mb-4"
            style={{ flexDirection: "column" }}
          >
            <p
              className="text-secondary fw-bold mb-3 "
              style={{ fontSize: "24px" }}
            >
              ข้อมูลแพทย์
            </p>

            <div className="d-flex  mb-5">
              <div className="me-2" style={{ width: "550px" }}>
                <div className="bg-white text-black rounded fs-6 p-2 mb-3 border shadow">
                  โรงพยาบาล :
                </div>

                <div className="bg-white text-black rounded fs-6 p-2 mb-3 border shadow">
                  ชื่อแพทย์ :
                </div>

                <div className="bg-white text-black rounded fs-6 p-2 border shadow">
                  ความชำนาญ :
                </div>
              </div>

              <div style={{ flexBasis: "50%" }}>
                <div
                  className="shadow w-100 rounded"
                  style={{ height: "160px" }}
                >
                  <div className="d-flex" style={{ height: "160px" }}>
                    <div
                      className="text-center bg-white rounded-start"
                      style={{
                        flexBasis: "50%",
                      }}
                    >
                      <img
                        src={DoctorZ9}
                        alt="นพ. หงสาวดี แซ่ลี"
                        className="rounded-start"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div
                      className="bg-navy p-7 text-center text-white d-flex flex-column justify-content-center align-items-center rounded-end"
                      style={{ width: "450px", height: "160px" }}
                    >
                      <div>
                        <p className="mb-1 fs-5 fw-bold">นพ. หงสาวดี แซ่ลี</p>
                        <p className="mb-3 fs-6">รักษาอาการทางใจ</p>
                        <button
                          className="rounded px-4 py-2 border "
                          style={{ color: "#002B5B" }}
                        >
                          รายละเอียด
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: "1px solid #000000ff", margin: "20px" }} />

            <p
              className="text-secondary  fw-bold mb-3"
              style={{ fontSize: "24px" }}
            >
              ข้อมูลผู้ป่วย
            </p>

            <Row className="g-3 mb-4">
              <Col>
                <div className="bg-white text-black rounded fs-6 p-2 border-0 shadow">
                  ชื่อ-นามสกุล :
                </div>
              </Col>

              <Col>
                <div className="bg-white text-black rounded fs-6 p-2 border-0 shadow">
                  เบอร์ติดต่อ :
                </div>
              </Col>
            </Row>

            <Row className="g-3">
              <Col>
                <div className="bg-white text-black rounded fs-6 p-2 border-0 shadow">
                  วัน-เวลา :
                </div>
              </Col>

              <Col>
                <div className="bg-white text-black rounded fs-6 p-2 border-0 shadow">
                  อาการและปัญหาสุขภาพ :
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <FooterButton
        labelBack={"กลับ"}
        labelNext={"ต่อไป"}
        backtoLocation="patientinfo"
        gotoLocation="appointment"
      />
    </>
  );
};

export default AppointmentInfomation;
