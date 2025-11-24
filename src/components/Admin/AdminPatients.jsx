import { useState } from "react"; 
import AdminSidebar from "./AdminSidebar";
import { Search } from "lucide-react";

const AdminPatients = () => {
  // Mock Data
  const patients = [
    {
      id: "001",
      name: "นายสมชาย ใจดี",
      phone: "0629797123",
      email: "somchai@gmail.com",
      bloodType: "O+",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
    {
      id: "002",
      name: "นายสมหญิง ใจดี",
      phone: "0629735454",
      email: "somying@gmail.com",
      bloodType: "O+",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
    {
      id: "003",
      name: "นายสมใจ ใจดี",
      phone: "0629797123",
      email: "somjai@gmail.com",
      bloodType: "B",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
  ];

  // State เก็บคำค้นหา
  const [searchQuery, setSearchQuery] = useState("");

  // กรองข้อมูล (ค้นหาจาก ชื่อ, รหัส, หรือ เบอร์โทร)
  const filteredPatients = patients.filter((patient) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(lowerQuery) ||
      patient.id.toLowerCase().includes(lowerQuery) ||
      patient.phone.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main */}
      <div className="m-5 flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
          <h1 className="text-xl font-bold text-navy">รายการผู้ใช้บริการ</h1>

          {/* Search Box */}
          <div className="position-relative" style={{ width: "350px" }}>
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 pe-none">
              <Search size={18} color="#001f3f" />
            </div>
            <input
              type="text"
              className="fs-5 form-control rounded-pill ps-5 form-control-navy"
              placeholder="ค้นหาด้วยรหัส, ชื่อ, เบอร์โทร"
              value={searchQuery} // ผูกค่ากับ State
              onChange={(e) => setSearchQuery(e.target.value)} // อัปเดต State เมื่อพิมพ์
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-navy font-semibold">
                <th className="p-4">รหัส</th>
                <th className="p-4">ผู้ใช้บริการ</th>
                <th className="p-4">ติดต่อ</th>
                <th className="p-4 text-center">หมู่เลือด</th>
                <th className="p-4 text-center">จำนวนครั้ง</th>
                <th className="p-4 text-center">ครั้งล่าสุด</th>
                <th className="p-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors font-medium "
                  >
                    <td className="p-4">{patient.id}</td>
                    <td className="p-4">{patient.name}</td>
                    <td className="p-4">
                      <div>{patient.phone}</div>
                      <div className="text-sm text-gray-500">
                        {patient.email}
                      </div>
                    </td>
                    <td className="p-4 text-center">{patient.bloodType}</td>
                    <td className="p-4 text-center">{patient.visitCount}</td>
                    <td className="p-4 text-center">{patient.lastVisit}</td>
                    <td className="p-4 text-center">
                      <button className="rounded-pill px-4 py-1 border border-navy text-navy rounded-full hover:bg-navy hover:text-white transition-colors text-sm">
                        ดูรายละเอียด
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // กรณีไม่เจอข้อมูล
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    ไม่พบรายชื่อที่ค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;