import { useState } from "react";
import {
  Search,
  User,
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  TriangleAlert,
  Phone,
  Mail,
} from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AdminSidebar from "./AdminSidebar";
import { useData } from "../../Context/DataContext";

const AdminPatients = () => {
  const [open, setOpen] = useState(false); // ควบคุมการเปิดปิด Modal
  const [selectedPatient, setSelectedPatient] = useState(null); // เก็บข้อมูลคนไข้ที่เลือก
  const { currentUser } = useData();
  if (!currentUser) return window.location.href = "/login";
  if (currentUser.role !== "admin") return window.location.href = "/login";
  // Mock Data
  const patients = [
    {
      id: "001",
      name: "นายสมชาย ใจดี",
      gender: "ชาย",
      dob: "15/04/2533",
      nationality: "ไทย",
      height: "175",
      weight: "70",
      phone: "0629797123",
      email: "somchai@gmail.com",
      bloodType: "O+",
      visitCount: "5 ครั้ง",
      lastVisit: "10/11/2568",
    },
    {
      id: "002",
      name: "นางสาวสมหญิง ใจดี",
      gender: "หญิง",
      dob: "20/02/2538",
      nationality: "ไทย",
      height: "160",
      weight: "48",
      phone: "0629735454",
      email: "somying@gmail.com",
      bloodType: "O+",
      visitCount: "2 ครั้ง",
      lastVisit: "01/11/2568",
    },
    {
      id: "003",
      name: "นายสมใจ ใจดี",
      gender: "ชาย",
      dob: "05/12/2540",
      nationality: "ไทย",
      height: "180",
      weight: "75",
      phone: "0629797123",
      email: "somjai@gmail.com",
      bloodType: "B",
      visitCount: "0 ครั้ง",
      lastVisit: "-",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(lowerQuery) ||
      patient.id.toLowerCase().includes(lowerQuery) ||
      patient.phone.toLowerCase().includes(lowerQuery)
    );
  });

  // ฟังก์ชันเปิด Modal พร้อมเซตข้อมูล
  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <div className="m-5 flex-1 p-6 overflow-auto">
        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4 sticky top-0 z-10">
            <h2 className="text-xl  font-bold text-navy">รายการผู้ใช้บริการ</h2>

            {/* Search Box */}
            <div className="position-relative" style={{ width: "325px" }}>
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3 pe-none">
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
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border mt-4 border-indigo-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-navy font-semibold fs-5">
                    <th className="p-4">รหัส</th>
                    <th className="p-4">ผู้ใช้บริการ</th>
                    <th className="p-4">ติดต่อ</th>
                    <th className="p-4 text-center">หมู่เลือด</th>
                    <th className="p-4 text-center">จำนวนครั้ง</th>
                    <th className="p-4 text-center">ครั้งล่าสุด</th>
                    <th className="p-4 text-center">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50/50 transition-colors font-medium text-gray-700"
                      >
                        <td className="p-4">{patient.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            ID: {patient.idCard}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-900">{patient.phone}</div>
                          <div className="text-sm text-gray-500">
                            {patient.email}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-2 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                            {patient.bloodType}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {patient.visitCount}
                        </td>
                        <td className="p-4 text-center">{patient.lastVisit}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleOpenModal(patient)}
                            className="rounded-pill px-4 py-1.5 border border-[#1f2054] text-[#1f2054] hover:bg-[#1f2054] hover:text-white transition-all text-sm font-medium shadow-sm active:scale-95"
                          >
                            ดูรายละเอียด
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-10 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Search size={48} className="text-gray-300 mb-2" />
                          <p>ไม่พบรายชื่อที่ค้นหา</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog รายละเอียดผู้ป่วย */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 w-screen overflow-y-auto z-50">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              {selectedPatient && (
                <>
                  <div className="bg-[#1f2054] px-4 py-4 sm:px-6 flex justify-between items-center">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-bold text-white flex items-center gap-2"
                    >
                      <User size={20} className="text-blue-200" />
                      รายละเอียดผู้ป่วย
                    </DialogTitle>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-white/70 hover:text-white"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                      {/* Avatar */}
                      <div className="shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-50 shadow-inner">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="mt-2 text-center"></div>
                      </div>

                      <div className="flex-1 w-full">
                        <h4 className="text-xl font-bold text-[#001f3f] mb-1">
                          {selectedPatient.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                          รหัส: {selectedPatient.id}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                              เพศ
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedPatient.gender}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                              วันเกิด
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedPatient.dob}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                              สัญชาติ
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedPatient.nationality}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                              หมู่เลือด
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedPatient.bloodType}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 text-xs">ส่วนสูง</p>
                            <p className="font-semibold text-[#001f3f]">
                              {selectedPatient.height}{" "}
                              <span className="text-xs font-normal text-gray-500">
                                ซม.
                              </span>
                            </p>
                            <div>
                              <p className="text-gray-500 text-xs">น้ำหนัก</p>
                              <p className="font-semibold text-[#001f3f]">
                                {selectedPatient.weight}{" "}
                                <span className="text-xs font-normal text-gray-500">
                                  กก.
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1 col-span-1 sm:col-span-2 pt-2 border-t border-gray-100">
                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                              ข้อมูลติดต่อ
                            </p>
                            <div className="flex flex-col gap-1">
                              <p className="text-gray-900 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
                                  <Phone size={12} />
                                </span>
                                {selectedPatient.phone}
                              </p>
                              <p className="text-gray-900 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
                                  <Mail size={12} />
                                </span>
                                {selectedPatient.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-pill inline-flex w-full justify-center rounded-lg bg-[#1f2054] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1f2054] sm:ml-3 sm:w-auto transition-colors"
                    >
                      ปิดหน้าต่าง
                    </button>
                  </div>
                </>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminPatients;
