import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar, Clock, MapPin, Star, Stethoscope } from "lucide-react";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AppointmentSummary.css"

const AppointmentSummary = ({ selectedDate, selectedTime, selectedSlot, patientInfo, doctorName, doctorHospital }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="appointment-summary-sticky sticky top-4 p-4 w-80 space-y-4 bg-white shadow-lg rounded-xl">
      <h5 className="text-lg font-semibold text-navy-600">สรุปรายละเอียดการจอง</h5>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2"><Stethoscope /> ชื่อผู้ป่วย</p>
        <p className="text-black">{patientInfo?.firstName} {patientInfo?.lastName || "กรุณากรอกชื่อผู้ป่วย"}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2"><MapPin /> อาการของผู้ป่วย</p>
        <p className="text-black">{patientInfo?.symptom || "กรุณากรอกอาการของผู้ป่วย"}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2"><Star /> พบแพทย์ที่</p>
        <p className="text-black">{doctorHospital || "กรุณาเลือกโรงพยาบาล"}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2"><Calendar /> วันที่</p>
        <p className="text-black">{selectedDate ? dayjs(selectedDate).locale("th").format("D MMMM YYYY") : "กรุณาเลือกวันที่"}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2"><Clock /> เวลา</p>
        <p className="text-black">{selectedTime || "กรุณาเลือกเวลา"}</p>
      </div>

      <button
        className="w-full bg-navy-600 text-white py-3 rounded-xl hover:bg-navy-700 transition"
        onClick={() => setShowModal(true)}
      >
        ยืนยันการจอง
      </button>

      <p className="text-gray-400 text-xs text-center mt-2">
        คุณสามารถยกเลิกหรือเปลี่ยนแปลงนัดหมายได้ภายใน 24 ชั่วโมงก่อนเวลานัด
      </p>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ส่งคำขอนัดหมายเรียบร้อย</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>คำขอของคุณถูกส่งแล้ว โปรดรอให้ผู้ดูแลระบบตรวจสอบและอนุมัติข้อมูลนัดหมายนี้</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>ปิด</button>
          <button className="btn btn-navy" onClick={() => navigate("/appointments")}>ไปที่การนัดหมายของฉัน</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppointmentSummary;
