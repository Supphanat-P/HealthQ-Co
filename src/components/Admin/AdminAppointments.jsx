import { useState, forwardRef, useEffect } from "react";
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  CircleQuestionMark,
  Save,
  X,
  Sidebar, // เพิ่มไอคอน X สำหรับปิด Modal
} from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useData } from "../../Context/DataContext";
import { supabase } from "../../config/supabaseClient";
import AdminSidebar from "./AdminSidebar";
import { sendOtpForRegistration } from "../../Context/FetchData";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 border-0 bg-transparent flex items-center justify-center transition-colors"
  >
    {children}
  </button>
));

const AdminAppointments = () => {
  const { currentUser, appointments, fetchAndSetData } = useData();
  const [filterStatusDisplay, setFilterStatusDisplay] = useState("ทั้งหมด");
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  // --- State สำหรับ Modal ---
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  if (!currentUser) return (window.location.href = "/login");
  if (currentUser.role !== "admin") return (window.location.href = "/login");

  // --- ฟังก์ชันอัปเดตสถานะ ---
  const handleStatusChange = async (app_id, newStatus, selectedDate = null) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          status: newStatus,
          confirmed_at: selectedDate,
          updated_at: new Date().toISOString(),
        })
        .eq("app_id", app_id);

      if (error) throw error;
      
      await fetchAndSetData(); // Refresh data

      if (newStatus === "booked") {

        console.log(selectedDate)

        const date = new Date(selectedDate).toLocaleDateString(
          "th-TH",
          { day: "numeric", month: "short", year: "numeric" }
        )

        const time = new Date(selectedDate).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        });
        
        console.log(date)
        console.log(time)
        const user = appointments.find((item) => item.app_id === app_id)?.user;
        const doctor = appointments.find((item) => item.app_id === app_id)?.doctor;

        const userEmail = user.email
        const doctorName = doctor.doctor_name
        const hospitalName = doctor.hospital.hospital_name

        console.log('Userdata', user)
        console.log('Doctor', doctor)
      } else if (newStatus === "cancel") {

      }

    } catch (error) {
      console.error("Supabase Error:", error.message);
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  const handleOpenProposeModal = (item) => {
    setSelectedApp(item);
    setCustomDate("");
    setCustomTime("");
    setShowModal(true);
  };

  const handleSaveCustomDate = async () => {
    if (!customDate || !customTime) {
      alert("กรุณาเลือกทั้งวันที่และเวลา");
      return;
    }
    const dateTimeString = `${customDate}T${customTime}:00`;
    const dateObject = new Date(dateTimeString);
    await handleStatusChange(selectedApp.app_id, "booked", dateObject.toISOString());
    setShowModal(false);
  };
  const filteredAppointments = appointments.filter((item) => {
    const matchesStatus =
      filterStatus === "ทั้งหมด" || item.status === filterStatus;
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      item.user.full_name.toLowerCase().includes(lowerQuery) ||
      item.app_id.toLowerCase().includes(lowerQuery) ||
      item.user.phone.toLowerCase().includes(lowerQuery);
    return matchesStatus && matchesSearch;
  });

  const renderStatusBadge = (status) => {
    let styles = "",
      icon = null;
    switch (status) {
      case "booked":
        styles = "bg-green-600 text-white";
        icon = <CheckCircle size={14} />;
        break;
      case "pending":
        styles = "bg-yellow-400 text-black";
        icon = <Clock size={14} />;
        break;
      case "cancel":
        styles = "bg-red-600 text-white";
        icon = <XCircle size={14} />;
        break;
      default:
        styles = "bg-gray-200 text-gray-800";
    }
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${styles}`}
      >
        {icon} {status}
      </span>
    );
  };

  useEffect(() => {
    const statusMap = {
      ทั้งหมด: "ทั้งหมด",
      booked: "อนุมัติแล้ว",
      pending: "รออนุมัติ",
      cancel: "ยกเลิก",
    };
    setFilterStatusDisplay(statusMap[filterStatus] || "ทั้งหมด");
  }, [filterStatus]);

  return (

    <div className="flex h-screen bg-gray-50 relative">
      <AdminSidebar />
      <div className="m-5 flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
          <h1 className="text-xl font-bold text-navy">รายการนัดหมาย</h1>
          <div className="flex gap-3">
            <div className="position-relative" style={{ width: "325px" }}>
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3 pe-none">
                <Search size={18} color="#001f3f" />
              </div>
              <input
                type="text"
                className="fs-5 form-control rounded-pill ps-5 form-control-navy"
                placeholder="ค้นหาด้วยชื่อ, รหัส, เบอร์โทร"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dropdown>
              <Dropdown.Toggle
                style={{ width: "160px" }}
                variant="success"
                className="text-navy fs-5 rounded-pill flex items-center justify-between px-4 py-2 border rounded-full text-sm font-medium bg-white hover:bg-gray-50"
              >
                {filterStatusDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus("ทั้งหมด")}>
                  ทั้งหมด
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-success"
                  onClick={() => setFilterStatus("booked")}
                >
                  <CheckCircle size={16} /> อนุมัติแล้ว
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-warning"
                  onClick={() => setFilterStatus("pending")}
                >
                  <Clock size={16} /> รออนุมัติ
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-danger"
                  onClick={() => setFilterStatus("cancel")}
                >
                  <XCircle size={16} /> ยกเลิก
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div
          className="bg-white rounded-xl border border-indigo-100 shadow-sm mt-4"
          style={{ overflow: "visible" }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-navy font-semibold fs-5">
                <th className="p-4 max-w-10!">รหัส</th>
                <th className="p-4">วันที่/เวลา (ที่เสนอ)</th>
                <th className="p-4">ผู้ป่วย</th>
                <th className="p-4">แพทย์</th>
                <th className="p-4 text-center">สถานะ</th>
                <th className="p-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-light text-gray-700 truncate! max-w-50! h-fit">
                      {item.app_id}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.status === "booked" && item.confirmed_at ? (
                        <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-200 w-fit">
                          <Calendar size={16} />
                          {new Date(item.confirmed_at).toLocaleDateString(
                            "th-TH",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                          <span className="text-sm font-normal text-green-600">
                            (
                            {new Date(item.confirmed_at).toLocaleTimeString(
                              "th-TH",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                            )
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {item.appointment_slots.map((slot, idx) => {
                            const dt = new Date(slot.slot_datetime);
                            return (
                              <div
                                key={idx}
                                className="d-flex align-items-center gap-2"
                              >
                                <span
                                  className="badge bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: 20, height: 20 }}
                                >
                                  {idx + 1}
                                </span>
                                {dt.toLocaleDateString("th-TH")}
                                <span className="text-gray-400 text-sm">
                                  (
                                  {dt.toLocaleTimeString("th-TH", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  )
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {item.user.full_name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {item.user.phone}
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {item.doctor.doctor_name}
                    </td>
                    <td className="p-4 text-center align-middle">
                      <div className="d-flex justify-content-center">
                        {renderStatusBadge(item.status)}
                      </div>
                    </td>

                    <td className="p-4 text-center align-middle">
                      <div className="d-flex justify-content-center">
                        <Dropdown drop="end">
                          <Dropdown.Toggle as={CustomToggle}>
                            <MoreVertical size={18} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            container={document.body}
                            className="shadow-lg border-0 p-2 rounded-3"
                            style={{ minWidth: "250px", zIndex: 1050 }}
                          >
                            <Dropdown.Header className="text-xs font-bold text-gray-400 uppercase px-2 py-1">
                              อนุมัติโดยเลือกวันที่
                            </Dropdown.Header>
                            {item.appointment_slots.map((slots, idx) => {
                              const dt = new Date(slots.slot_datetime);
                              return (
                                <Dropdown.Item
                                  key={idx}
                                  onClick={() =>
                                    handleStatusChange(
                                      item.app_id,
                                      "booked",
                                      slots.slot_datetime
                                    )
                                  }
                                  className="d-flex align-items-center gap-3 py-2 rounded hover:bg-gray-50 cursor-pointer"
                                >
                                  <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="d-flex flex-column lh-1">
                                    <span className="text-sm font-medium text-navy">
                                      {dt.toLocaleDateString("th-TH", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">
                                      เวลา{" "}
                                      {dt.toLocaleTimeString("th-TH", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      น.
                                    </span>
                                  </div>
                                  <CheckCircle
                                    size={16}
                                    className="ms-auto text-gray-300"
                                  />
                                </Dropdown.Item>
                              );
                            })}
                            <Dropdown.Divider className="my-2" />
                            <Dropdown.Item
                              onClick={() => handleOpenProposeModal(item)}
                              className="d-flex align-items-center gap-2 text-info py-2 rounded hover:bg-red-50"
                            >
                              <CircleQuestionMark size={16} /> เสนอวันที่อื่น
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(item.app_id, "cancel", null)
                              }
                              className="d-flex align-items-center gap-2 text-danger py-2 rounded hover:bg-red-50"
                            >
                              <XCircle size={16} /> ปฏิเสธ/ยกเลิก
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(item.app_id, "pending", null)
                              }
                              className="text-muted small text-center py-1"
                            >
                              รีเซ็ตสถานะ
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    ไม่พบข้อมูลที่ค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal (Tailwind CSS Only) --- */}
      {showModal && (
        <div className="fixed inset-0 `z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-8! transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-[#1f2054]">
                กำหนดวันนัดหมายใหม่
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-sm text-gray-700 space-y-1">
                <p className="fs-5">
                  ผู้ป่วย:{" "}
                  <span className="font-semibold text-[#001f3f]">
                    {selectedApp?.user.full_name}
                  </span>
                </p>
                <p className="fs-5">
                  แพทย์:{" "}
                  <span className="font-semibold text-[#001f3f]">
                    {selectedApp?.doctor.doctor_name}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="px-32! text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เลือกวันที่
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-4 py-2.5! rounded-xl border border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all
                  [&::-webkit-calendar-picker-indicator]:invert
                  [&::-webkit-calendar-picker-indicator]:p-1
                  [&::-webkit-calendar-picker-indicator]:cursor-pointer
                  [&::-webkit-calendar-picker-indicator]:rounded-xl
                [&::-webkit-calendar-picker-indicator]:bg-orange-200
                    "
                  />
                </div>
                <div className="px-36! text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เลือกเวลา
                  </label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full px-4 py-2.5! rounded-xl border border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all
                  [&::-webkit-calendar-picker-indicator]:invert
                  [&::-webkit-calendar-picker-indicator]:cursor-pointer
                  [&::-webkit-calendar-picker-indicator]:rounded-xl
                [&::-webkit-calendar-picker-indicator]:bg-orange-200
                    "
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl! text-gray-600 font-medium hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveCustomDate}
                className="px-5  rounded-xl! py-3!  bg-[#001f3f] text-white font-medium hover:bg-blue-900 shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save size={18} /> บันทึกและอนุมัติ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
