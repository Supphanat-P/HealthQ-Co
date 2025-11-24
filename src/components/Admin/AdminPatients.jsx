import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Search } from "lucide-react"; // เหลือแค่ Search icon ที่ใช้

const AdminPatients = () => {
  // Mock Data
  const patients = [
    {
      id: "001",
      name: "นายสมชาย ใจดี",
      phone: "062-979-7123",
      email: "somchai@gmail.com",
      bloodType: "O+",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
    {
      id: "002",
      name: "นายสมหญิง ใจดี",
      phone: "062-973-5454",
      email: "somying@gmail.com",
      bloodType: "O+",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
    {
      id: "003",
      name: "นายสมใจ ใจดี",
      phone: "062-979-7123",
      email: "somjai@gmail.com",
      bloodType: "B",
      visitCount: "0 ครั้ง",
      lastVisit: "00/00/0000",
    },
  ];

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
              placeholder="ค้นหาด้วยรหัส, ขื่อ, เบอร์โทร"
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
              {patients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors font-medium ">
                  <td className="p-4">{patient.id}</td>
                  <td className="p-4">{patient.name}</td>
                  <td className="p-4">
                    <div>{patient.phone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;