import AdminSidebar from "./AdminSidebar";
import { Users, Calendar, CheckCircle, Hourglass, XCircle, Clock } from "lucide-react";
import { useData } from "../../Context/DataContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser, appointments } = useData();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "admin") return <Navigate to="/login" replace />;

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const week = new Date();
  week.setDate(week.getDate() - 7);
  week.setHours(0, 0, 0, 0);

  const appointmentsWeek = appointments.filter(a => a.status === "pending").filter(app => {
    const created = new Date(app.created_at);
    return created >= week && created <= today;
  });



  const pendingCount = appointments.filter(a => a.status === "pending").length;
  const bookedCount = appointments.filter(a => a.status === "booked").length;
  const cancelledCount = appointments.filter(a => a.status === "cancelled").length;

  const uniquePatients = new Set(appointments.map(a => a.user_id)).size;

  const cards = [
    {
      title: "นัดหมายทั้งหมด",
      value: `${appointments.length} นัดหมาย`,
      icon: <Calendar className="text-[#001F54] w-6 h-6" />,
    },
    {
      title: "รอการยืนยัน",
      value: `${pendingCount} นัดหมาย`,
      icon: <Hourglass className="text-[#001F54] w-6 h-6" />,
    },
    {
      title: "อนุมัติแล้ว",
      value: `${bookedCount} นัดหมาย`,
      icon: <CheckCircle className="text-[#001F54] w-6 h-6" />,
    },
    {
      title: "ผู้ป่วยทั้งหมด",
      value: `${uniquePatients} คน`,
      icon: <Users className="text-[#001F54] w-6 h-6" />,
    },
  ];

  return (
    <div className="flex flex-row">
      <div>
        <AdminSidebar />
      </div>

      <div className="flex-1 p-8 bg-linear-to-br m-3 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">แดชบอร์ด</h3>
            <p className="text-gray-600">ภาพรวมการจัดการนัดหมายและผู้ป่วย</p>
          </div>

          <div className="grid grid-cols-1! md:grid-cols-2! lg:grid-cols-4! gap-6! mb-8!">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6! hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3! bg-blue-50 rounded-xl">
                    {card.icon}
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
                <p className="text-gray-900 text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6!">
            <h3 className="text-xl font-bold text-gray-900 mb-6">นัดหมายที่รอการอนุมติ</h3>

            {appointmentsWeek.length === 0 && (
              <div className="text-center py-12!">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">ไม่มีนัดหมายที่รอการอนุมติ</p>
              </div>
            )}

            <div className="space-y-4!">
              {appointmentsWeek.map((app) => (
                <div
                  key={app.app_id}
                  className="flex items-center bg-linear-to-r from-white to-blue-50 rounded-xl! border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4"
                >
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {app.user.full_name.charAt(0)}
                  </div>

                  <div className="flex justify-between items-center w-full ml-4!">
                    <div className="flex flex-col justify-center">
                      <span className="text-gray-900 font-semibold text-lg">
                        ผู้ใช้: {app.user.full_name}
                      </span>
                      <p className="text-gray-600 text-sm mt-1">
                        หมอ: {app.doctor.doctor_name}
                      </p>
                    </div>

                    {app.status === "pending" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-md whitespace-nowrap">
                        <Clock size={18} />
                        รออนุมัติ
                      </span>
                    )}

                    {app.status === "approved" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-linear-to-r from-green-500 to-green-600 text-white shadow-md whitespace-nowrap">
                        <CheckCircle size={18} />
                        อนุมัติแล้ว
                      </span>
                    )}

                    {app.status === "cancelled" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-linear-to-r from-red-500 to-red-600 text-white shadow-md whitespace-nowrap">
                        <XCircle size={18} />
                        ยกเลิก
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
