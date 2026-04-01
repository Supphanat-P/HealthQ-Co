import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = "http://localhost:3000/users/login";

const Login = () => {
  const { setCurrentUser, setToken, fetchAndSetData } = useData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("กรุณากรอกข้อมูล");
    }

    try {
      const res = await axios.post(apiUrl, { email, password });

      const token = res.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);

      setToken(token);
      setCurrentUser(decoded.id);

      await fetchAndSetData(decoded.id);

      toast.success("เข้าสู่ระบบสำเร็จ");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-[500px] h-fit mx-auto shadow-xl! mt-5! bg-white rounded-lg overflow-hidden">
      <AppointmentHeader label="เข้าสู่ระบบ" />

      <div className="w-[500px] h-40 flex flex-col justify-center items-center mt-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
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
          className="w-60 bg-linear-to-br from-blue-900 to-blue-800 text-white px-6 py-2 rounded-lg! shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-2"
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </button>
        <button
          className="w-60 bg-white text-blue-900 px-6! py-2 rounded-lg! shadow-sm! border border-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-3"
          onClick={() => navigate("/register")}
        >
          สมัครสมาชิก
        </button>
        <br />
      </div>
    </div>
  );
};

export default Login;
