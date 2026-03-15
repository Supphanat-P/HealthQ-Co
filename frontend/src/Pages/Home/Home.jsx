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

const Home = ({ lang }) => {
  const text = {
    TiTle: lang === "TH" ? "เราใส่ใจสุขภาพของคุณ" : "WE CARE ABOUT YOUR HEALTH",
    subTiTle:
      lang === "TH"
        ? "ทุกวันคือโอกาสใหม่สำหรับคุณที่จะทำเพื่อสุขภาพของคุณ"
        : "every day is a new opportunity for you to do something for your health.",
    apmNow:
      lang === "TH"
        ? "นัดหมายแพทย์เลยตอนนี้"
        : "Make an appointment with a doctor now",
    searchPld:
      lang === "TH"
        ? "ค้นหาโรงพยาบาล/ชื่อแพทย์/ความชำนาญ"
        : "Search for hospital/doctor name/specialty",
    special: lang === "TH" ? "ความชำนาญ" : "Expertise",
    seeAll: lang === "TH" ? "ดูทั้งหมด" : "View all",
    use: lang === "TH" ? "วิธีการใช้งาน" : "How to use it",
    fourStep:
      lang === "TH"
        ? "เพียง 4 ขั้นตอนง่ายๆ คุณก็สามารถจองนัดหมายกับแพทย์ได้ทันที"
        : "Just four easy steps and you can instantly book an appointment with a doctor.",
    about: lang === "TH" ? "เกี่ยวกับเรา" : "About Us",
    service: lang === "TH" ? "บริการ" : "Services",
    helpSup: lang === "TH" ? "ช่วยเหลือ & สนับสนุน" : "Help & Support",
    socialM: lang === "TH" ? "โซเชียลมีเดีย" : "Social Media",
  };
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
    navigate("/DoctorSearch", { state: { selectedSearch: selectedSearch } });
  };

  return (
    <>
      <div className="bg-slate-50! min-h-screen!">
        {/* Hero Section with Background */}
        <div className="relative! w-full! min-h-[650px]! bg-linear-to-br! from-blue-950! via-blue-900! to-blue-600! overflow-hidden!">
          {/* Decorative circles */}
          <div className="absolute! w-[600px]! h-[600px]! rounded-full! bg-blue-500/20! -top-40! -right-20! blur-3xl!" />
          <div className="absolute! w-[500px]! h-[500px]! rounded-full! bg-blue-400/10! -bottom-36! -left-20! blur-3xl!" />

          <div className="flex! items-center! justify-center! h-full! py-20!">
            <div className="flex! flex-col! items-center! text-center! text-white! z-10! max-w-4xl! px-4!">
              <h1 className="text-5xl! md:text-7xl! font-extrabold! tracking-tight! drop-shadow-lg! leading-tight!">
                {text.TiTle}
              </h1>

              <p className="text-xl! md:text-2xl! mt-6! leading-relaxed! text-blue-100! font-light! max-w-2xl!">
                {text.subTiTle}
              </p>
              {/* Search and Quick Actions Section */}
              <div className="pt-8! w-full!">
                <div className="">
                  {/* Search Bar */}
                  <div className="flex! justify-center! mb-6! mt-2!">
                    <div className="flex! items-center! w-full! max-w-2xl! h-16! bg-white! rounded-full! shadow-2xl! shadow-blue-900/50! transition-transform! duration-300! hover:scale-[1.02]!">
                      <button
                        onClick={handleSearch}
                        className="w-14! h-14! ml-1! bg-linear-to-br! from-blue-600! to-blue-800! flex! items-center! justify-center! rounded-full! shadow-md! hover:shadow-lg! transition-all!"
                      >
                        <Search size={22} className="text-white!" />
                      </button>
                      <Autocomplete
                        freeSolo
                        options={options}
                        groupBy={(option) => option.category}
                        getOptionLabel={(option) => option.title || ""}
                        value={selectedSearch}
                        onChange={(event, newValue) =>
                          setSelectedSearch(newValue)
                        }
                        onInputChange={(event, newInputValue) =>
                          setSelectedSearch({ title: newInputValue })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={text.searchPld}
                            variant="standard"
                            fullWidth
                            className="px-4! text-blue-900!"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch();
                            }}
                            InputProps={{
                              ...params.InputProps,
                              disableUnderline: true,
                              className:
                                "h-full! text-lg! text-slate-700! mt-1!",
                            }}
                          />
                        )}
                        className="flex-1! h-full! flex! items-center! px-2!"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Link className="no-underline!" to="/DoctorSearch">
                <button
                  className="
                      group!
                      relative!
                      overflow-hidden!
                      w-auto! h-[65px]!
                      rounded-full!
                      px-8!
                      mt-6!
                      bg-white!
                      text-blue-900!
                      text-xl! font-bold!
                      shadow-xl!
                      hover:shadow-blue-500/40!
                      hover:-translate-y-1!
                      transition-all! duration-300!
                      flex! items-center! justify-center! gap-3!
                    "
                >
                  <div className="absolute! inset-0! bg-blue-50! opacity-0! group-hover:opacity-100! transition-opacity! duration-300!" />
                  <span className="relative! flex! items-center! gap-3!">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-700! group-hover:animate-bounce!"
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
                    {text.apmNow}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ความชำนาญ */}
        <div className="py-24! px-6! max-w-7xl! mx-auto!">
          <div className="flex! justify-between! items-end! mb-8!">
            <div className="text-4xl! font-bold! text-blue-950! relative!">
              {text.special}
              <div className="absolute! -bottom-2! left-0! w-1/2! h-1.5! bg-blue-600! rounded-full!"></div>
            </div>

            <button
              onClick={() => {
                setView(!view);
              }}
              className="text-blue-600! font-semibold! text-lg! flex! items-center! cursor-pointer! hover:text-blue-800! transition-colors! duration-200!"
            >
              {text.seeAll}
              <BiChevronRight
                size={26}
                className="ml-1! transition-transform! duration-300! group-hover:translate-x-1!"
              />
            </button>
          </div>

          <div className="grid! grid-cols-2! sm:grid-cols-3! md:grid-cols-4! gap-6!">
            {specialties.slice(0, view ? specialties.length : 8).map((sst) => (
              <div
                key={sst.specialty_id}
                onClick={() => {
                  navigate("/DoctorSearch", {
                    state: { selectedSpecialty: sst.specialty_name },
                  });
                }}
                className="cursor-pointer! group!"
              >
                <div
                  className="
                  p-6! rounded-2xl! w-full! h-44! 
                  flex! flex-col! items-center! justify-center! 
                  transition-all! duration-300! 
                  bg-white! 
                  border! border-slate-100! 
                  shadow-md! shadow-slate-200/50!
                  group-hover:-translate-y-2! 
                  group-hover:shadow-xl! group-hover:shadow-blue-200!
                  group-hover:border-blue-200!
                  relative! overflow-hidden!
                "
                >
                  <div className="absolute! top-0! right-0! w-24! h-24! bg-blue-50! rounded-bl-full! -mr-8! -mt-8! transition-transform! group-hover:scale-150! duration-500!" />

                  {sst.specialty_name === "หู คอ จมูก" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Ear size={26} />
                    </div>
                  )}

                  {sst.specialty_name === "ตา" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Eye size={26} />
                    </div>
                  )}

                  {sst.specialty_name === "สุขภาพสตรี" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Venus size={26} />
                    </div>
                  )}

                  {sst.specialty_name === "สุขภาพเพศชาย" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Mars size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "หัวใจ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Heart size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ตรวจสุขภาพ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Bandage size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "กระดูกและข้อ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Bone size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบประสาทและสมอง" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Brain size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ส่งเสริมสุขภาพและอาชีวเวชศาสตร์" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Cross size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "อายุรกรรม" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Stethoscope size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบทางเดินปัสสาวะ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Droplet size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "เวชศาสตร์ฟื้นฟู และกายภาพบำบัด" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Accessibility size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "วิสัญญี" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Syringe size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "เวชกรรม" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Wand size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "โรคระบบทางเดินหายใจ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <LungsIcon size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "รังสีวินิจฉัย X-Ray" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <Activity size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ทันตกรรม" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <DentalToothIcon size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ผิวหนัง" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <FourFinger02Icon size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ระบบทางเดินอาหารและตับ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <LiverIcon size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "เบาหวานและต่อมไร้ท่อ" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <BloodPressureIcon size={26} />
                    </div>
                  )}
                  {sst.specialty_name === "ศัลยกรรม" && (
                    <div className="flex! justify-center! items-center! rounded-full! text-white! mb-4! z-10! w-14! h-14! bg-linear-to-br! from-blue-900! to-blue-700! shadow-lg!">
                      <StarFaceIcon size={26} />
                    </div>
                  )}
                  <div className="text-center! z-10!">
                    <p className="mb-0! font-bold! text-slate-700! group-hover:text-blue-900! transition-colors!">
                      {sst.specialty_name}
                    </p>
                    <p className="mb-0!">{}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="py-20! px-6! bg-white!">
          <div className="text-center! mb-20!">
            <h2 className="text-4xl! md:text-5xl! font-bold! text-blue-950! mb-4!">
              {text.use}
            </h2>
            <p className="text-xl! text-slate-500! max-w-3xl! mx-auto!">
              {text.fourStep}
            </p>
          </div>

          <div className="flex! flex-wrap! justify-center! items-start! gap-10! max-w-7xl! mx-auto!">
            {[
              {
                num: "1",
                title: lang === "TH" ? "การใช้ตัวกรอง" : "Using filters",
                desc:
                  lang === "TH"
                    ? "เลือกโรงพยาบาลเพื่อที่จะต้องนำทำการนัดหมาย"
                    : "Select the hospital to make an appointment with.",
                bgColor: "from-blue-500 to-blue-700",
                borderColor: "border-blue-100",
                cardBg: "bg-white",
              },
              {
                num: "2",
                title:
                  lang === "TH"
                    ? "เลือกแพทย์และความชำนาญ"
                    : "Choose a doctor and their expertise",
                desc:
                  lang === "TH"
                    ? "เลือกแพทย์ที่ต้องการจากรายชื่อแพทย์ผู้เชี่ยวชาญของเรา"
                    : "Select your desired doctor from our list of specialists.",
                bgColor: "from-blue-500 to-blue-700",
                borderColor: "border-blue-100",
                cardBg: "bg-white",
              },
              {
                num: "3",
                title:
                  lang === "TH" ? "เลือกวันและเวลา" : "Select date and time",
                desc:
                  lang === "TH"
                    ? "เลือกวันที่และเวลาที่สะดวกสำหรับคุณจากตารางที่ว่าง"
                    : "Choose a date and time that is convenient for you from the available schedule.",
                bgColor: "from-blue-500 to-blue-700",
                borderColor: "border-blue-100",
                cardBg: "bg-white",
              },
              {
                num: "4",
                title: lang === "TH" ? "ยืนยันนัดหมาย" : "Confirm appointment",
                desc:
                  lang === "TH"
                    ? "ยืนยันการนัดหมายและรับการแจ้งเตือนก่อนถึงเวลานัด"
                    : "Confirm your appointment and get a reminder before your appointment time.",
                bgColor: "from-blue-500 to-blue-700",
                borderColor: "border-blue-100",
                cardBg: "bg-white",
              },
            ].map((step, index) => (
              <div
                className="flex! flex-col! items-center! text-center! w-[280px]! relative! group!"
                key={index}
              >
                {/* Step Number Badge */}
                <div
                  className={`
                    absolute! -top-6! z-20!
                    w-12! h-12! 
                    bg-linear-to-br! ${step.bgColor}! 
                    rounded-full! 
                    flex! items-center! justify-center! 
                    text-white! font-bold! text-xl! 
                    shadow-lg! ring-4! ring-white!
                    transition-transform! duration-300! group-hover:scale-110!
                  `}
                >
                  {step.num}
                </div>

                <div
                  className={`
                    w-full! h-[200px]! 
                    ${step.cardBg}! 
                    rounded-2xl! 
                    border! ${step.borderColor}! 
                    shadow-lg! shadow-slate-200!
                    overflow-hidden!
                    group-hover:shadow-2xl! group-hover:shadow-blue-200!
                    transition-all! duration-300! group-hover:-translate-y-2!
                  `}
                >
                  {step.num === "1" ? (
                    <video
                      src={choose}
                      muted
                      loop
                      controls
                      className="w-full! h-full! object-cover!"
                    />
                  ) : step.num === "2" ? (
                    <video
                      src={chooseDoctors}
                      muted
                      loop
                      controls
                      className="w-full! h-full! object-cover!"
                    />
                  ) : step.num === "3" ? (
                    <video
                      src={chooseDays}
                      muted
                      loop
                      controls
                      className="w-full! h-full! object-cover!"
                    />
                  ) : step.num === "4" ? (
                    <video
                      src={comfirm}
                      muted
                      loop
                      controls
                      className="w-full! h-full! object-cover!"
                    />
                  ) : (
                    <div className="flex! items-center! justify-center! h-full! bg-slate-50!">
                      <span className="text-6xl! opacity-20! font-bold! text-blue-800!">
                        {step.num}
                      </span>
                    </div>
                  )}
                </div>
                {/* Text อยู่ใต้คลิป */}
                <div className="mt-8!">
                  <h5 className="text-blue-900! font-bold! text-lg! mb-2!">
                    {step.title}
                  </h5>
                  <p className="text-slate-500! text-sm! leading-relaxed!">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900! py-16! px-6! relative! overflow-hidden!">
        {/* Footer Decorative */}
        <div className="absolute! top-0! left-0! w-full! h-2! bg-linear-to-r! from-blue-500! via-purple-500! to-blue-500!" />

        <div className="max-w-7xl! mx-auto! text-center!">
          <h2 className="text-white! text-3xl! font-bold! mb-8! tracking-wider!">
            Health Queue
          </h2>

          <div className="flex! flex-wrap! justify-center! items-center! gap-8! mb-10!">
            {[text.about, text.service, text.helpSup, text.socialM].map(
              (item, index) => (
                <button
                  key={index}
                  className="bg-transparent! border-none! text-slate-300! text-base! font-medium! hover:text-white! transition-colors! duration-300!"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="w-full! h-px! bg-slate-800! my-8!" />

          <div className="text-slate-500! text-sm!">
            © 2025 Health Queue. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
