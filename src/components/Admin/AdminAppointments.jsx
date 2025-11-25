import { useState, forwardRef } from "react";
import AdminSidebar from "./AdminSidebar";
import { Search, MoreVertical, CheckCircle, XCircle, Calendar, Clock, CircleQuestionMark } from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useData } from "../../Context/DataContext";
import { useEffect } from "react";
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
  const { currentUser, appointments } = useData();
  const [filterStatusDisplay, setFilterStatusDisplay] = useState("ทั้งหมด");
  if (!currentUser) return window.location.href = "/login";
  if (currentUser.role !== "admin") return window.location.href = "/login";

  // State สำหรับการค้นหาและกรองสถานะ
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");


  // ฟังก์ชันอัปเดตสถานะและวันที่เมื่อกดเลือกจากเมนู
  const handleStatusChange = (id, newStatus, selectedDate = null) => {
    setMockAppointments((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, selectedDate: selectedDate }
          : item
      )
    );
  };

  // ฟังก์ชันกรองข้อมูลที่จะแสดงในตาราง (เช็คทั้งสถานะ และ คำค้นหา)
  const filteredAppointments = appointments.filter((item) => {
    const matchesStatus = filterStatus === "ทั้งหมด" || item.status === filterStatus;
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      item.user.full_name.toLowerCase().includes(lowerQuery) ||
      item.app_id.toLowerCase().includes(lowerQuery) ||
      item.user.phone.toLowerCase().includes(lowerQuery);
    return matchesStatus && matchesSearch;
  });

  // ฟังก์ชันสร้าง Badge สถานะ (สีและไอคอน)
  const renderStatusBadge = (status) => {
    let styles = "";
    let icon = null;
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
        icon = null;
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${styles}`}>
        {icon} {status}
      </span>
    );
  };

  // แสดงfilerเป็นภาษาไทย
  useEffect(() => {
    const statusMap = {
      "ทั้งหมด": "ทั้งหมด",
      booked: "อนุมัติแล้ว",
      pending: "รออนุมัติ",
      cancel: "ยกเลิก",
    };

    setFilterStatusDisplay(statusMap[filterStatus] || "ทั้งหมด");
  }, [filterStatus]);



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="m-5 flex-1 p-6 overflow-auto">

        {/* Header Section*/}
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
          <h1 className="text-xl font-bold text-navy">รายการนัดหมาย</h1>
          <div className="flex gap-3">
            {/* ช่องค้นหา (Search Input) */}
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

            {/* ปุ่มตัวกรอง (Filter Dropdown) */}
            <Dropdown>
              <Dropdown.Toggle
                style={{ width: "160px" }}
                variant="success"
                className="text-navy fs-5 rounded-pill flex items-center justify-between px-4 py-2 border rounded-full text-sm font-medium bg-white hover:bg-gray-50"
              >
                {filterStatusDisplay}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus("ทั้งหมด")}>ทั้งหมด</Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-success" onClick={() => setFilterStatus("booked")}>
                  <CheckCircle size={16} /> อนุมัติแล้ว
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-warning" onClick={() => setFilterStatus("pending")}>
                  <Clock size={16} /> รออนุมัติ
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-danger" onClick={() => setFilterStatus("cancel")}>
                  <XCircle size={16} /> ยกเลิก
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* --- Table Section */}
        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm mt-4" style={{ overflow: "visible" }}>
          <table className="w-full text-left border-collapse">

            {/* Table Head */}
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

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-light text-gray-700 truncate! max-w-50! h-fit">{item.app_id}</td>

                    {/* วันที่นัดหมาย */}
                    <td className="p-4 text-gray-600">
                      {item.status === "อนุมัติแล้ว" && item.selectedDate ? (
                        // กรณีอนุมัติแล้ว โชว์แค่วันเดียว (สีเขียว)
                        <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-200 w-fit">
                          <Calendar size={16} /> {item.selectedDate}
                        </div>
                      ) : (
                        // กรณีรออนุมัติ: โชว์ทั้ง 3 วันที่เสนอมา
                        <div className="space-y-2">
                          {item.appointment_slots.map((slot, idx) => {
                            console.log(slot)
                            const dt = new Date(slot.slot_datetime);
                            return (
                              <div key={idx} className="d-flex align-items-center gap-2">
                                <span
                                  className="badge bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ width: 20, height: 20 }}
                                >
                                  {idx + 1}
                                </span>

                                {dt.toLocaleDateString("th-TH")}
                                <span className="text-gray-400 text-sm">
                                  ({dt.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-gray-800">{item.user.full_name}</div>
                      <div className="text-sm text-gray-400">{item.user.phone}</div>
                    </td>
                    <td className="p-4 text-gray-700">{item.doctor.doctor_name}</td>

                    {/* สถานะ (ใช้ฟังก์ชัน renderStatusBadge) */}
                    <td className="p-4 text-center align-middle">
                      <div className="d-flex justify-content-center">
                        {renderStatusBadge(item.status)}
                      </div>
                    </td>

                    {/* ปุ่มจัดการ (Dropdown) */}
                    <td className="p-4 text-center align-middle">
                      <div className="d-flex justify-content-center">
                        <Dropdown drop="end">
                          <Dropdown.Toggle as={CustomToggle}>
                            <MoreVertical size={18} />
                          </Dropdown.Toggle>

                          {/* เมนูย่อยสำหรับกดอนุมัติ */}
                          <Dropdown.Menu
                            container={document.body}
                            className="shadow-lg border-0 p-2 rounded-3"
                            style={{ minWidth: '250px', zIndex: 1050 }}
                          >
                            <Dropdown.Header className="text-xs font-bold text-gray-400 uppercase px-2 py-1">
                              อนุมัติโดยเลือกวันที่
                            </Dropdown.Header>

                            {/* ตัวเลือกวันที่ 1 */}
                            <Dropdown.Item
                              onClick={() => handleStatusChange(item.app_id, "อนุมัติแล้ว", `${item.date_1} ${item.time_1}`)}
                              className="d-flex align-items-center gap-3 py-2 rounded hover:bg-gray-50"
                            >
                              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                              <div className="d-flex flex-column lh-1">
                                <span className="text-sm font-medium text-navy">{item.date_1}</span>
                                <span className="text-xs text-gray-400 mt-1">{item.time_1}</span>
                              </div>
                              <CheckCircle size={16} className="ms-auto text-gray-300" />
                            </Dropdown.Item>

                            {/* ตัวเลือกวันที่ 2 */}
                            <Dropdown.Item
                              onClick={() => handleStatusChange(item.id, "อนุมัติแล้ว", `${item.date_2} ${item.time_2}`)}
                              className="d-flex align-items-center gap-3 py-2 rounded hover:bg-gray-50"
                            >
                              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                              <div className="d-flex flex-column lh-1">
                                <span className="text-sm font-medium text-navy">{item.date_2}</span>
                                <span className="text-xs text-gray-400 mt-1">{item.time_2}</span>
                              </div>
                              <CheckCircle size={16} className="ms-auto text-gray-300" />
                            </Dropdown.Item>

                            {/* ตัวเลือกวันที่ 3 */}
                            <Dropdown.Item
                              onClick={() => handleStatusChange(item.id, "อนุมัติแล้ว", `${item.date_3} ${item.time_3}`)}
                              className="d-flex align-items-center gap-3 py-2 rounded hover:bg-gray-50"
                            >
                              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                              <div className="d-flex flex-column lh-1">
                                <span className="text-sm font-medium text-navy">{item.date_3}</span>
                                <span className="text-xs text-gray-400 mt-1">{item.time_3}</span>
                              </div>
                              <CheckCircle size={16} className="ms-auto text-gray-300" />
                            </Dropdown.Item>

                            <Dropdown.Divider className="my-2" />
                            <Dropdown.Item
                              className="d-flex align-items-center gap-2 text-info py-2 rounded hover:bg-red-50"
                            >
                              <CircleQuestionMark size={16} /> เสนอวันที่อื่น
                            </Dropdown.Item>
                            {/* ตัวเลือกยกเลิก */}
                            <Dropdown.Item
                              onClick={() => handleStatusChange(item.app_id, "ยกเลิก", null)}
                              className="d-flex align-items-center gap-2 text-danger py-2 rounded hover:bg-red-50"
                            >
                              <XCircle size={16} /> ปฏิเสธ/ยกเลิก
                            </Dropdown.Item>

                            {/* ตัวเลือกรีเซ็ต */}
                            <Dropdown.Item
                              onClick={() => handleStatusChange(item.id, "รออนุมัติ", null)}
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
                // กรณีไม่พบข้อมูล
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default AdminAppointments;