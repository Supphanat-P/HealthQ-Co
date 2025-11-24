import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login } = useData();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <>
      <Toaster />
      <div className="card h-fit w-fit m-auto shadow mt-5">
        <AppointmentHeader label="เข้าสู่ระบบ" />
        <div
          className="m-auto d-flex justify-content-center align-items-center flex-column mt-2 "
          style={{ width: "500px", height: "160px" }}
        >
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            type="text"
            name="identifier"
            id="identifier"
            className="form-control doctor-filter-input w-50 mb-3"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control doctor-filter-input w-50"
            placeholder="รหัสผ่าน"
          />
        </div>

        <div className="m-auto align-content-center text-center mb-5">
          <button
            className="btn bg-navy m-auto mb-2 d-flex justify-content-center align-items-center shadow"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            <p className="text-white mb-0"> เข้าสู่ระบบ </p>
          </button>
          <button
            className="btn bg-white m-auto mb-3 d-flex justify-content-center align-items-center shadow"
            onClick={() => navigate("/register")} 
          >
            <p className="text-navy mb-0">สมัครสมาชิก</p>
          </button>
          <a className="m-auto mt-5" href="">
            ลืมรหัสผ่าน
          </a>
        </div>
      </div>
    </>
  );
};
export default Login;
