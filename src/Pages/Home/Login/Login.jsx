import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login, currentUser } = useData();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (currentUser) return navigate("/");

  const handleLogin = async () => {
    if (!identifier || !password) {
      toast.error("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    try {
      await login(identifier, password);
      toast.success("เข้าสู่ระบบสำเร็จ");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="w-[500px] h-fit mx-auto shadow-xl mt-5 bg-white rounded-lg overflow-hidden">
      <AppointmentHeader label="เข้าสู่ระบบ" />

      <div className="w-[500px] h-40 flex flex-col justify-center items-center mt-2">
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          name="identifier"
          id="identifier"
          className="w-1/2! mb-3 px-4! py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-1/2! px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          placeholder="รหัสผ่าน"
        />
      </div>

      <div className="mx-auto text-center mb-5! px-8!">
        <button
          className="w-full bg-linear-to-br from-blue-900 to-blue-800 text-white px-6 py-2 rounded-lg! shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-2"
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </button>
        <button
          className="w-full bg-white text-blue-900 px-6! py-2 rounded-lg! shadow-sm! border border-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-3"
          onClick={() => navigate("/register")}
        >
          สมัครสมาชิก
        </button>
        <a
          href="#"
          className="text-blue-800 hover:text-blue-900 hover:underline transition-all duration-200 mt-5 inline-block"
        >
          ลืมรหัสผ่าน
        </a>
      </div>
    </div>
  );
};

export default Login;