import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Search
} from "lucide-react";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { supabase } from "../../config/supabaseClient";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("th");

const STATUS = {
  BOOKED: "booked",
  PENDING: "pending",
  COMPLETED: "completed",
  CANCEL: "cancel",
};

const toast = {
  success: (msg) => alert(`สำเร็จ: ${msg}`),
  error: (msg) => alert(`ผิดพลาด: ${msg}`),
};

const AppointmentHistory = () => {
  const { doctors, appointments: initialAppointments, currentUser, hospitals, specialties } = useData();
  const [appointments, setAppointments] = useState(initialAppointments);

  const [selectedTab, setSelectedTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [modalAppointment, setModalAppointment] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const user = currentUser;

  const userAppointments = useMemo(() => {
    return (appointments || []).filter((a) => String(a.user_id) === String(user?.user_id));
  }, [appointments, user]);

  const formatAppointments = useMemo(() => {
    return (userAppointments || []).map((a) => {
      const doctor = doctors.find((d) => d.doctor_id === a.doctor_id) || {};
      const hospital = hospitals.find((h) => h.hospital_id === doctor.hospital_id) || {};
      const specialty = specialties.find((s) => s.specialty_id === doctor.specialty_id) || {};

      const slots = {};
      (a.appointment_slots || []).forEach((slot) => {
        const slotDate = dayjs(slot.slot_datetime).tz("Asia/Bangkok");
        const date = slotDate.format("YYYY-MM-DD");
        const time = slotDate.format("HH:mm");

        if (!slots[date]) slots[date] = [];
        slots[date].push(time);
      });

      const formattedSlots = Object.keys(slots).map((date) => ({
        date,
        times: slots[date].sort(),
      }));

      return {
        ...a,
        doctorName: doctor.doctor_name || "ไม่ระบุ",
        hospitalName: hospital.hospital_name || "-",
        specialtyName: specialty.specialty_name || "-",
        formattedSlots,
        symptoms: a.note || "",
      };
    });
  }, [userAppointments, doctors, hospitals, specialties]);

  const pendingAppointments = formatAppointments.filter((a) => a.status === STATUS.PENDING);
  const comingAppointments = formatAppointments.filter((a) => a.status === STATUS.BOOKED);
  const completedAppointments = formatAppointments.filter((a) => a.status === STATUS.COMPLETED);

  const getStatus = (status) => {
    switch (status) {
      case STATUS.BOOKED:
        return { color: "bg-blue-600 text-white", label: "กำลังจะมาถึง", icon: <AlertCircle size={16} /> };
      case STATUS.PENDING:
        return { color: "bg-yellow-500 text-black", label: "รออนุมัติ", icon: <Clock size={16} /> };
      case STATUS.COMPLETED:
        return { color: "bg-green-700 text-white", label: "เสร็จสิ้น", icon: <CheckCircle size={16} /> };
      case STATUS.CANCEL:
        return { color: "bg-red-500 text-white", label: "ยกเลิกแล้ว", icon: <AlertCircle size={16} /> };
      default:
        return { color: "bg-gray-500 text-white", label: "ไม่ระบุสถานะ", icon: <AlertCircle size={16} /> };
    }
  };

  const handleDoctorInfo = (doctorId) => {
    const findDoctor = doctors.find((doc) => doc.doctor_id === doctorId);
    if (!findDoctor) return toast.error("ไม่พบข้อมูลแพทย์");
    navigate("/doctorinfo", { state: { doctor: findDoctor } });
  };

  const cancelApp = async (id) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").update({ status: STATUS.CANCEL }).eq("app_id", id);
      if (error) throw error;

      toast.success("ยกเลิกการนัดหมายสำเร็จ");
      setAppointments((prev) => prev.map((a) => (a.app_id === id ? { ...a, status: STATUS.CANCEL } : a)));
      closeModal();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการยกเลิก");
    } finally {
      setIsSubmitting(false);
    }
  };

  const rescheduleApp = async (id, newDate, newTime) => {
    setIsSubmitting(true);
    try {
      const newISO = dayjs(`${newDate}T${newTime}:00`).toISOString();

      await supabase.from("appointment_slots").update({ slot_datetime: newISO }).eq("app_id", id);
      await supabase.from("appointments").update({ updated_at: new Date().toISOString() }).eq("app_id", id);

      toast.success("เลื่อนนัดเรียบร้อยแล้ว");
      setAppointments((prev) =>
        prev.map((a) =>
          a.app_id === id
            ? {
                ...a,
                appointment_slots: a.appointment_slots.map((s) => ({ ...s, slot_datetime: newISO })),
              }
            : a
        )
      );

      closeModal();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเลื่อนนัด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (app, action) => {
    setModalAppointment(app);
    setModalAction(action);

    if (action === "reschedule") {
      const first = app.formattedSlots?.[0];
      setRescheduleDate(first?.date || "");
      setRescheduleTime(first?.times?.[0] || "");
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalAppointment(null);
    setModalAction("");
    setRescheduleDate("");
    setRescheduleTime("");
  };

  const handleConfirm = () => {
    if (!modalAppointment) return;
    if (modalAction === "cancel") return cancelApp(modalAppointment.app_id);

    if (!rescheduleDate || !rescheduleTime) return alert("กรุณากรอกวันและเวลา");

    const check = dayjs(`${rescheduleDate}T${rescheduleTime}`);
    if (check.isBefore(dayjs())) return alert("ไม่สามารถเลือกเวลาย้อนหลังได้");

    rescheduleApp(modalAppointment.app_id, rescheduleDate, rescheduleTime);
  };

  const AppointmentCard = ({ item }) => {
    const status = getStatus(item.status);

    return (
      <div className="w-full md:w-1/2 p-2">
        <div className="bg-white border p-4 rounded-2xl shadow-md hover:shadow-lg transition-all" style={{ borderLeft: "5px solid #1f2054" }}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h6 className="font-bold text-xl text-[#1f2054]">{item.doctorName}</h6>
              <button
                onClick={() => handleDoctorInfo(item.doctor_id)}
                className="mt-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 flex items-center"
              >
                <Search size={14} className="mr-2" /> ดูรายละเอียดแพทย์
              </button>
              <p className="text-sm text-gray-500 mt-3">{item.specialtyName}</p>
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${status.color}`}>
              {status.icon} {status.label}
            </span>
          </div>

          <hr className="my-3" />

          <div className="mb-3 flex items-center">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <div>
              <small className="text-gray-500 block">โรงพยาบาล</small>
              <p className="font-medium text-[#1f2054]">{item.hospitalName}</p>
            </div>
          </div>

          <div className="mb-3 flex items-start">
            <Calendar size={16} className="mr-2 text-gray-500 mt-1" />
            <div>
              <small className="text-gray-500 block">วันที่ & เวลา</small>
              {item.formattedSlots?.map((slot, i) => (
                <p key={i} className="font-medium text-[#1f2054]">
                  {dayjs(slot.date).format("D MMMM YYYY")} — {slot.times.join(", ")} น.
                </p>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl text-sm">
            <small className="text-gray-600 font-semibold">อาการของผู้ป่วย:</small>
            <p className="text-gray-700">{item.symptoms || "ไม่มีการระบุอาการ"}</p>
          </div>

          {(item.status === STATUS.PENDING || item.status === STATUS.BOOKED) && (
            <div className="flex gap-3 mt-4 pt-4 border-t">
              <button
                disabled={isSubmitting}
                onClick={() => openModal(item, "reschedule")}
                className={`flex-1 border py-2 rounded-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
              >
                <Clock size={16} className="inline mr-1" /> เลื่อนนัด
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => openModal(item, "cancel")}
                className={`flex-1 bg-red-600 text-white py-2 rounded-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}
              >
                <AlertCircle size={16} className="inline mr-1" /> ยกเลิกนัด
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ActionModal = () => {
    if (!showModal || !modalAppointment) return null;

    const isCancel = modalAction === "cancel";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">

        <div className="absolute inset-0 bg-black opacity-60" onClick={closeModal} />

        <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {isCancel ? (
                <AlertCircle className="text-red-500" />
              ) : (
                <Clock className="text-blue-500" />
              )}
              {isCancel ? "ยืนยันการยกเลิกนัดหมาย" : "เลื่อนนัดหมาย"}
            </h3>

            {isCancel ? (
              <p className="text-gray-600 text-sm mb-6">
                ต้องการยกเลิกนัดหมายกับ <b>{modalAppointment.doctorName}</b> ใช่หรือไม่?
              </p>
            ) : (
              <div className="bg-gray-50 p-4 rounded-xl border mb-4">
                <label className="block text-xs font-semibold mb-1">วันที่ใหม่</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-full border mb-3"
                  min={dayjs().format("YYYY-MM-DD")}
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />

                <label className="block text-xs font-semibold mb-1">เวลาใหม่</label>
                <input
                  type="time"
                  className="w-full p-2 rounded-full border"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex border-t">
            <button
              onClick={closeModal}
              className="w-1/2 py-3 text-sm bg-gray-200 text-gray-800 rounded-full"
            >
              ยกเลิก
            </button>

            <button
              disabled={isSubmitting}
              onClick={handleConfirm}
              className={`w-1/2 py-3 text-sm text-white rounded-full ${isCancel ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "กำลังดำเนินการ..." : isCancel ? "ยืนยันยกเลิก" : "ยืนยันเลื่อนนัด"}
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-bold text-3xl text-center text-[#1f2054] mb-8">ประวัติการนัดหมายของฉัน</h3>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "1", label: `นัดหมายที่กำลังจะมาถึง (${comingAppointments.length})` },
            { id: "2", label: `รออนุมัติ (${pendingAppointments.length})` },
            { id: "3", label: `เสร็จสิ้น (${completedAppointments.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2 px-5 rounded-full text-sm font-semibold border shadow-md transition ${
                selectedTab === tab.id
                  ? tab.id === "1"
                    ? "bg-blue-600 text-white border-blue-600"
                    : tab.id === "2"
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-green-600 text-white border-green-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap -m-2">
          {selectedTab === "1" && comingAppointments.map((a) => <AppointmentCard key={a.app_id} item={a} />)}
          {selectedTab === "2" && pendingAppointments.map((a) => <AppointmentCard key={a.app_id} item={a} />)}
          {selectedTab === "3" && completedAppointments.map((a) => <AppointmentCard key={a.app_id} item={a} />)}

          {selectedTab === "1" && comingAppointments.length === 0 && (
            <Empty text="คุณไม่มีนัดหมายที่กำลังจะมาถึง" />
          )}
          {selectedTab === "2" && pendingAppointments.length === 0 && (
            <Empty text="คุณไม่มีนัดหมายที่รออนุมัติ" />
          )}
          {selectedTab === "3" && completedAppointments.length === 0 && (
            <Empty text="ยังไม่มีประวัติการนัดหมายที่เสร็จสิ้น" />
          )}
        </div>
      </div>

      <ActionModal />
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="w-full text-center p-10 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mt-6">
    <AlertCircle size={32} className="text-gray-400 mx-auto mb-3" />
    <p className="font-semibold">{text}</p>
  </div>
);

export default AppointmentHistory;
