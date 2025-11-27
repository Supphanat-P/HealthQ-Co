import React from 'react';
import { Search, Calendar, Phone } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
export default function Home() {

  const { specialties } = useData();
  console.log(specialties);
  const [view, setView] = useState(false);
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

              <button className="w-[275px] h-[70px] rounded-full! mt-10! bg-white text-blue-800 text-2xl font-semibold shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300">
                <a href="/doctorsearch" className="text-navy no-deco">
                  นัดหมายแพทย์
                </a>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <button className="bg-linear-to-br from-cyan-600 to-blue-700 rounded-2xl! px-10! py-5! flex items-center! gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-600/40 hover:-translate-y-2 transition-all duration-300 min-w-[200px]">
            <Search size={28} className="text-white" />
            <span className="text-white text-xl font-semibold">
              <Link to="/doctorsearch" className="no-deco">
                <span className="text-white no-deco text-xl font-semibold">ค้นหาแพทย์</span>
              </Link>
            </span>
          </button>
          <button className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl! px-10! py-5! flex items-center! gap-3 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-2 transition-all duration-300 min-w-[200px]">
            <Phone size={28} className="text-white" />
            <span className="text-white text-xl font-semibold">ติดต่อเรา</span>
          </button>
        </div>
      </div>

      {/* ความชำนาญ */}
      <div className="m-5 py-16! px-5!">
        <div className="text-3xl font-bold text-blue-900">
          ความชำนาญ
        </div>

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {specialties.slice(0, view ? specialties.length : 8).map((sst) => (
            <div key={sst.specialty_id}>
              <div
                className="rounded-xl p-3 h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer bg-linear-to-br from-blue-600/10 to-blue-600/5 border-2 border-blue-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="flex justify-center items-center rounded-full text-white font-bold mb-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1f2054",
                  }}
                >
                  { }
                </div>

                <div className="text-center">
                  <p className="mb-0 font-bold">{sst.specialty_name}</p>
                  <p className="mb-0">{ }</p>
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

        <div className="flex flex-wrap justify-center items-start gap-12!  max-w-7xl! mx-auto!">
          {[
            {
              num: "1",
              title: "การใช้ตัวกรอง",
              desc: "เลือกโรงพยาบาลเพื่อที่จะต้องนำทำการนัดหมาย",
              bgColor: "from-blue-600 to-blue-700",
              borderColor: "border-blue-600/30",
              cardBg: "bg-linear-to-br from-blue-600/10 to-blue-600/5",
              Video: "/myVideo.mp4",
            },
            {
              num: "2",
              title: "เลือกแพทย์",
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
              key={index}
              className="flex flex-col items-center text-center max-w-[280px] relative"
            >
              {/* Step Number Badge */}
              <div
                className={`w-[70px] h-[70px] bg-linear-to-br ${step.bgColor} rounded-full! flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10! -mb-9!`}
              >
                {step.num}
              </div>

              {/* Card */}
              <div
                className={`w-full h-[200px] ${step.cardBg} rounded-3xl! border-3 ${step.borderColor} shadow-xl! hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 flex items-center justify-center`}
              >
                <div className="text-6xl opacity-30 font-bold text-blue-800">
                  {step.num}
                </div>
              </div>

              {/* Text */}
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

      {/* Footer */}
      <div className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 py-16! px-5! relative">
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
