import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AdminSidebar from "./AdminSidebar";
import { useData } from "../../Context/DataContext";
import { Mail, Phone, Search, User } from "lucide-react";

const AdminPatients = () => {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { currentUser, usersInfo } = useData();

  // 1. STATE สำหรับเก็บข้อมูลที่ใช้ในตาราง/ค้นหา
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. useEffect สำหรับโหลดข้อมูลจาก Context
  useEffect(() => {
    if (usersInfo && usersInfo.length > 0) {
      setPatients(usersInfo); // โหลดข้อมูลเมื่อ usersInfo มา
    }
  }, [usersInfo]);

  if (!currentUser) return (window.location.href = "/login");
  if (currentUser.role !== "admin") return (window.location.href = "/login");

  // 3. ฟังก์ชัน Filter
  const filteredPatients = patients.filter((patient) => {
    const lowerQuery = searchQuery.toLowerCase();
    // ใช้ user_id และ full_name ตามโครงสร้างข้อมูลจริง
    return (
      patient.full_name?.toLowerCase().includes(lowerQuery) ||
      patient.user_id?.toLowerCase().includes(lowerQuery) ||
      patient.phone?.toLowerCase().includes(lowerQuery)
    );
  });

  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="m-5 flex-1 p-6 overflow-auto">
        <div className="flex-1 overflow-auto p-6">
          {/* Header และ Search Box */}
          <div className="bg-white rounded-xl border border-indigo-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4 sticky top-0 z-10">
            <h2 className="text-xl font-bold text-navy">รายการผู้ใช้บริการ</h2>

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
                  {/* ใช้ filteredPatients ในการแสดงผล */}
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50/50 transition-colors text-gray-700"
                      >
                        <td className="p-4 font-light">
                          {patient.user_id.slice(0, 22)}...
                        </td>
                        <td className="p-4">
                          <div className="font-simibold  text-gray-900">
                            {patient.full_name}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-900">
                            {(patient.phone || "").replace(
                              /(\d{3})(\d{3})(\d{4})/,
                              "$1-$2-$3"
                            )}
                          </div>
                          <div className="text-gray-500">{patient.email}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-2 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                            {patient.blood_type || "-"}
                            {/* ใช้ - หากข้อมูลนี้ยังไม่มี */}
                          </span>
                        </td>
                        <td className="p-4 font-simibold text-center">
                          {patient.visitCount || 0}
                          {/* ใช้ 0 หากข้อมูลนี้ยังไม่มี */}
                        </td>
                        <td className="p-4 font-simibold text-center">
                          {patient.lastVisit || "-"}
                          {/* ใช้ - หากข้อมูลนี้ยังไม่มี */}
                        </td>
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

      {/* Modal Dialog รายละเอียดผู้ป่วย (ไม่ต้องแก้ไข) */}
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
                      <div className="flex-1! w-full!">
                        <h4 className="text-3xl! font-bold! bg-linear-to-r! from-blue-600! to-blue-800! bg-clip-text! text-transparent! mb-2!">
                          {selectedPatient.full_name}
                        </h4>
                        <p className="text-base! text-blue-600! font-semibold! mb-6! flex! items-center! gap-2!">
                          <span className="inline-block! w-2! h-2! bg-blue-400! rounded-full!"></span>
                          รหัส: {selectedPatient.user_id}
                        </p>
                        <div className="grid! sm:grid-cols-2! gap-x-6! gap-y-4!">
                          {/* Gender */}
                          <div className="bg-white! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-gray-100!">
                            <p className="text-gray-500! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              เพศ
                            </p>
                            <p className="font-bold! text-lg! text-gray-900!">
                              {selectedPatient.gender}
                            </p>
                          </div>
                          {/* DOB */}
                          <div className="bg-white! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-gray-100!">
                            <p className="text-gray-500! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              วันเกิด
                            </p>
                            <p className="font-bold! text-lg! text-gray-900!">
                              {selectedPatient.dob}
                            </p>
                          </div>
                          {/* Nationality */}
                          <div className="bg-white! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-gray-100!">
                            <p className="text-gray-500! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              สัญชาติ
                            </p>
                            <p className="font-bold! text-lg! text-gray-900!">
                              {selectedPatient.nation}
                            </p>
                          </div>
                          {/* Blood Type */}
                          <div className="bg-linear-to-br! from-red-50! to-red-100! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-red-200!">
                            <p className="text-red-600! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              หมู่เลือด
                            </p>
                            <p className="font-bold! text-2xl! text-red-600!">
                              {selectedPatient.blood_type}
                            </p>
                          </div>
                          {/* Height */}
                          <div className="bg-linear-to-br! from-emerald-50! to-emerald-100! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-emerald-200!">
                            <p className="text-emerald-600! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              ส่วนสูง
                            </p>
                            <p className="font-bold! text-lg! text-emerald-700!">
                              {selectedPatient.height}
                              <span className="text-xs! font-normal! text-emerald-600! ml-1!">
                                ซม.
                              </span>
                            </p>
                          </div>
                          {/* Weight */}
                          <div className="bg-linear-to-br! from-purple-50! to-purple-100! p-4! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-purple-200!">
                            <p className="text-purple-600! text-xs! font-bold! uppercase! tracking-wider! mb-2!">
                              น้ำหนัก
                            </p>
                            <p className="font-bold! text-lg! text-purple-700!">
                              {selectedPatient.weight}
                              <span className="text-xs! font-normal! text-purple-600! ml-1!">
                                กก.
                              </span>
                            </p>
                          </div>
                          {/* Contact Info */}
                          <div className="sm:col-span-2! bg-linear-to-r! from-blue-50! to-cyan-50! p-5! rounded-lg! shadow-md! hover:shadow-lg! transition-shadow! border! border-blue-200!">
                            <p className="text-blue-700! text-xs! font-bold! uppercase! tracking-wider! mb-4!">
                              ข้อมูลติดต่อ
                            </p>
                            <div className="flex! flex-col! gap-3!">
                              <p className="text-gray-900! flex! items-center! gap-3! font-medium!">
                                <span className="w-9! h-9! rounded-full! bg-blue-500! text-white! flex! items-center! justify-center! shrink-0! shadow-md!">
                                  <Phone size={16} />
                                </span>
                                {selectedPatient.phone}
                              </p>
                              <p className="text-gray-900! flex! items-center! gap-3! font-medium!">
                                <span className="w-9! h-9! rounded-full! bg-blue-500! text-white! flex! items-center! justify-center! shrink-0! shadow-md!">
                                  <Mail size={16} />
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
                      className="inline-flex w-full justify-center rounded-xl! bg-[#1f2054] px-4.5! py-2.5! text-sm font-semibold text-white shadow-sm hover:bg-[#1f2054] sm:ml-3 sm:w-auto transition-colors"
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
