import { Button } from "react-bootstrap";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { useData } from "../../Context/DataContext";
import dayjs, { locale } from "dayjs";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./AppointmentSummary.css";
import toast from "react-hot-toast";

const AppointmentSummary = ({
  selectedDate,
  selectedTime,
  selectedSlot,
  patientInfo,
  doctorId,
  doctorName,
  doctorHospital,
  doctorSpecialty,
}) => {
  const {
    doctorsSchedule,
    setDoctorsSchedule,
    appointments,
    setAppointments,
    currentUser,
  } = useData();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const navigate = useNavigate();

  const formattedPatientName = (() => {
    const fn = patientInfo?.firstName ? patientInfo.firstName.trim() : "";
    const ln = patientInfo?.lastName ? patientInfo.lastName.trim() : "";
    const full = `${fn} ${ln}`.trim();
    return full || "";
  })();

  const handleConfirm = () => {
    if (!selectedSlot) {
      toast.error("กรุณาเลือกวันและเวลา");
      return;
    }
    if (
      !patientInfo ||
      !patientInfo.firstName ||
      !patientInfo.lastName ||
      !patientInfo.phone
    ) {
      toast.error("กรุณากรอกชื่อและเบอร์โทรผู้ป่วย");
      return;
    }
    const schedule = (doctorsSchedule || []).find(
      (s) => s.doctor_id === doctorId
    );
    if (!schedule) {
      toast.error("ไม่พบตารางของแพทย์นี้");
      return;
    }

    const targetSlot = (schedule.slots || []).find(
      (s) => s.slot_id === selectedSlot.slot_id
    );
    if (!targetSlot) {
      alert("ไม่พบเวลาที่เลือกในตาราง");
      return;
    }
    if (targetSlot.status !== "available") {
      toast.error("เวลานี้ถูกจองแล้ว โปรดเลือกเวลาอื่น");
      return;
    }

    setLoading(true);

    const pid =
      currentUser?.userId ||
      (localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).userId
        : null);

    const newSchedules = (doctorsSchedule || []).map((s) => {
      if (s.doctor_id !== doctorId) return s;
      return {
        ...s,
        slots: (s.slots || []).map((sl) =>
          sl.slot_id === selectedSlot.slot_id
            ? { ...sl, status: "pending", patient_id: pid }
            : sl
        ),
      };
    });

    setDoctorsSchedule(newSchedules);

    const apptId = `APPT${String(Date.now() % 100000).padStart(5, "0")}`;
    const appointment = {
      appointment_id: apptId,
      patient_id: pid,
      patient_name: formattedPatientName,
      patient_phone: patientInfo.phone,
      patient_email: patientInfo.email || "",
      patient_symptom: patientInfo.symptom || "",
      doctor_id: doctorId,
      date: selectedSlot.date,
      time: selectedSlot.start_time,
      slot_id: selectedSlot.slot_id,
      created_at: new Date().toISOString(),
    };

    setAppointments((prev) => [...(prev || []), appointment]);

    setLoading(false);
    toast.success("บันทึกการนัดหมายสำเร็จ");
    setCreatedAppointment(appointment);

    setShowModal(true);
  };
  console.log("Created Appointment:", createdAppointment);
  return (
    <>
      <div className="appointment-summary-sticky">
        <div className="card appointment-summary-card w-75 shadow m-3 p-4">
          <h5 className="mb-4 text-navy">สรุปรายละเอียดการจอง</h5>

          <div className="mb-3">
            <p className="text-gray mb-1">
              <Stethoscope />
              &nbsp; ชื่อผู้ป่วย
            </p>
            <p className="text-black mb-1">
              {patientInfo?.firstName}&nbsp;{" "}
              {patientInfo?.lastName
                ? patientInfo.lastName
                : "กรุณากรอกชื่อผู้ป่วย"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <MapPin />
              &nbsp; อาการของผู้ป่วย
            </p>
            <p className="text-black mb-1">
              {patientInfo?.symptom || "กรุณากรอกอาการของผู้ป่วย"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Star />
              &nbsp; พบแพทย์ที่
            </p>
            <p className="text-black mb-1">
              {doctorHospital || "กรุณาเลือกสาขาเฉพาะทาง"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Calendar />
              &nbsp; วันที่
            </p>
            <p className="text-black mb-1">
              {selectedDate
                ? dayjs(selectedDate).locale("th").format("D MMMM YYYY")
                : "กรุณาเลือกวันที่"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Clock />
              &nbsp; เวลา
            </p>
            <p className="text-black mb-1">
              {selectedTime || "กรุณาเลือกเวลา"}
            </p>
            {selectedSlot && (
              <p className="text-muted small mt-1">
                Slot ID: {selectedSlot.slot_id}
              </p>
            )}
          </div>
          <div className="footer">
            <Button
              style={{ height: "60px" }}
              className="btn-navy w-100 mt-4"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "กำลังบันทึก..." : "ยืนยันการจอง"}
            </Button>

            <p
              className="text-gray mt-3 text-center alert alert-warning"
              style={{ fontSize: "12px" }}
            >
              คุณสามารถยกเลิกหรือเปลี่ยนแปลงนัดหมายได้ภายใน 24
              ชั่วโมงก่อนเวลานัด
            </p>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>ส่งคำขอนัดหมายเรียบร้อย</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {createdAppointment ? (
              <div>
                <p>
                  รหัสนัดหมาย:{" "}
                  <strong>{createdAppointment.appointment_id}</strong>
                </p>
                <p>
                  แพทย์:{" "}
                  <strong>
                    {doctorName} ณ {doctorHospital}
                  </strong>
                </p>
                <p>
                  วันที่/เวลา:{" "}
                  <strong>
                    {dayjs(createdAppointment.date)
                      .locale("th")
                      .format("D MMMM YYYY")}{" "}
                    {createdAppointment.time}
                  </strong>
                </p>
                <p>
                  ผู้ป่วย: <strong>{createdAppointment.patient_name}</strong>
                </p>
                <hr />
                <p className="text-center">
                  คำขอของคุณถูกส่งแล้ว โปรดรอให้ผู้ดูแลระบบตรวจสอบและอนุมัติ
                  ข้อมูลนัดหมายนี้ เมื่อได้รับการอนุมัติ
                  เจ้าหน้าที่จะแจ้งให้ทราบ
                </p>
              </div>
            ) : (
              <p>กำลังเตรียมข้อมูล...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              ปิด
            </Button>
            <Button
              className="btn-navy"
              onClick={() => {
                setShowModal(false);
                navigate("/appointments");
              }}
            >
              ไปที่การนัดหมายของฉัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default AppointmentSummary;
