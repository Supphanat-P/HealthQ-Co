import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import React from "react";

const apiUrl = 'http://localhost:3000/users/register';

const Register = () => {
  const navigate = useNavigate();

  // Check for existing token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState("input");
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  // OTP
  const sendOtp = async () => {
    setIsSending(true); 
    console.log(otp);   
    
    setStep("otp");
    setIsSending(false);
  };

  const otpVerify = () => {
    setStep("password"); 
  };

  // fetch ยิงไปหา userRouter 
  const confirmRegistration = async () => {
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      // ยิง POST Request ไปหา backend เพื่อสร้าง user ใหม่
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: identifier,
          password: password,
          role_id: 2 // บังคับใส่ role_id ไปก่อนเพราะ Backend ต้องการ
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "สมัครสมาชิกไม่สำเร็จ");
      }

      toast.success("สมัครสมาชิกสำเร็จแล้ว");
      setStep("done");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="w-[500px] h-fit mx-auto shadow-xl mt-5! bg-white rounded-lg! overflow-hidden">
      <AppointmentHeader label="สมัครสมาชิก" />

      <div className="mx-auto text-center mb-5! mt-9! px-8!">
        {step === "input" && (
          <>
            <input
              type="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-1/2! mb-4! px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="ใส่อีเมลเพื่อรับรหัส OTP"
            />
            <br />
            <button
              className="w-60 bg-linear-to-br from-blue-900 to-blue-800 text-white px-6! py-2! rounded-lg! shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-2!"
              onClick={sendOtp}
              disabled={isSending}
            >
              {isSending ? "กำลังส่ง..." : "ขอรหัส OTP"}
            </button>
            <br />
            <button
              className="w-60 mb-4! px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              onClick={() => navigate("/login")}
            >
              เข้าสู่ระบบ
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-center! text-gray-600 mb-4!">ส่งรหัส OTP ไปยัง {identifier}</p>
            <div className="mb-4! justify-center flex">
              <OtpInput
                value={userOtp}
                onChange={setUserOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1 text-gray-400">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-10! h-12 text-center text-xl! justify-center align-middle border-2! border-gray-300 rounded-lg! focus:border-blue-900 focus:outline-none mx-1"
                  />
                )}
              />
            </div>
            <div className="flex gap-2 justify-center mt-3">
              <button
                className="bg-linear-to-br from-blue-900 to-blue-800 text-white px-6! py-2 rounded-lg! shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={otpVerify}
              >
                ยืนยัน
              </button>
              <button
                className="bg-white text-gray-700 px-6! py-2 rounded-lg! border border-gray-300 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => { setStep("input"); setOtp(""); }}
              >
                แก้ไขอีเมล
              </button>
            </div>
            <button
              className="text-blue-800 hover:text-blue-900 hover:underline mt-2 transition-all duration-200"
              onClick={sendOtp}
            >
              ส่งใหม่
            </button>
            <small className="text-gray-500 text-center mt-2 block">* รหัสใช้งานได้ภายใน 5 นาที</small>
          </>
        )}

        {step === "password" && (
          <>
            <div className="flex gap-2! justify-center mb-3! w-full px-8!">
              <input
                type="text"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                className="flex-1 px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="ชื่อ"
              />
              <input
                type="text"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                className="flex-1 px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="นามสกุล"
              />
            </div>
            <div className="flex gap-2! justify-center mb-3! w-full px-8!">

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="ตั้งรหัสผ่าน"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 px-4! py-2! border border-gray-300 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>
            <button
              className="bg-linear-to-br from-blue-900 to-blue-800 text-white px-8! py-2! rounded-lg! shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-3"
              onClick={confirmRegistration}
            >
              ยืนยัน
            </button>
          </>
        )}

        {step === "done" && (
          <div className="text-center py-4">
            <p className="font-bold text-xl text-blue-900 mb-2">สมัครสมาชิกสำเร็จ</p>
            <p className="text-gray-600">กำลังพาไปหน้าล็อกอิน...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;