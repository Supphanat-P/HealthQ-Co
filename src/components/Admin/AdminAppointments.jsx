import { useState, forwardRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
  Check,
  CalendarCheck,
} from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";
import "dayjs/locale/th";
import { useData } from "../../Context/DataContext";
import { supabase } from "../../config/supabaseClient";
import AdminSidebar from "./AdminSidebar";
import toast from "react-hot-toast";

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
  // ดึงข้อมูลและฟังก์ชันจาก Context
  const {
    currentUser,
    appointments,
    fetchAndSetData,
    sendEmailForApprove,
    sendEmailForCancel,
  } = useData();

  // State สำหรับตัวกรองและการค้นหา
  const [filterStatusDisplay, setFilterStatusDisplay] = useState("ทั้งหมด");
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  // Security Check เช็คสิทธิ์ Admin
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "admin") return <Navigate to="/login" replace />;

  // ฟังก์ชันเปลี่ยนสถานะ
  const handleStatusChange = async (app_id, newStatus, selectedDate = null) => {
    try {
      // อัปเดตสถานะลง Supabase
      const { error } = await supabase
        .from("appointments")
        .update({
          status: newStatus,
          confirmed_at: selectedDate,
          updated_at: new Date().toISOString(),
        })
        .eq("app_id", app_id);

      if (error) throw error;
      toast.success("สถานะอัปเดตเรียบร้อย");

      // รีเฟรชข้อมูลให้เป็นปัจจุบันทันที
      await fetchAndSetData();

      // ดึงข้อมูลนัดเพื่อเตรียมส่งเมล
      const appointment = appointments.find((item) => item.app_id === app_id);
      if (!appointment || !appointment.user || !appointment.doctor) {
        console.error("Could not find appointment details to send email.");
        return;
      }

      // ส่งอีเมลแจ้งเตือนตามสถานะ
      if (newStatus === "booked") {
        // อนุมัติ Booked
        const date = new Date(selectedDate).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const time = new Date(selectedDate).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const emailResult = await sendEmailForApprove({
          to: appointment.user.email,
          subject: "การนัดหมายถูกอนุมัติแล้ว (Appointment Approved)",
          patientName: appointment.user.full_name,
          doctorName: appointment.doctor.doctor_name,
          hospitalName: appointment.doctor.hospital.hospital_name,
          date: date,
          time: `${time} น.`,
        });

        if (emailResult.success) {
          toast.success("ส่งอีเมลยืนยันเรียบร้อยแล้ว");
        } else {
          toast.error("ไม่สามารถส่งอีเมลยืนยันได้");
        }
      } else if (newStatus === "cancel") {
        // ปฏิเสธ/ยกเลิก Cancel
        const emailResult = await sendEmailForCancel({
          to: appointment.user.email,
          subject: "การนัดหมายของคุณถูกปฎิเสธ"
        });

        if (emailResult.success) {
          toast.success("ส่งอีเมลแจ้งยกเลิกสำเร็จ");
        } else {
          toast.error("ส่งอีเมลแจ้งยกเลิกไม่สำเร็จ");
        }
      }
    } catch (error) {
      console.error("Supabase Error:", error.message);
      toast.error("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  // Logic Modal เสนอวันนัดใหม่
  const handleOpenProposeModal = (item) => {
    setSelectedApp(item);
    setCustomDate("");
    setCustomTime("");
    setShowModal(true);
  };

  const handleSaveCustomDate = async () => {
    if (!customDate || !customTime) {
      toast.error("กรุณาเลือกทั้งวันที่และเวลา");
      return;
    }
    //จัดวันเวลา
    const dateTimeString = `${customDate}T${customTime}:00`;
    const dateObject = new Date(dateTimeString);

    // เปลี่ยนสถานะเป็น Booked ตามวันเวลาที่เลือกใหม่
    await handleStatusChange(
      selectedApp.app_id,
      "booked",
      dateObject.toISOString()
    );
    setShowModal(false);
  };

  // Logic การกรองข้อมูล Search & Filter
  const filteredAppointments = appointments.filter((item) => {
    // กรองตาม Dropdown สถานะ
    const matchesStatus =
      filterStatus === "ทั้งหมด" || item.status === filterStatus;

    // กรองตามคำค้นหา ชื่อ, รหัส, เบอร์โทร
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      (item.user?.full_name || "").toLowerCase().includes(lowerQuery) ||
      (String(item.app_id) || "").toLowerCase().includes(lowerQuery) ||
      (item.user?.phone || "").toLowerCase().includes(lowerQuery);

    return matchesStatus && matchesSearch;
  });

  // ฟังก์ชันเลือกสี Badge ตามสถานะ
  const renderStatusBadge = (status) => {
    let styles = "",
      icon = null;
    switch (status) {
      case "booked":
        styles = "bg-blue-700 text-white";
        icon = <CalendarCheck size={14} />;
        break;
      case "pending":
        styles = "bg-yellow-400 text-black";
        icon = <Clock size={14} />;
        break;
      case "completed":
        styles = "bg-green-600 text-white";
        icon = <CheckCircle size={14} />;
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

  // อัปเดตข้อความบนปุ่ม Dropdown เมื่อเลือก Filter
  useEffect(() => {
    const statusMap = {
      ทั้งหมด: "ทั้งหมด",
      booked: "อนุมัติแล้ว",
      pending: "รออนุมัติ",
      completed: "นัดหมายเสร็จสิ้น",
      cancel: "ยกเลิก",
    };
    setFilterStatusDisplay(statusMap[filterStatus] || "ทั้งหมด");
  }, [filterStatus]);

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <AdminSidebar />
      <div className="m-5 flex-1 p-6 overflow-auto">
        {/* --- Header: หัวข้อและช่องค้นหา --- */}
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
          <h2 className="text-xl font-bold text-navy">รายการนัดหมาย</h2>
          <div className="flex gap-3">
            {/* Search Box */}
            <div className="position-relative" style={{ width: "325px" }}>
              <div className="position-absolute pb-1! top-50 start-0 translate-middle-y ms-3 pe-none">
                <Search size={20} color="#001f3f" />
              </div>
              <input
                type="text"
                className="fs-5 form-control rounded-pill ps-5 form-control-navy"
                placeholder="ค้นหาด้วยชื่อ, รหัส, เบอร์โทร"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dropdown Filter Status */}
            <Dropdown>
              <Dropdown.Toggle
                style={{ width: "160px" }}
                variant="success"
                className="text-navy fs-5 w-50! pl-4! rounded-pill flex px-4 py-2 border rounded-full text-sm font-medium bg-white hover:bg-gray-50"
              >
                {filterStatusDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus("ทั้งหมด")}>
                  ทั้งหมด
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-primary"
                  onClick={() => setFilterStatus("booked")}
                >
                  <CalendarCheck size={16} /> อนุมัติแล้ว
                </Dropdown.Item>
                {/* ... ตัวเลือกอื่นๆ ... */}
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-warning"
                  onClick={() => setFilterStatus("pending")}
                >
                  <Clock size={16} /> รออนุมัติ
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-success"
                  onClick={() => setFilterStatus("completed")}
                >
                  <CheckCircle size={16} /> นัดหมายเสร็จสิ้น
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

        {/* --- Table: ตารางแสดงข้อมูล --- */}
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
                    key={item.app_id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* รหัสนัดหมาย */}
                    <td className="p-4 font-light text-gray-700 truncate! max-w-50! h-fit">
                      {item.app_id}
                    </td>

                    {/* แสดงวันที่นัด */}
                    <td className="p-4 text-gray-600">
                      {item.status === "booked" && item.confirmed_at ? (
                        // กรณีอนุมัติแล้ว
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
                        // กรณีรออนุมัติ โชว์ เวลาที่userเลือกมา
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

                    {/* ข้อมูลผู้ป่วยและแพทย์ */}
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

                    {/* Badge สถานะ */}
                    <td className="p-4 text-center align-middle">
                      <div className="d-flex justify-content-center">
                        {renderStatusBadge(item.status)}
                      </div>
                    </td>

                    {/* ปุ่ม จัดการ */}
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
                            <Dropdown.Header className="d-flex text-xs font-bold text-blue-700! uppercase px-2 py-1">
                              <Calendar size={18} />
                              &nbsp; อนุมัติโดยเลือกวันที่
                            </Dropdown.Header>
                            {/* Loop สร้างเมนูเลือกเวลาจาก Slot ที่ลูกค้าส่งมา */}
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
                                  {/* ส่วนแสดงเวลาใน Dropdown */}
                                  <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold fs-5! shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="d-flex flex-column  lh-1">
                                    <span className="fs-5! font-medium text-navy">
                                      {dt.toLocaleDateString("th-TH", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                    <span className="text-ss text-gray-500 mt-1">
                                      เวลา{" "}
                                      {dt.toLocaleTimeString("th-TH", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}{" "}
                                      น.
                                    </span>
                                  </div>
                                </Dropdown.Item>
                              );
                            })}
                            <Dropdown.Divider className="my-2" />

                            {/* เมนูจัดการอื่นๆ */}
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
                              className="d-flex text-yellow-600! d-flex align-items-center gap-2 text-info py-2 rounded hover:bg-red-50"
                            >
                              <Clock size={16} />
                              &nbsp; รีเซ็ตสถานะ
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleStatusChange(
                                  item.app_id,
                                  "completed",
                                  null
                                )
                              }
                              className="d-flex text-green-800!
                               d-flex align-items-center gap-2 text-info py-2 rounded hover:bg-red-50"
                            >
                              <CheckCircle size={16} />
                              &nbsp; นัดหมายเสร็จสิ้น
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

      {/* Modalหน้าต่ */}
      {showModal && (
        <div className="fixed inset-0 `z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-8! transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header Modal */}
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

            {/* Body Modal: เลือกวันเวลา */}
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
                  <label className="block fs-5 font-medium text-gray-700 mb-1">
                    เลือกวันที่
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-4 py-2.5! rounded-xl border border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all..."
                  />
                </div>
                <div className="px-36! text-center">
                  <label className="block fs-5 font-medium text-gray-700 mb-1">
                    เลือกเวลา
                  </label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full px-4 py-2.5! rounded-xl border border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all..."
                  />
                </div>
              </div>
            </div>

            {/* Footer Modal: ปุ่มบันทึก/ยกเลิก */}
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
