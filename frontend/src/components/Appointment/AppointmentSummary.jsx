import React, { useState } from "react";
import { Calendar, MapPin, Star, Stethoscope } from "lucide-react";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useData } from "../../Context/DataContext";

const AppointmentSummary = ({
  selectedDates,
  selectedTimes,
  patientInfo,
  doctorId,
  doctorName,
  doctorHospital,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { createAppointment, currentUser, fetchAndSetData } = useData();

  const handleConfirm = async () => {
    if (!selectedDates || selectedDates.length === 0) {
      toast.error("กรุณาเลือกวันและเวลา", { duration: 2000 });
      return;
    }
    if (!patientInfo?.firstName || !patientInfo?.symptom) {
      toast.error("กรุณากรอกข้อมูลผู้ป่วยให้ครบถ้วน", { duration: 2000 });
      return;
    }
    if (!doctorId || !doctorName || !doctorHospital) {
      toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลแพทย์", { duration: 2000 });
      return;
    }
    if (!currentUser?.user_id) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการจอง", { duration: 2000 });
      navigate("/login");
      return;
    }

    const app_datetime_json = selectedDates.map((date) => ({
      date: dayjs(date).format("YYYY-MM-DD"),
      times: selectedTimes[date] || [],
    }));

    try {
      const loadingToast = toast.loading("กำลังจอง...");
      await createAppointment(
        currentUser.user_id,
        doctorId,
        app_datetime_json,
        patientInfo.symptom
      );
      await fetchAndSetData();
      toast.dismiss(loadingToast);
      setShowModal(true);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการจอง: " + error.message);
    }
  };

  return (
    <div className="appointment-summary-sticky sticky top-4 p-4 ms-5 w-80 space-y-4 bg-white shadow-sm rounded-xl">
      <h5 className="text-lg font-semibold text-navy-600">
        สรุปรายละเอียดการจอง
      </h5>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <Stethoscope /> ชื่อผู้ป่วย
        </p>
        <p className="text-black">
          {patientInfo?.firstName} {patientInfo?.lastName || ""}
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <MapPin /> อาการของผู้ป่วย
        </p>
        <p className="text-black wrap-break-word!">{patientInfo?.symptom}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <Star /> พบแพทย์ที่
        </p>
        <p className="text-black">{doctorHospital}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <Calendar /> วันที่ & เวลา
        </p>

        {selectedDates && selectedDates.length > 0 ? (
          <div className="text-black space-y-1">
            {selectedDates.map((date) => {
              const formattedDate = dayjs(date)
                .locale("th")
                .format("D MMMM YYYY");
              const times = selectedTimes[date] || [];
              return (
                <p key={date}>
                  {formattedDate} —{" "}
                  {(Array.isArray(times) ? times : [times]).join(", ")} น.
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-black">กรุณาเลือกวันที่</p>
        )}
      </div>

      <button
        className="w-full bg-navy text-white py-3 rounded hover:bg-navy-700 transition"
        onClick={handleConfirm}
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
          <p>
            คำขอของคุณถูกส่งแล้ว
            โปรดรอให้ผู้ดูแลระบบตรวจสอบและอนุมัติข้อมูลนัดหมายนี้
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="border-0 bg-gray-500 rounded-md! px-3 text-white p-2"
            onClick={() => setShowModal(false)}
          >
            ปิด
          </button>
          <button
            className="border-0 bg-blue-950 rounded-md! px-3 text-white p-2"
            onClick={() => navigate("/profile")}
          >
            ไปที่การนัดหมายของฉัน
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppointmentSummary;
