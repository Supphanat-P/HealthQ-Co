import { Form } from "react-bootstrap";
import FooterButton from "../../components/AppointmentComponents/FooterButton";
import AppointmentHeader from "../../components/AppointmentComponents/AppointmentHeader";
import Stepper from "../../components/Shared/Stepper/Stepper";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PatientInformation = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  useEffect(() => {
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
  }, [selectedDate, selectedTime]);

  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    let formattedValue = "";
    if (cleanedValue.length > 0) {
      formattedValue += cleanedValue.substring(0, 3);
    }
    if (cleanedValue.length > 3) {
      formattedValue += "-" + cleanedValue.substring(3, 6);
    }
    if (cleanedValue.length > 6) {
      formattedValue += "-" + cleanedValue.substring(6, 10);
    }
    return formattedValue;
  };

  const handlePhone = (e) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue);
    setPhoneNumber(formatted);
  };

  return (
    <>
      <AppointmentHeader />
      <div
        className="d-flex justify-content-center"
        style={{ marginRight: "11rem" }}
      >
        <Stepper Step={3} />
        <div
          className="AppointmentBackground"
          style={{ marginBottom: "1.5rem" }}
        >
          <p
            className="text-center text-gray fw-medium"
            style={{ fontSize: "24px" }}
          >
            ข้อมูลผู้ป่วย
          </p>

          <div
            className="col pt-3"
            style={{ paddingLeft: "90px", paddingRight: "90px" }}
          >
            <div className="row">
              <div className="col-md-4 mb-3">
                <label style={{ paddingLeft: "15px" }}>ชื่อ</label>
                <input
                  type="text"
                  placeholder="หงสาวดี"
                  className="form-control"
                  style={{ height: "45px" }}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label style={{ paddingLeft: "15px" }}>นามสกุล</label>
                <input
                  type="text"
                  placeholder="แซ่ลี่"
                  className="form-control"
                  style={{ height: "45px" }}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label style={{ paddingLeft: "15px", width: "100%" }}>
                  เพศ
                </label>
                <select className="form-select" style={{ height: "45px" }}>
                  <option value="">เลือกเพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                </select>
              </div>

              <div className="col-md-2 mb-3">
                <label style={{ paddingLeft: "15px" }}>อายุ</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "45px" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label style={{ paddingLeft: "15px" }}>เบอร์ติดต่อ</label>
                <input
                  type="tel"
                  onInput={handlePhone}
                  value={phoneNumber}
                  placeholder="เช่น 081-234-5678"
                  className="form-control"
                  style={{ height: "45px" }}
                />
              </div>

              <div className="col-md-7 mb-3">
                <label style={{ paddingLeft: "15px" }}>E-mail</label>
                <input
                  type="email"
                  // onInput={handleEmail}
                  // value={email}
                  placeholder="เช่น example@mail.com"
                  className="form-control"
                  style={{ height: "45px" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label style={{ paddingLeft: "15px" }}>
                  อาการและปัญหาสุขภาพ
                </label>
                <textarea className="form-control" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterButton
        labelBack={"กลับ"}
        labelNext={"ต่อไป"}
        gotoLocation={"appointmentinfo"}
        backtoLocation={"appointmenttime"}
      />
    </>
  );
};

export default PatientInformation;
