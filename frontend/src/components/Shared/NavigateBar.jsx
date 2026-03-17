import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, LogIn, UserPlus, LogOut, Menu, X, LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";

const NavigateBar = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  let getRole = null;
  if (user) {
    getRole = JSON.parse(user).role;
    console.log(getRole);
  }

  const text = {
    home: lang === "TH" ? "หน้าหลัก" : "Home",
    doctorSearch: lang === "TH" ? "ค้นหาแพทย์" : "Find Doctor",
    login: lang === "TH" ? "เข้าสู่ระบบ" : "Login",
    register: lang === "TH" ? "สมัครสมาชิก" : "Register",
    profile: lang === "TH" ? "โปรไฟล์" : "Profile",
    logout: lang === "TH" ? "ออกจากระบบ" : "Logout",
    dashboard: lang === "TH" ? "แดชบอร์ด" : "Dashboard",
  };

  const navLinks = [
    { label: text.home, path: "/" },
    { label: text.doctorSearch, path: "/doctorsearch" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky-top">
      <div className="max-w-7xl mx-auto px-6!">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5! rounded-xl! shadow-md">
            </div>

            <span className="text-navy text-2xl font-bold tracking-wide">
              &nbsp;
              <Link to="/" className="no-deco text-navy">HealthQ</Link>
            </span>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-navy no-deco ms-5 hover:text-blue-200 font-medium transition-colors duration-200 hover:scale-105 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex ms-80! justify-end items-center! space-x-4!">
            {!token ? (
              <div className="flex items-center space-x-3!">
                <Link
                  to="/login"
                  className="flex items-center no-deco space-x-2! px-4! py-2! text-navy hover:bg-white/10 rounded-xl! transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />

                  <span>{text.login}</span>
                </Link>

                <Link
                  to="/register"
                  className="me-4 flex items-center no-deco space-x-2 px-4 py-2 text-navy hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  &nbsp;
                  <span>{text.register}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center no-deco space-x-2 px-4 py-2 text-navy hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  &nbsp;
                  <span className="font-medium">{text.profile}</span>
                </Link>

                <Link
                  to="/logout"
                  className="flex no-deco items-center me-3 space-x-2! px-4! py-2! text-navy hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  &nbsp;
                  <span className="font-medium">{text.logout}</span>
                </Link>
                {token && getRole === "admin" && (
                  <Link 
                    to="/admindashboard"
                    className="flex no-deco items-center me-3 space-x-2! px-4! py-2! text-navy hover:bg-blue-500/20 hover:text-red-200 rounded-xl! transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    &nbsp;
                  </Link>
                )}
              </div>
            )}

            {/* Language Switch */}
            <div className="flex border-2 border-blue-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setLang("TH")}
                className={`px-4 py-2 text-sm font-bold ${lang === "TH"
                  ? "bg-blue-900 text-white"
                  : "text-navy hover:bg-white/10"
                  }`}
              >
                TH
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`px-4 py-2 text-sm font-bold ${lang === "EN"
                  ? "bg-blue-900 text-white"
                  : "text-navy hover:bg-white/10"
                  }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigateBar;
