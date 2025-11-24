import { useState, forwardRef } from "react";
import AdminSidebar from "./AdminSidebar";
import { Search, MoreVertical, CheckCircle, XCircle, Calendar, Clock } from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";

// ปุ่ม MoreVertical
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
  const [appointments, setAppointments] = useState([
    {
      id: "001",
      date_1: "01/01/2025", time_1: "09:00 น.",
      date_2: "02/01/2025", time_2: "10:00 น.",
      date_3: "03/01/2025", time_3: "11:00 น.",
      patient: "นายสมชาย ใจดี",
      phone: "0629797123",
      doctor: "นายหงสาวดี แซ่หลี",
      dept: "หัวใจ",
      status: "อนุมัติแล้ว",
      selectedDate: "01/01/2025 09:00 น.", 
    },
    {
      id: "002",
      date_1: "05/02/2025", time_1: "13:00 น.",
      date_2: "06/02/2025", time_2: "14:00 น.",
      date_3: "07/02/2025", time_3: "15:00 น.",
      patient: "นางสมหญิง ใจดี",
      phone: "0629735454",
      doctor: "นายหงสาวดี แซ่หลี",
      dept: "หัวใจ",
      status: "รออนุมัติ",
      selectedDate: null,
    },
    {
      id: "003",
      date_1: "10/03/2025", time_1: "10:00 น.",
      date_2: "11/03/2025", time_2: "11:00 น.",
      date_3: "12/03/2025", time_3: "12:00 น.",
      patient: "นายสมใจ ใจดี",
      phone: "0000000000",
      doctor: "นายหงสาวดี แซ่หลี",
      dept: "หัวใจ",
      status: "ยกเลิก",
      selectedDate: null,
    },
  ]);

  // State สำหรับการค้นหาและกรองสถานะ
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  
  // ฟังก์ชันอัปเดตสถานะและวันที่เมื่อกดเลือกจากเมนู
  const handleStatusChange = (id, newStatus, selectedDate = null) => {
    setAppointments((prevData) =>
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
      item.patient.toLowerCase().includes(lowerQuery) ||
      item.id.toLowerCase().includes(lowerQuery) ||
      item.phone.toLowerCase().includes(lowerQuery);
    return matchesStatus && matchesSearch;
  });

  // ฟังก์ชันสร้าง Badge สถานะ (สีและไอคอน)
  const renderStatusBadge = (status) => {
    let styles = "";
    let icon = null;
    switch (status) {
      case "อนุมัติแล้ว":
        styles = "bg-green-600 text-white";
        icon = <CheckCircle size={14} />;
        break;
      case "รออนุมัติ":
        styles = "bg-yellow-400 text-black";
        icon = <Clock size={14} />;
        break;
      case "ยกเลิก":
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
                {filterStatus}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterStatus("ทั้งหมด")}>ทั้งหมด</Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-success" onClick={() => setFilterStatus("อนุมัติแล้ว")}>
                  <CheckCircle size={16} /> อนุมัติแล้ว
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-warning" onClick={() => setFilterStatus("รออนุมัติ")}>
                  <Clock size={16} /> รออนุมัติ
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center gap-2 text-danger" onClick={() => setFilterStatus("ยกเลิก")}>
                  <XCircle size={16} /> ยกเลิก
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* --- Table Section */}
        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden mt-4" style={{ overflow: "visible" }}>
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead className="bg-gray-50 border-b">
              <tr className="text-navy font-semibold fs-5">
                <th className="p-4">รหัส</th>
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
                    <td className="p-4 font-medium text-gray-700">{item.id}</td>
                    
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
                          {[
                            { d: item.date_1, t: item.time_1, i: 1 },
                            { d: item.date_2, t: item.time_2, i: 2 },
                            { d: item.date_3, t: item.time_3, i: 3 },
                          ].map((dt) => (
                            <div key={dt.i} className="d-flex align-items-center gap-2">
                              <span className="badge bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 20, height: 20 }}>{dt.i}</span>
                              {dt.d} <span className="text-gray-400 text-sm">({dt.t})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-gray-800">{item.patient}</div>
                      <div className="text-sm text-gray-400">{item.phone}</div>
                    </td>
                    <td className="p-4 text-gray-700">{item.doctor}</td>
                    
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
                          <Dropdown.Menu className="shadow-lg border-0 p-2 rounded-3" style={{ minWidth: '250px', zIndex: 1050 }}>
                            <Dropdown.Header className="text-xs font-bold text-gray-400 uppercase px-2 py-1">
                              อนุมัติโดยเลือกวันที่
                            </Dropdown.Header>

                            {/* ตัวเลือกวันที่ 1 */}
                            <Dropdown.Item 
                              onClick={() => handleStatusChange(item.id, "อนุมัติแล้ว", `${item.date_1} ${item.time_1}`)}
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
                            
                            {/* ตัวเลือกยกเลิก */}
                            <Dropdown.Item 
                              onClick={() => handleStatusChange(item.id, "ยกเลิก", null)}
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
    </div>
  );
};

export default AdminAppointments;