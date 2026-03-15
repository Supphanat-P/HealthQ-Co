import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { supabase } from "../../config/supabaseClient";
import { useData } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("th");

const STATUS = {
  BOOKED: "booked",
  PENDING: "pending",
  COMPLETED: "completed",
  CANCEL: "cancel",
};

const AppointmentHistory = ({ lang }) => {
  const {
    doctors,
    appointments,
    usersInfo,
    currentUser,
    hospitals,
    specialties,
    fetchAndSetData,
  } = useData();
  const text = {
    wait: lang === "TH" ? "รออนุมัติ" : "Waiting for approval",
    coming: lang === "TH" ? "นัดหมายที่กำลังจะมาถึง" : "Upcoming Appointments",
    done: lang === "TH" ? "เสร็จสิ้น" : "Completed",
    cancle: lang === "TH" ? "นัดหมายที่ยกเลิกแล้ว" : "Cancelled Appointments",
    
    noComing:
      lang === "TH"
        ? "คุณไม่มีนัดหมายที่กำลังจะมาถึง"
        : "You have no upcoming appointments",
    noWait:
      lang === "TH"
        ? "คุณไม่มีนัดหมายที่รออนุมัติ"
        : "You have no pending appointments",
    noDone:
      lang === "TH"
        ? "ยังไม่มีประวัติการนัดหมายที่เสร็จสิ้น"
        : "You have no completed appointment history",
    noCancle:
      lang === "TH"
        ? "ยังไม่มีการนัดหมายที่ยกเลิกแล้ว"
        : "You have no cancelled appointments",
    skip: lang === "TH" ? "เลื่อนนัด" : "Postpone the appointment",
    cancleApm: lang === "TH" ? "ยกเลิกนัด" : "Cancel appointment",
    seeInfo: lang === "TH" ? "ดูรายละเอียดแพทย์" : "View doctor details",
  };
  const [selectedTab, setSelectedTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [modalAppointment, setModalAppointment] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = currentUser;

  const today = new Date();
  const week = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  const userAppointments = useMemo(() => {
    return (appointments || []).filter(
      (a) => String(a.user_id) === String(user?.user_id)
    );
  }, [appointments, user]);

  const formatAppointments = useMemo(() => {
    return (userAppointments || []).map((a) => {
      const doctor = doctors.find((d) => d.doctor_id === a.doctor_id) || {};
      const hospital =
        hospitals.find((h) => h.hospital_id === doctor.hospital_id) || {};
      const specialty =
        specialties.find((s) => s.specialty_id === doctor.specialty_id) || {};

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

  const pendingAppointments = formatAppointments.filter(
    (a) => a.status === STATUS.PENDING
  );
  const comingAppointments = formatAppointments.filter(
    (a) => a.status === STATUS.BOOKED
  );
  const completedAppointments = formatAppointments.filter(
    (a) => a.status === STATUS.COMPLETED
  );
  const cancelAppointments = formatAppointments.filter(
    (a) => a.status === STATUS.CANCEL
  );

  const getStatus = (status) => {
    switch (status) {
      case STATUS.BOOKED:
        return {
          color: "bg-blue-600 text-white",
          label: lang === "TH" ? "นัดหมายที่กำลังจะมาถึง" : "Upcoming Appointments",
          icon: <AlertCircle size={16} />,
        };
      case STATUS.PENDING:
        return {
          color: "bg-yellow-500 text-black",
          label: lang === "TH" ? "รออนุมัติ" : "Waiting for approval",
          icon: <Clock size={16} />,
        };
      case STATUS.COMPLETED:
        return {
          color: "bg-green-700 text-white",
          label: lang === "TH" ? "เสร็จสิ้น" : "Completed",
          icon: <CheckCircle size={16} />,
        };
      case STATUS.CANCEL:
        return {
          color: "bg-red-500 text-white",
          label: lang === "TH" ? "นัดหมายที่ยกเลิกแล้ว" : "Cancelled Appointments",
          icon: <AlertCircle size={16} />,
        };
      default:
        return {
          color: "bg-gray-500 text-white",
          label: lang === "TH" ? "ไม่ระบุสถานะ" : "Status not specified",
          icon: <AlertCircle size={16} />,
        };
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
      const { error } = await supabase
        .from("appointments")
        .update({ status: STATUS.CANCEL })
        .eq("app_id", id);
      if (error) throw error;

      toast.success("ยกเลิกการนัดหมายสำเร็จ");
      fetchAndSetData();
      closeModal();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการยกเลิก");
    } finally {
      setIsSubmitting(false);
    }
  };

  // เลือนนัดหมาย
  const rescheduleApp = async (id, newDate, newTime) => {
    setIsSubmitting(true);
    try {
      const newISO = dayjs(`${newDate}T${newTime}:00`).toISOString();

      await supabase
        .from("appointment_slots")
        .update({ slot_datetime: newISO })
        .eq("app_id", id);
      await supabase
        .from("appointments")
        .update({ status: "pending", updated_at: new Date().toISOString() })
        .eq("app_id", id);

      toast.success("เลื่อนนัดเรียบร้อยแล้ว");
      fetchAndSetData();
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

    if (!rescheduleDate || !rescheduleTime)
      return toast.error("กรุณากรอกวันและเวลา");

    const check = dayjs(`${rescheduleDate}T${rescheduleTime}`);
    if (check.isBefore(dayjs()))
      return toast.error("ไม่สามารถเลือกเวลาย้อนหลังได้");

    rescheduleApp(modalAppointment.app_id, rescheduleDate, rescheduleTime);
  };

  const AppointmentCard = ({ item }) => {
    const status = getStatus(item.status);

    return (
      <div className="w-full md:w-1/2 p-2">
        <div
          className="bg-white border p-4 rounded-2xl! shadow-xl hover:shadow-lg transition-all"
          style={{ borderLeft: "5px solid #1f2054" }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h6 className="font-bold text-xl text-[#1f2054]">
                {item.doctorName}
              </h6>
              <button
                onClick={() => handleDoctorInfo(item.doctor_id)}
                className="mt-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full! hover:bg-blue-100 flex items-center"
              >
                <Search size={14} className="mr-2!" /> {text.seeInfo}
              </button>
              <p className="text-sm text-gray-500 mt-3">{item.specialtyName}</p>
            </div>

            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full! shadow-sm flex items-center gap-1 ${status.color}`}
            >
              {status.icon} {status.label}
            </span>
          </div>

          <hr className="my-3" />

          <div className="mb-3 flex items-center">
            <MapPin size={16} className="mr-2! text-gray-500" />
            <div>
              <small className="text-gray-500 block">โรงพยาบาล</small>
              <p className="font-medium text-[#1f2054]">{item.hospitalName}</p>
            </div>
          </div>

          <div className="mb-3 flex items-start">
            <Calendar size={16} className="mr-2! text-gray-500 mt-1" />
            <div>
              <small className="text-gray-500 block">วันที่ & เวลา</small>
              {item.formattedSlots?.map((slot, i) => (
                <p key={i} className="font-medium text-[#1f2054]">
                  {dayjs(slot.date).format("D MMMM YYYY")} —{" "}
                  {slot.times.join(", ")} น.
                </p>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl text-sm">
            <small className="text-gray-600 font-semibold">
              อาการของผู้ป่วย:
            </small>
            <p className="text-gray-700">
              {item.symptoms || "ไม่มีการระบุอาการ"}
            </p>
          </div>

          {(item.status === STATUS.PENDING ||
            item.status === STATUS.BOOKED) && (
            <div className="flex gap-3 mt-4 pt-4 border-t">
              <button
                disabled={isSubmitting}
                onClick={() => openModal(item, "reschedule")}
                className={`flex-1 border py-2 rounded-full! ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <Clock size={16} className="inline mr-1" /> {text.skip}
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => openModal(item, "cancel")}
                className={`flex-1 bg-red-600 text-white py-2 rounded-full! ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                }`}
              >
                <AlertCircle size={16} className="inline mr-1" />{" "}
                {text.cancleApm}
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
        <div
          className="absolute inset-0 bg-black opacity-60"
          onClick={closeModal}
        />

        <div className="relative bg-white rounded-2xl! max-w-md w-full shadow-xl overflow-hidden">
          <div className="p-6!">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {isCancel ? (
                <AlertCircle className="text-red-500" />
              ) : (
                <Clock className="text-blue-500" />
              )}
              {isCancel ? "ยืนยันการยกเลิกนัดหมาย" : "เลื่อนนัดหมาย"}
            </h3>

            {isCancel ? (
              <p className="text-gray-600 text-sm mb-6!">
                ต้องการยกเลิกนัดหมายกับ <b>{modalAppointment.doctorName}</b>{" "}
                ใช่หรือไม่?
              </p>
            ) : (
              <div className="bg-gray-50 p-4! rounded-xl! border mb-4!">
                <label className="block text-xs font-semibold mb-1">
                  วันที่ใหม่
                </label>
                <input
                  type="date"
                  className="w-full p-2 rounded-full! border mb-3"
                  min={dayjs(week).format("YYYY-MM-DD")}
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />

                <label className="block text-xs font-semibold mb-1">
                  เวลาใหม่
                </label>
                <input
                  type="time"
                  className="w-full p-2 rounded-full! border"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                />
              </div>
            )}
          </div>
          <hr />
          <div className="flex m-2 gap-2">
            <button
              onClick={closeModal}
              className="w-1/2! py-3! text-sm bg-gray-200 text-gray-800 rounded-full!"
            >
              ยกเลิก
            </button>

            <button
              disabled={isSubmitting}
              onClick={handleConfirm}
              className={`w-1/2! py-3! text-sm text-white rounded-full! ${
                isCancel
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting
                ? "กำลังดำเนินการ..."
                : isCancel
                ? "ยืนยันยกเลิก"
                : "ยืนยันเลื่อนนัด"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-10! px-4">
      <div className="max-w-7xl! mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-8!">
          {[
            {
              id: "2",
              label: `${text.wait} (${pendingAppointments.length})`,
            },
            {
              id: "1",
              label: `${text.coming} (${comingAppointments.length})`,
            },
            {
              id: "3",
              label: `${text.done} (${completedAppointments.length})`,
            },
            {
              id: "4",
              label: `${text.cancle} (${cancelAppointments.length})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2! px-5! rounded-full! text-sm font-semibold border shadow-md transition
              ${
                selectedTab === tab.id
                  ? tab.id === "1"
                    ? "bg-blue-600! text-white! border-blue-300! hover:bg-blue-800! shadow-blue-300! ring-2! ring-blue-100! hover:-translate-y-0.5!"
                    : tab.id === "2"
                    ? "bg-yellow-500! text-white! border-yellow-400! hover:bg-yellow-600! shadow-yellow-300! ring-2! ring-yellow-100! hover:-translate-y-0.5!"
                    : tab.id === "3"
                    ? "bg-emerald-600! text-white! border-emerald-200! hover:bg-emerald-700! shadow-emerald-200! ring-2! ring-emerald-100! hover:-translate-y-0.5!"
                    : tab.id === "4"
                    ? "bg-rose-600! text-white! border-rose-200! hover:bg-rose-700! shadow-rose-200! ring-2! ring-rose-200! hover:-translate-y-0.5!"
                    : "bg-gray-500! text-white! border-gray-500!"
                  : "bg-white! text-gray-500! border-gray-200! hover:bg-gray-50! hover:text-gray-700! hover:border-gray-300!"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap -m-2!">
          {selectedTab === "1" &&
            comingAppointments.map((a) => (
              <AppointmentCard key={a.app_id} item={a} />
            ))}
          {selectedTab === "2" &&
            pendingAppointments.map((a) => (
              <AppointmentCard key={a.app_id} item={a} />
            ))}
          {selectedTab === "3" &&
            completedAppointments.map((a) => (
              <AppointmentCard key={a.app_id} item={a} />
            ))}
          {selectedTab === "4" &&
            cancelAppointments.map((a) => (
              <AppointmentCard key={a.app_id} item={a} />
            ))}

          {selectedTab === "1" && comingAppointments.length === 0 && (
            <Empty text={text.noComing} />
          )}
          {selectedTab === "2" && pendingAppointments.length === 0 && (
            <Empty text={text.noWait} />
          )}
          {selectedTab === "3" && completedAppointments.length === 0 && (
            <Empty text={text.noDone} />
          )}
          {selectedTab === "4" && cancelAppointments.length === 0 && (
            <Empty text={text.noCancle} />
          )}
        </div>
      </div>

      <ActionModal />
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="w-full text-center p-10! text-gray-500 flex! flex-col! items-center! justify-center! py-16! px-4! bg-white! rounded-3xl! border-2! border-dashed! border-gray-200!">
    <AlertCircle size={48} className="text-gray-500 mx-auto mb-3" />
    <h3 className="text-lg! font-semibold! text-gray-500! mb-1!">{text}</h3>
  </div>
);

export default AppointmentHistory;
