import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import Stepper from "../../components/Shared/Stepper/Stepper";
import DatePicker from "../../components/Shared/DatePickerTh";
import "react-datepicker/dist/react-datepicker.css";
import FooterButton from "../../components/AppointmentComponents/FooterButton";
import AppointmentHeader from "../../components/AppointmentComponents/AppointmentHeader";
import Schedule from "../../components/AppointmentComponents/Scheudule";
import { useData } from "../../Context/DataContext";

const AppointmentTime = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const location = useLocation();
  const { doctor } = location.state || {};
  const { doctorsSchedule } = useData();

  const doctorScheduleData = doctorsSchedule.find(
    (schedule) => schedule.doctor_id === doctor?.doctor_id
  );

  const schedule = doctorScheduleData || {};

  return (
    <>
      <AppointmentHeader />
      <div
        className="d-flex justify-content-center mb-5"
        style={{ marginRight: "11rem" }}
      >
        <Stepper Step={2} />
        <div className="AppointmentBackground">
          <div className="text-center" style={{ lineHeight: "10px" }}>
            <p className="text-navy fs-4">
              {doctor?.doctor_name || "เลือกแพทย์จากหน้าก่อนหน้า"}
            </p>
            <p className="text-navy fs-5">{doctor?.specialty_name || "..."}</p>
            <hr className="m-auto w-50" />
            <div className="text-center mt-2">
              <h5 className="">ทำนัดหมายแพทย์</h5>
              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                year
                dateFormat="d MMM yy"
                locale="th"
                className="form-control"
                minDate={new Date()}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>

          <Schedule
            schedule={schedule}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>
      <FooterButton
        labelBack={"กลับ"}
        labelNext={"ต่อไป"}
        gotoLocation={"patientinfo"}
        nextState={{ doctor: doctor || null, selectedDate, selectedTime }}
        backtoLocation="appointment"
      />
    </>
  );
};

export default AppointmentTime;
