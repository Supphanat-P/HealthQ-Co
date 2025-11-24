import { LayoutDashboard, Calendar, Users, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const navItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "แดชบอร์ด",
      path: "/admindashboard",
    },
    {
      id: "appointments",
      icon: Calendar,
      label: "จัดการนัดหมาย",
      path: "/adminappointments",
    },
    {
      id: "patients",
      icon: Users,
      label: "จัดการผู้ป่วย",
      path: "/adminpatients",
    },
  ];

  return (
    <div className="bg-white h-screen w-72 p-4 flex flex-col shadow-xl border border-gray-100">
      <div className="mb-8 pb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-linear-to-br from-blue-900 to-blue-950 p-3 rounded-2xl shadow-lg">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
        </div>
        <h3 className="text-blue-950 text-center text-xl font-semibold tracking-wide">
          HealthQ <br /> Admin Panel
        </h3>
      </div>

      <hr className="border-gray-200 mb-4" />

      <nav className="flex">
        <ul className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center mt-2 no-deco p-4 rounded-2xl transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-linear-to-r from-blue-900 to-blue-950 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`p-2.5 rounded-xl mr-4 transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 shadow-md"
                            : "bg-gray-100 hover:bg-blue-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-white" : "text-blue-900"
                          }`}
                        />
                      </div>
                      &nbsp;
                      <span
                        className={`font-medium text-navy ${
                          isActive ? "text-white font-semibold" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-4 mt-2 border-t border-gray-200">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-100">
          <p className="text-xs text-gray-600 text-center">
            Healthcare Management v2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
