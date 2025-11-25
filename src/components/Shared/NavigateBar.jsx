import { useState } from "react";
import { Search, User, LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";

const NavigateBar = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const text = {
    home: lang === "TH" ? "หน้าหลัก" : "Home",
    doctorSearch: lang === "TH" ? "ค้นหาแพทย์" : "Find Doctor",
    login: lang === "TH" ? "เข้าสู่ระบบ" : "Login",
    register: lang === "TH" ? "สมัครสมาชิก" : "Register",
    profile: lang === "TH" ? "โปรไฟล์" : "Profile",
    logout: lang === "TH" ? "ออกจากระบบ" : "Logout",
  };

  const navLinks = [
    { label: text.home, path: "/" },
    { label: text.doctorSearch, path: "/doctorsearch" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-xl shadow-md">
              <img
                src="/Hospital-Logo/Pond.jpg"
                alt="Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
            <span className="text-navy text-2xl font-bold tracking-wide">
              &nbsp; <a href="/" className="no-deco text-navy">HealthQ</a>
            </span>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-navy no-deco ms-5 hover:text-blue-200 font-medium transition-colors duration-200 hover:scale-105 transform"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {!token ? (
              <div className="flex items-center space-x-3">
                <a
                  href="/login"
                  className="flex items-center no-deco space-x-2 px-4 py-2 text-navy hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="ms-2">{text.login}</span>
                </a>

                <a
                  href="/register"
                  className="me-4 flex items-center no-deco space-x-2 px-4 py-2 text-navy hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="ms-2">{text.register}</span>
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="/profile"
                  className="flex no-deco items-center space-x-2 px-4 py-2 text-navy hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  &nbsp;
                  <span className="font-medium">{text.profile}</span>
                </a>

                <a
                  href="/logout"
                  className="flex no-deco items-center me-3 space-x-2 px-4 py-2 text-navy hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  &nbsp;
                  <span className="font-medium">{text.logout}</span>
                </a>
              </div>
            )}

            <div className="flex border-2 border-blue-900 rounded-xl! overflow-hidden bg-white/5">
              <button
                onClick={() => setLang("TH")}
                className={`px-4 py-2 text-sm font-bold transition-all duration-200 ${lang === "TH"
                  ? "bg-blue-900 text-white shadow-md"
                  : "text-navy hover:bg-white/10"
                  }`}
              >
                TH
              </button>
              <div className="w-px bg-white/30"></div>
              <button
                onClick={() => setLang("EN")}
                className={`px-4 py-2 text-sm font-bold transition-all duration-200 ${lang === "EN"
                  ? "bg-blue-900 text-white shadow-md"
                  : "text-navy hover:bg-white/10"
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-navy p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-2 space-y-3 border-t border-white/10 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="block text-navy hover:bg-white/10 px-4 py-3 rounded-xl font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-3">
              {!token ? (
                <>
                  <a
                    href="/login"
                    className="flex items-center space-x-2 text-navy hover:bg-white/10 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    &nbsp;
                    <span>{text.login}</span>
                  </a>

                  <a
                    href="/register"
                    className="flex items-center space-x-2 bg-white text-blue-900 hover:bg-blue-50 px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    &nbsp;
                    <span>{text.register}</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/profile"
                    className="flex items-center space-x-2 text-navy hover:bg-white/10 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{text.profile}</span>
                  </a>

                  <a
                    href="/logout"
                    className="flex items-center space-x-2 text-navy hover:bg-red-500/20 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{text.logout}</span>
                  </a>
                </>
              )}

              {/* Language Switch Mobile */}
              <div className="flex border-2 border-blue-400 rounded-xl! overflow-hidden bg-white/5">
                <button
                  onClick={() => setLang("TH")}
                  className={`flex-1 py-3 text-sm font-bold transition-all ${lang === "TH"
                    ? "bg-white text-blue-900"
                    : "text-navy hover:bg-white/10"
                    }`}
                >
                  TH
                </button>
                <div className="w-px bg-white/30"></div>
                <button
                  onClick={() => setLang("EN")}
                  className={`flex-1 py-3 text-sm font-bold transition-all ${lang === "EN"
                    ? "bg-blue-900 text-white"
                    : "text-navy hover:bg-white/10"
                    }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigateBar;
