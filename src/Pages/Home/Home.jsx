import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { useData } from "../../Context/DataContext";
import { useState } from "react";
import choose from "../../assets/choose.mp4";
import chooseDoctors from "../../assets/chooseDoctors.mp4";
import chooseDays from "../../assets/chooseDays.mp4";
import comfirm from "../../assets/comfirm.mp4";
import { Link } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  Ear,
  Eye,
  Venus,
  Mars,
  Heart,
  Bandage,
  Bone,
  Brain,
  Cross,
  Stethoscope,
  Droplet,
  Accessibility,
  Syringe,
  Wand,
  Activity,
  Search,
  Phone,
} from "lucide-react";
import {
  DentalToothIcon,
  LungsIcon,
  FourFinger02Icon,
  LiverIcon,
  BloodPressureIcon,
  StarFaceIcon,
} from "hugeicons-react";

export default function Home() {
  const { specialties, hospitals, doctors, searchData } = useData();
  console.log(specialties);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const options = (searchData || []).map((option) => ({
    id: option.id,
    title: option.name,
    category: option.category,
  }));
  const [selectedSearch, setSelectedSearch] = useState(null);
  const handleSearch = () => {
    if (!selectedSearch) return;

    navigate("/DoctorSearch", { state: { selected: selectedSearch } });
  };

  return (
    <>
      <div className="bg-linear-to-b from-blue-100 to-white-400">
        {/* Hero Section with Background */}
        <div className="relative w-full min-h-[600px]! bg-linear-to-r from-blue-950 to-blue-500 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute w-[500px] h-[500px] rounded-full! bg-blue-400/10 -top-24 -right-24 blur-3xl" />
          <div className="absolute w-[400px] h-[400px] rounded-full! bg-blue-300/10 -bottom-36 -left-24 blur-3xl" />

          <div className="relative z-10 flex items-center justify-center min-h-[600px] px-5!">
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-6xl font-bold leading-tight mb-5 drop-shadow-2xl">
                WE CARE ABOUT <br /> YOUR HEALTH
              </h1>

              <p className="text-2xl mt-5! leading-relaxed max-w-3xl! text-white/90 drop-shadow-lg">
                every day is a new opportunity for you to do <br /> something
                for your health.
              </p>

              <Link className="no-deco" to="/DoctorSearch">
                <button
                  className="
                      group 
                      w-[370px] h-[70px] 
                      rounded-full! 
                      mt-10! 
                      bg-white! 
                      text-blue-900! 
                      text-2xl! font-semibold! 
                      shadow-xl! 
                      hover:shadow-2xl! hover:shadow-blue-400/40!
                      hover:-translate-y-1!
                      transition-all! duration-300! 
                      flex items-center! justify-center! gap-3!
                    "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-800 group-hover:animate-bounce"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  นัดหมายแพทย์เลยตอนนี้
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Search and Quick Actions Section */}
        <div className="py-16! px-5!">
          <div className="max-w-6xl! mx-auto">
            {/* Search Bar */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center w-full max-w-2xl h-16 bg-white rounded-full shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 hover:-translate-y-0.5 transition-all duration-300 ">
                <button
                  onClick={handleSearch}
                  className="w-16 h-16 rounded-full bg-linear-to-br from-blue-800 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/40 rounded-full!"
                >
                  <Search size={24} className="text-white" />
                </button>
                <Autocomplete
                  freeSolo
                  options={options}
                  groupBy={(option) => option.category}
                  getOptionLabel={(option) => option.title || ""}
                  value={selectedSearch}
                  onChange={(event, newValue) => setSelectedSearch(newValue)}
                  onInputChange={(event, newInputValue) =>
                    setSelectedSearch({ title: newInputValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="ค้นหาโรงพยาบาล ชื่อแพทย์ ความชำนาญ"
                      variant="standard"
                      fullWidth
                      className="px-5 text-blue-900"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        className: "h-full mt-3",
                      }}
                    />
                  )}
                  className="flex-1 h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ความชำนาญ */}
        <div className="py-30! px-75!">
          <div className="text-3xl font-bold text-blue-900">ความชำนาญ</div>

          <div className=" flex justify-start items-center mt-2">
            <span
              onClick={() => {
                setView(!view);
              }}
              className="text-blue-700 text-lg flex items-center cursor-pointer group"
            >
              ดูทั้งหมด
              <BiChevronRight
                size={24}
                className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7! mt-4!">
            {specialties.slice(0, view ? specialties.length : 8).map((sst) => (
              <div
                key={sst.specialty_id}
                onClick={() => {
                  navigate("/DoctorSearch", {
                    state: { selectedSpecialty: sst.specialty_name },
                  });
                }}
                className="cursor-pointer"
              >
                <div className="p-3! rounded-xl! w-full! h-40! flex flex-col items-center justify-center transition-all duration-300 cursor-pointer bg-linear-to-br from-blue-600/10 to-blue-600/5 border-2 border-blue-300 hover:-translate-y-1 hover:shadow-lg">
                  {sst.specialty_name === "หู คอ จมูก" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Ear size={24} />
                    </div>
                  )}

                  {sst.specialty_name === "ตา" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Eye size={24} />
                    </div>
                  )}

                  {sst.specialty_name === "สุขภาพสตรี" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Venus size={24} />
                    </div>
                  )}

                  {sst.specialty_name === "สุขภาพเพศชาย" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Mars size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "หัวใจ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Heart size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ตรวจสุขภาพ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Bandage size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "กระดูกและข้อ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Bone size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบประสาทและสมอง" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Brain size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ส่งเสริมสุขภาพและอาชีวเวชศาสตร์" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Cross size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "อายุรกรรม" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Stethoscope size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบทางเดินปัสสาวะ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Droplet size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "เวชศาสตร์ฟื้นฟู และกายภาพบำบัด" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Accessibility size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "วิสัญญี" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Syringe size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "เวชกรรม" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Wand size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบทางเดินหายใจ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <LungsIcon size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "รังสีวินิจฉัย X-Ray" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <Activity size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ทันตกรรม" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <DentalToothIcon size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ผิวหนัง" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <FourFinger02Icon size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ระบบทางเดินอาหารและตับ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <LiverIcon size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "เบาหวานและต่อมไร้ท่อ" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <BloodPressureIcon size={24} />
                    </div>
                  )}
                  {sst.specialty_name === "ศัลยกรรม" && (
                    <div
                      className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#1f2054",
                      }}
                    >
                      <StarFaceIcon size={24} />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="mb-0 font-bold">{sst.specialty_name}</p>
                    <p className="mb-0">{}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="py-20! px-5!">
          <div className="text-center mb-16!">
            <h2 className="text-5xl font-bold text-blue-900 mb-5">
              วิธีการใช้งาน
            </h2>
            <p className="text-2xl text-blue-700/80 max-w-3xl mx-auto">
              เพียง 4 ขั้นตอนง่ายๆ คุณก็สามารถจองนัดหมายกับแพทย์ได้ทันที
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-start gap-12! max-w-7xl! mx-auto!">
            {[
              {
                num: "1",
                title: "การใช้ตัวกรอง",
                desc: "เลือกโรงพยาบาลเพื่อที่จะต้องนำทำการนัดหมาย",
                bgColor: "from-blue-600 to-blue-700",
                borderColor: "border-blue-600/30",
                cardBg: "bg-linear-to-br from-blue-600/10 to-blue-600/5",
              },
              {
                num: "2",
                title: "เลือกแพทย์และความชำนาญ",
                desc: "เลือกแพทย์ที่ต้องการจากรายชื่อแพทย์ผู้เชี่ยวชาญของเรา",
                bgColor: "from-blue-600 to-blue-700",
                borderColor: "border-blue-600/30",
                cardBg: "bg-linear-to-br from-blue-600/10 to-blue-600/5",
              },
              {
                num: "3",
                title: "เลือกวันและเวลา",
                desc: "เลือกวันที่และเวลาที่สะดวกสำหรับคุณจากตารางที่ว่าง",
                bgColor: "from-blue-600 to-blue-700",
                borderColor: "border-blue-600/30",
                cardBg: "bg-linear-to-br from-blue-600/10 to-blue-600/5",
              },
              {
                num: "4",
                title: "ยืนยันนัดหมาย",
                desc: "ยืนยันการนัดหมายและรับการแจ้งเตือนก่อนถึงเวลานัด",
                bgColor: "from-blue-600 to-blue-700",
                borderColor: "border-blue-600/30",
                cardBg: "bg-linear-to-br from-blue-600/10 to-blue-600/5",
              },
            ].map((step, index) => (
              <div
                className="flex flex-col items-center text-center max-w-[280px] relative
                 hover:-translate-y-3 hover:scale-105 transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div
                  className={`w-[70px] h-[70px] bg-linear-to-br ${step.bgColor} rounded-full! flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10! -mb-9!`}
                >
                  {step.num}
                </div>
                <div
                  className={`w-full h-[200px] ${step.cardBg} rounded-3xl! border-3 ${step.borderColor} shadow-xl! flex items-center justify-center`}
                >
                  {step.num === "1" ? (
                    <video
                      src={choose}
                      muted
                      loop
                      controls
                      className="w-full h-full object-cover rounded-3xl!"
                    />
                  ) : step.num === "2" ? (
                    <video
                      src={chooseDoctors}
                      muted
                      loop
                      controls
                      className="w-full h-full object-cover rounded-3xl!"
                    />
                  ) : step.num === "3" ? (
                    <video
                      src={chooseDays}
                      muted
                      loop
                      controls
                      className="w-full h-full object-cover rounded-3xl!"
                    />
                  ) : step.num === "4" ? (
                    <video
                      src={comfirm}
                      muted
                      loop
                      controls
                      className="w-full h-full object-cover rounded-3xl!"
                    />
                  ) : (
                    <div className="text-6xl opacity-30 font-bold text-blue-800">
                      {step.num}
                    </div>
                  )}
                </div>
                {/* Text อยู่ใต้คลิป */}
                <div className="mt-6!">
                  <h5 className="text-blue-900 font-bold text-xl mb-2">
                    {step.title}
                  </h5>
                  <p className="text-blue-700/70 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 py-16! mt-5 px-5! relative">
        <div className="max-w-7xl! mx-auto">
          <h2 className="text-white text-4xl font-bold mb-10! text-center">
            Health Queue
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-12! mb-10!">
            {["About Us", "Services", "Help & Support", "Social Media"].map(
              (item, index) => (
                <button
                  key={index}
                  className="bg-transparent border-none text-white text-lg px-5! py-2 border-b-2 border-transparent hover:border-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="w-full h-px bg-white/30 my-8!" />

          <div className="text-white/80 text-sm text-center">
            © 2025 Health Queue
          </div>
        </div>
      </div>
    </>
  );
}
