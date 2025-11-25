import AppointmentHeader from "../../../components/Shared/AppointmentHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";
import React from "react";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useData();
  if (currentUser) return navigate("/");
  const { sendOtpForRegistration, createUserAccount } = useData();

  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState("input");
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");



  const sendOtp = async () => {
    if (!identifier) {
      toast.error("กรุณากรอกอีเมล");
      return;
    }
    try {
      setIsSending(true);
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(randomOtp);
      console.log("Sending OTP:", randomOtp);
      await sendOtpForRegistration(identifier, randomOtp);
      setStep("otp");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const otpVerify = () => {
    if (!userOtp) {
      toast.error("กรุณากรอกรหัส OTP");
      return;
    }
    if (userOtp === otp) {
      toast.success("ยืนยันรหัส OTP สำเร็จ");
      setStep("password");
    } else {
      toast.error("รหัส OTP ไม่ถูกต้อง");
    }
  };

  const confirmRegistration = async () => {
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      await createUserAccount(identifier, password, fName, lName);
      toast.success("ตั้งรหัสผ่านสำเร็จ");
      setStep("done");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="card h-fit w-fit m-auto shadow mt-5">
        <AppointmentHeader label="สมัครสมาชิก" />
        <div className="m-auto d-flex justify-content-center align-items-center flex-column mt-2" style={{ width: "500px", minHeight: 160 }}>

          {step === "input" && (
            <>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="form-control doctor-filter-input w-50 mb-4"
                placeholder="ใส่อีเมลเพื่อรับรหัส OTP"
              />
              <button className="btn text-white bg-navy w-fit mb-2 shadow" onClick={sendOtp} disabled={isSending}>
                {isSending ? "กำลังส่ง..." : "ขอรหัส OTP"}
              </button>
              <button className="btn bg-white mb-4 shadow mt-3" onClick={() => navigate("/login")}>
                เข้าสู่ระบบ
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="text-center text-muted">ส่งรหัส OTP ไปยัง {identifier}</p>
              <OtpInput
                value={userOtp}
                onChange={setUserOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                className="otp-input"
              />
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="btn bg-navy shadow text-white" onClick={otpVerify}>ยืนยัน</button>
                <button className="btn btn-outline-secondary" onClick={() => { setStep("input"); setOtp(""); }}>แก้ไขอีเมล</button>
              </div>
              <button className="btn btn-link mt-2" onClick={sendOtp}>ส่งใหม่</button>
              <small className="text-muted d-block text-center mt-2">* รหัสใช้งานได้ภายใน 5 นาที</small>
            </>
          )}

          {step === "password" && (
            <>
              <div className="flex gap-2 justify-center">
                <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="form-control w-30! mb-3" placeholder="ชื่อ" />
                <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="form-control w-30! mb-3" placeholder="นามสกุล" />
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control w-50 mb-3" placeholder="ตั้งรหัสผ่าน" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control w-50 mb-3" placeholder="ยืนยันรหัสผ่าน" />
              <button className="btn text-white bg-navy shadow mb-3" onClick={confirmRegistration}>ยืนยัน</button>
            </>
          )}

          {step === "done" && (
            <div className="text-center">
              <p className="fw-bold">สมัครสมาชิกสำเร็จ</p>
              <p className="text-muted">กำลังพาไปหน้าล็อกอิน...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
