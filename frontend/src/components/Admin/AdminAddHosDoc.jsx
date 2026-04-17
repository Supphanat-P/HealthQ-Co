import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useData } from "../../Context/DataContext";
import { Building2, Stethoscope, Trash2, Plus, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { insertDoctor, deleteDoctor, insertHospital, deleteHospital } from "../../Context/FetchData";

const AdminAddHosDoc = () => {
    const { currentUser, hospitals, doctors, specialties, fetchAndSetData } = useData();
    const [activeTab, setActiveTab] = useState("hospital"); // "hospital" or "doctor"

    // Hospital Form State
    const [newHospital, setNewHospital] = useState({
        hospital_name: "",
        imgPath: "",
        lat: "",
        lang: "",
    });

    // Doctor Form State
    const [newDoctor, setNewDoctor] = useState({
        doctor_name: "",
        hospital_id: "",
        specialty_id: "",
    });

    if (!currentUser) return (window.location.href = "/login");
    if (currentUser.role !== "admin") return (window.location.href = "/login");

    // Handlers for Hospital
    const handleAddHospital = async (e) => {
        e.preventDefault();
        if (!newHospital.hospital_name || !newHospital.imgPath || !newHospital.lat || !newHospital.lang) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        try {
            toast.loading("กำลังเพิ่มโรงพยาบาล...", { id: "addHospital" });
            await insertHospital({
                hospital_name: newHospital.hospital_name,
                imgPath: newHospital.imgPath,
                lat: parseFloat(newHospital.lat),
                lang: parseFloat(newHospital.lang),
            });
            toast.success("เพิ่มโรงพยาบาลสำเร็จ", { id: "addHospital" });
            setNewHospital({ hospital_name: "", imgPath: "", lat: "", lang: "" });
            fetchAndSetData(currentUser.id);
        } catch (error) {
            toast.error(error.message || "เกิดข้อผิดพลาดในการเพิ่มโรงพยาบาล", { id: "addHospital" });
        }
    };

    const handleDeleteHospital = async (id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโรงพยาบาลนี้? (อาจมีผลกระทบกับข้อมูลแพทย์)")) return;
        try {
            toast.loading("กำลังลบโรงพยาบาล...", { id: "delHospital" });
            await deleteHospital(id);
            toast.success("ลบโรงพยาบาลสำเร็จ", { id: "delHospital" });
            fetchAndSetData(currentUser.id);
        } catch (error) {
            toast.error(error.message || "เกิดข้อผิดพลาดในการลบโรงพยาบาล", { id: "delHospital" });
        }
    };

    // Handlers for Doctor
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        if (!newDoctor.doctor_name || !newDoctor.hospital_id || !newDoctor.specialty_id) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        try {
            toast.loading("กำลังเพิ่มข้อมูลแพทย์...", { id: "addDoctor" });
            await insertDoctor({
                doctor_name: newDoctor.doctor_name,
                hospital_id: parseInt(newDoctor.hospital_id),
                specialty_id: parseInt(newDoctor.specialty_id),
            });
            toast.success("เพิ่มข้อมูลแพทย์สำเร็จ", { id: "addDoctor" });
            setNewDoctor({ doctor_name: "", hospital_id: "", specialty_id: "" });
            fetchAndSetData(currentUser.id);
        } catch (error) {
            toast.error(error.message || "เกิดข้อผิดพลาดในการเพิ่มข้อมูลแพทย์", { id: "addDoctor" });
        }
    };

    const handleDeleteDoctor = async (id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลแพทย์นี้?")) return;
        try {
            toast.loading("กำลังลบข้อมูลแพทย์...", { id: "delDoctor" });
            await deleteDoctor(id);
            toast.success("ลบข้อมูลแพทย์สำเร็จ", { id: "delDoctor" });
            fetchAndSetData(currentUser.id);
        } catch (error) {
            toast.error(error.message || "เกิดข้อผิดพลาดในการลบข้อมูลแพทย์", { id: "delDoctor" });
        }
    };

    return (
        <div className="!flex !h-screen !bg-gray-50">
            <AdminSidebar />
            <div className="!flex-1 !p-6 !overflow-auto !m-5">

                {/* Header */}
                <div className="!bg-white !rounded-xl !border !border-indigo-100 !p-6 !mb-6 !shadow-sm !flex !flex-col md:!flex-row !justify-between !items-center !sticky !top-0 !z-10">
                    <h2 className="text-xl font-bold text-navy">จัดการข้อมูลโรงพยาบาลและแพทย์</h2>
                    <div className="!flex !gap-2 !mt-4 md:!mt-0">
                        <button
                            onClick={() => setActiveTab("hospital")}
                            className={`!rounded-lg !px-4 !py-2 !font-medium !flex !items-center !gap-2 !transition-colors ${activeTab === "hospital"
                                ? "!bg-[#1f2054] !text-white"
                                : "!bg-gray-100 !text-gray-600 hover:!bg-gray-200"
                                }`}
                        >
                            <Building2 size={18} />
                            โรงพยาบาล
                        </button>
                        <button
                            onClick={() => setActiveTab("doctor")}
                            className={`!px-4 !py-2 !rounded-lg !font-medium !flex !items-center !gap-2 !transition-colors ${activeTab === "doctor"
                                ? "!bg-[#1f2054] !text-white"
                                : "!bg-gray-100 !text-gray-600 hover:!bg-gray-200"
                                }`}
                        >
                            <Stethoscope size={18} />
                            แพทย์
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                {activeTab === "hospital" && (
                    <div className="!grid !grid-cols-1 xl:!grid-cols-3 !gap-6">
                        {/* Form */}
                        <div className="xl:!col-span-1 !bg-white !rounded-xl !border !border-indigo-100 !p-5 !shadow-sm !h-fit !sticky !top-[100px]">
                            <h3 className="!text-2xl !font-semibold text-navy !mb-4 !flex !items-center !gap-2">
                                <Plus size={20} className="text-navy" />
                                เพิ่มโรงพยาบาลใหม่
                            </h3>
                            <form onSubmit={handleAddHospital} className="!space-y-4">
                                <div>
                                    <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ชื่อโรงพยาบาล</label>
                                    <input
                                        type="text"
                                        className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none"
                                        placeholder="เช่น โรงพยาบาลกรุงเทพ"
                                        value={newHospital.hospital_name}
                                        onChange={(e) => setNewHospital({ ...newHospital, hospital_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ลิงก์รูปภาพ (URL)</label>
                                    <input
                                        type="text"
                                        className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none"
                                        placeholder="https://..."
                                        value={newHospital.imgPath}
                                        onChange={(e) => setNewHospital({ ...newHospital, imgPath: e.target.value })}
                                    />
                                </div>
                                <div className="!grid !grid-cols-2 !gap-4">
                                    <div>
                                        <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ละติจูด (Lat)</label>
                                        <input
                                            type="number"
                                            step="any"
                                            className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none"
                                            placeholder="13.7..."
                                            value={newHospital.lat}
                                            onChange={(e) => setNewHospital({ ...newHospital, lat: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ลองจิจูด (Lng)</label>
                                        <input
                                            type="number"
                                            step="any"
                                            className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none"
                                            placeholder="100.5..."
                                            value={newHospital.lang}
                                            onChange={(e) => setNewHospital({ ...newHospital, lang: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="!w-full !mt-2 !bg-[#1f2054] !text-white !py-2.5 !rounded-lg !font-medium hover:!bg-blue-900 !transition-all active:!scale-95"
                                >
                                    บันทึกข้อมูล
                                </button>
                            </form>
                        </div>

                        {/* Table */}
                        <div className="xl:!col-span-2 !bg-white !rounded-xl !border !border-indigo-100 !p-5 !shadow-sm">
                            <h3 className="!text-lg !font-semibold text-navy !mb-4">รายชื่อโรงพยาบาล</h3>
                            <div className="!overflow-x-auto">
                                <table className="!w-full !text-left !border !border-collapse !border-none">
                                    <thead className="!bg-gray-50">
                                        <tr className="!text-[#1f2054] !font-medium">
                                            <th className="!p-3">รหัส</th>
                                            <th className="!p-3">ชื่อโรงพยาบาล</th>
                                            <th className="!p-3">ตำแหน่ง (Lat, Lng)</th>
                                            <th className="!p-3 !text-center">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="!divide-y !divide-gray-100">
                                        {hospitals.length > 0 ? (
                                            hospitals.map((hospital) => (
                                                <tr key={hospital.hospital_id} className="hover:!bg-blue-50/50 !transition-colors">
                                                    <td className="!p-3 !text-gray-500 !font-light">{hospital.hospital_id}</td>
                                                    <td className="!p-3 !font-medium !text-gray-900 !flex !items-center !gap-3">
                                                        {hospital.imgPath && (
                                                            <img src={hospital.imgPath} alt={hospital.hospital_name} className="!w-10 !h-10 !rounded-full !object-cover !border !border-gray-200 !shadow-sm" />
                                                        )}
                                                        {hospital.hospital_name}
                                                    </td>
                                                    <td className="!p-3 !text-sm !text-gray-600">
                                                        {hospital.lat}, {hospital.lang}
                                                    </td>
                                                    <td className="!p-3 !text-center">
                                                        <button
                                                            onClick={() => handleDeleteHospital(hospital.hospital_id)}
                                                            className="!text-red-500 !p-2 !rounded-full !transition-colors !shadow-sm active:!scale-95"
                                                            title="ลบโรงพยาบาล"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="!p-8 !text-center !text-gray-500">
                                                    <AlertCircle size={40} className="!mx-auto !mb-2 !text-gray-300" />
                                                    ยังไม่มีข้อมูลโรงพยาบาล
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "doctor" && (
                    <div className="!grid !grid-cols-1 xl:!grid-cols-3 !gap-6">
                        {/* Form */}
                        <div className="xl:!col-span-1 !bg-white !rounded-xl !border !border-indigo-100 !p-5 !shadow-sm !h-fit !sticky !top-[100px]">
                            <h3 className="!text-2xl !font-semibold !text-gray-800 !mb-4 !flex !items-center !gap-2">
                                <Plus size={20} className="!text-[#1f2054]" />
                                เพิ่มข้อมูลแพทย์ใหม่
                            </h3>
                            <form onSubmit={handleAddDoctor} className="!space-y-4">
                                <div>
                                    <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ชื่อแพทย์</label>
                                    <input
                                        type="text"
                                        className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none"
                                        placeholder="เช่น นพ.สมชาย ใจดี"
                                        value={newDoctor.doctor_name}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, doctor_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">โรงพยาบาลประจำ</label>
                                    <select
                                        className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none !bg-white"
                                        value={newDoctor.hospital_id}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, hospital_id: e.target.value })}
                                    >
                                        <option value="">-- เลือกโรงพยาบาล --</option>
                                        {hospitals.map((h) => (
                                            <option key={h.hospital_id} value={h.hospital_id}>
                                                {h.hospital_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="!block !text-lg !font-medium !text-gray-700 !mb-1">ความเชี่ยวชาญเฉพาะทาง</label>
                                    <select
                                        className="!w-full !border !border-gray-300 !rounded-lg !p-2.5 focus:!ring-2 focus:!ring-[#1f2054] focus:!outline-none !bg-white"
                                        value={newDoctor.specialty_id}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, specialty_id: e.target.value })}
                                    >
                                        <option value="">-- เลือกความเชี่ยวชาญ --</option>
                                        {specialties.map((s) => (
                                            <option key={s.specialty_id} value={s.specialty_id}>
                                                {s.specialty_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="!w-full !mt-2 !bg-[#1f2054] !text-white !py-2.5 !rounded-lg !font-medium hover:!bg-blue-900 !transition-all active:!scale-95"
                                >
                                    บันทึกข้อมูล
                                </button>
                            </form>
                        </div>

                        {/* Table */}
                        <div className="xl:!col-span-2 !bg-white !rounded-xl !border !border-indigo-100 !p-5 !shadow-sm">
                            <h3 className="!text-lg !font-semibold !text-gray-800 !mb-4">รายชื่อแพทย์</h3>
                            <div className="!overflow-x-auto">
                                <table className="!w-full !text-left !border !border-collapse border-none">
                                    <thead className="!bg-gray-50">
                                        <tr className="!text-[#1f2054] !font-medium">
                                            <th className="!p-3">รหัส</th>
                                            <th className="!p-3">ชื่อแพทย์</th>
                                            <th className="!p-3">โรงพยาบาล</th>
                                            <th className="!p-3 !text-center">ความเชี่ยวชาญ</th>
                                            <th className="!p-3 !text-center">จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="!divide-y !divide-gray-100">
                                        {doctors.length > 0 ? (
                                            doctors.map((doc) => {
                                                // Find related hospital and specialty names if not nested in the object already
                                                const hospital = hospitals.find(h => h.hospital_id === doc.hospital_id);
                                                const specialty = specialties.find(s => s.specialty_id === doc.specialty_id);

                                                return (
                                                    <tr key={doc.doctor_id} className="hover:!bg-blue-50/50 !transition-colors">
                                                        <td className="!p-3 !text-gray-500 !font-light">{doc.doctor_id}</td>
                                                        <td className="!p-3 !font-medium !text-gray-900">{doc.doctor_name}</td>
                                                        <td className="!p-3 !text-sm !text-gray-600">{hospital?.hospital_name || doc.hospital_name || "-"}</td>
                                                        <td className="!p-3 !text-sm !text-gray-600 !text-center">
                                                            <span className="!inline-block !bg-indigo-50 !text-indigo-700 !px-3 !py-1 !rounded-full !text-xs !font-semibold !border !border-indigo-100">
                                                                {specialty?.specialty_name || doc.specialty_name || "-"}
                                                            </span>
                                                        </td>
                                                        <td className="!p-3 !text-center">
                                                            <button
                                                                onClick={() => handleDeleteDoctor(doc.doctor_id)}
                                                                className="!text-red-500 hover:!text-white !p-2 !rounded-full !transition-colors !shadow-sm"
                                                                title="ลบข้อมูลแพทย์"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="!p-8 !text-center !text-gray-500">
                                                    <AlertCircle size={40} className="!mx-auto !mb-2 !text-gray-300" />
                                                    ยังไม่มีข้อมูลแพทย์
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminAddHosDoc;