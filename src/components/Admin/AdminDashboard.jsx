import AdminSidebar from "./AdminSidebar";
import { Users, Calendar, CheckCircle, Hourglass } from "lucide-react";
const AdminDashboard = () => {
  const cards = [
    {
      title: "นัดหมายวันนี้",
      value: "24 นัดหมาย",
      icon: <Calendar className="text-[#001F54] w-6 h-6" />,
    },
    {
      title: "ผู้ป่วยทั้งหมด",
      value: "1,000 คน",
      icon: <Users className="text-[#001F54] w-6 h-6  " />,
    },
    {
      title: "รอการยืนยัน",
      value: "8 นัดหมาย",
      icon: <Hourglass className="text-[#001F54] w-6 h-6  " />,
    },
    {
      title: "ยืนยันแล้ว",
      value: "16 นัดหมาย",
      icon: <CheckCircle className="text-[#001F54] w-6 h-6  " />,
    },
  ];
  return (

    <div className="flex flex-row ">
      <div>
        <AdminSidebar />
      </div>
      <div className=" flex-column mx-auto">
        <h3 className="text-gray-900 m-3 text-xl font-semibold">แดชบอร์ด</h3>
        <p className="text-gray-500 m-3">ภาพรวมการจัดการนัดหมายและผู้ป่วย</p>


        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="shadow-sm bg-white rounded-xl border border-[#001F54] w-[200px] h-[120px] p-4 flex justify-between items-start"
            >

              <div className="flex flex-col">
                <p className="text-[#001F54] text-sm font-semibold">
                  {card.title}
                </p>
                <p className="text-gray-900 text-xl font-bold mt-2">
                  {card.value}
                </p>
              </div>


              <div className="flex items-start">
                {card.icon}
              </div>
            </div>
          ))}
        </div>



        <div className="flex justify-center mt-4">
          <div className="mt-4 p-3 border bg-white border-[#001F54] rounded-lg bg-light">
            <h3 className="text-navy text-lg  mb-3">นัดหมายวันนี้</h3>


            <div className="flex items-center shadow-sm px-3 rounded-lg border border-[#001F54] w-[840px] h-[120px]">
              <img
                src="/phdoctor.jpg"
                alt="doctor"
                className="w-[70px] h-[70px] rounded-full object-cover mr-4"
              />
              <div className="flex justify-between items-center w-full ms-3">
                <div className="flex flex-col justify-center">
                  <span className="text-navy font-semibold">
                    นาย สมชาย ใจดี
                  </span>
                  <p className="text-gray-900 mt-2 text-sm mb-0">
                    นพ. หงสาวดี แซ่ลี่
                  </p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded">
                  ยืนยันแล้ว
                </span>
              </div>
            </div>


            <div className="flex items-center shadow-sm px-3 rounded-lg border border-[#001F54] w-[840px] h-[120px] mt-3">
              <img
                src="/phdoctor.jpg"
                alt="doctor"
                className="w-[70px] h-[70px] rounded-full object-cover mr-4"
              />
              <div className="flex justify-between items-center w-full ms-3">
                <div className="flex flex-col justify-center">
                  <span className="text-navy font-semibold">
                    นาย สมชาย ใจดี
                  </span>
                  <p className="text-gray-900 mt-2 text-sm mb-0">
                    นพ. หงสาวดี แซ่ลี่
                  </p>
                </div>
                <span className="bg-yellow-600 text-white px-3 py-1 rounded">
                  รอการอนุมัติ
                </span>
              </div>
            </div>


            <div className="flex items-center shadow-sm px-3 rounded-lg border border-[#001F54] w-[840px] h-[120px] mt-3">
              <img
                src="/phdoctor.jpg"
                alt="doctor"
                className="w-[70px] h-[70px] rounded-full object-cover mr-4"
              />
              <div className="flex justify-between items-center w-full ms-3">
                <div className="flex flex-col justify-center">
                  <span className="text-navy font-semibold">
                    นาย สมชาย ใจดี
                  </span>
                  <p className="text-gray-900 mt-2 text-sm mb-0">
                    นพ. หงสาวดี แซ่ลี่
                  </p>
                </div>
                <span className="bg-red-500 text-white px-3 py-1 rounded">
                  ยกเลิก
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
