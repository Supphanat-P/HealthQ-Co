import AdminSidebar from "./AdminSidebar";
import { Search, ChevronDown, MoreVertical } from "lucide-react";

const AdminAppointments = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="m-5 flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
          <h1 className="text-xl font-bold text-navy">รายการนัดหมาย</h1>

          <div className="flex gap-3">
            {/* Search Box */}
            <div className="position-relative" style={{ width: "325px" }}>
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3 pe-none">
                <Search size={18} color="#001f3f" />
              </div>
              <input
                type="text"
                className="fs-5 form-control rounded-pill ps-5 form-control-navy"
                placeholder="ค้นหาด้วยชื่อ, รหัส, เบอร์โทร"
              />
            </div>

            {/* Filter Button */}
            <button className="text-navy fs-5 rounded-pill flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium bg-white hover:bg-gray-50">
              ทั้งหมด <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-navy font-semibold fs-5">
                <th className="p-4">รหัส</th>
                <th className="p-4">วันที่/เวลา</th>
                <th className="p-4">ผู้ใช้บริการ</th>
                <th className="p-4">แพทย์</th>
                <th className="p-4">แผนก</th>
                <th className="p-4 text-center">สถานะ</th>
                <th className="p-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* ยืนยันแล้ว */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-700">001</td>
                <td className="p-4 text-gray-600">
                  <div>00/00/0000</div>
                  <div className="text-sm text-gray-400">09:00 น.</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">นายสมชาย ใจดี</div>
                  <div className="text-sm text-gray-400">062-979-7123</div>
                </td>
                <td className="p-4 text-gray-700">นายหงสาวดี แซ่หลี</td>
                <td className="p-4 text-gray-700">หัวใจ</td>
                <td className="p-4 text-center">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-green-600 fs-7 text-white">
                    ยืนยันแล้ว
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>

              {/* รอที่ยืนยัน */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-700">002</td>
                <td className="p-4 text-gray-600">
                  <div>00/00/0000</div>
                  <div className="text-sm text-gray-400">11:00 น.</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">
                    นางสมหญิง ใจดี
                  </div>
                  <div className="text-sm text-gray-400">062-973-5454</div>
                </td>
                <td className="p-4 text-gray-700">นายหงสาวดี แซ่หลี</td>
                <td className="p-4 text-gray-700">หัวใจ</td>
                <td className="p-4 text-center">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-yellow-400 fs-7 text-black">
                    รอที่ยืนยัน
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>

              {/* ยกเลิก */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-700">003</td>
                <td className="p-4 text-gray-600">
                  <div>00/00/0000</div>
                  <div className="text-sm text-gray-400">14:00 น.</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">นายสมใจ ใจดี</div>
                  <div className="text-sm text-gray-400">000-000-0000</div>
                </td>
                <td className="p-4 text-gray-700">นายหงสาวดี แซ่หลี</td>
                <td className="p-4 text-gray-700">หัวใจ</td>
                <td className="p-4 text-center">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-red-600 fs-7 text-white">
                    ยกเลิก
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
