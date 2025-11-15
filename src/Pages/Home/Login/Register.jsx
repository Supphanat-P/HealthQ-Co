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
  const { usersCredentials } = useData();
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState("input");
  const [isSending, setIsSending] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const sendOtp = async () => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    const isPhone = /^\d{10}$/.test(identifier);
    if (!isEmail && !isPhone) {
      toast.error("กรุณาใส่อีเมลหรือเบอร์โทรศัพท์ที่ถูกต้อง");
      return;
    }

    const existingUserByEmail = usersCredentials.find(
      (user) => user.email === identifier
    );

    const existingUserByPhone = usersCredentials.find(
      (user) => user.phone === identifier
    );

    if (existingUserByEmail) {
      toast.error("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้เมลอื่น");
      return;
    }

    if (existingUserByPhone) {
      toast.error("เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว กรุณาใช้เบอร์อื่น");
      return;
    }

    if (!identifier || (!isEmail && !isPhone)) {
      toast.error("กรุณาใส่อีเมลหรือเบอร์โทรศัพท์ที่ถูกต้อง");
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 800));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setIsSending(false);
    setStep("otp");
    setAttempts(0);
    toast.success(`ส่งรหัส OTP ไปยัง ${identifier}`);
    console.log("[Register] generated OTP:", otp);
  };

  const verifyOtp = async () => {
    const code = otp;
    if (!code || code.length !== 6) {
      toast.error("กรุณาใส่รหัส OTP 6 หลัก");
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSending(false);
    setAttempts((a) => a + 1);
    if (code === generatedOtp) {
      toast.success("ยืนยันสำเร็จ! สามารถเข้าสู่ระบบได้");
      setStep("done");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error("รหัส OTP ไม่ถูกต้อง");
      if (attempts + 1 >= 3) {
        toast.error("ลองส่งรหัสใหม่อีกครั้ง");
        setStep("input");
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="card h-fit w-fit m-auto shadow mt-5">
        <AppointmentHeader label="สมัครสมาชิก" />
        <div
          className="m-auto d-flex justify-content-center align-items-center flex-column mt-2"
          style={{ width: "500px", minHeight: 160 }}
        >
          {step === "input" && (
            <>
              <input
                type="email"
                name="identifier"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="form-control doctor-filter-input w-50 mb-4"
                placeholder="ใส่อีเมลเพื่อรับรหัส OTP"
              />
              <button
                className="btn bg-navy w-fit mb-2 d-flex justify-content-center align-items-center shadow"
                onClick={sendOtp}
                disabled={isSending}
              >
                <p className="text-white mb-0">
                  {isSending ? "กำลังส่ง..." : "ขอรหัส OTP"}
                </p>
              </button>
              <div className="mb-5">
                <button
                  className="btn bg-white m-auto mb-3 d-flex justify-content-center align-items-center shadow"
                  onClick={() => navigate("/login")}
                >
                  <p className="text-navy mb-0">เข้าสู่ระบบ</p>
                </button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="text-center text-muted">
                ส่งรหัส OTP ไปยัง {identifier}
              </p>
              <div className="d-flex otp-input justify-content-center gap-2 mb-3">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="d-flex gap-2 justify-content-center mb-2">
                <button
                  className="btn bg-navy d-flex justify-content-center align-items-center shadow"
                  style={{ width: 120 }}
                  onClick={verifyOtp}
                  disabled={isSending}
                >
                  <p className="text-white mb-0">ยืนยัน</p>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setStep("input");
                    setOtp("");
                  }}
                >
                  แก้ไขอีเมล
                </button>
                <br />
              </div>
              <button
                className="btn btn-link"
                onClick={() => {
                  setOtp("");
                  sendOtp();
                }}
                disabled={isSending}
              >
                ส่งใหม่
              </button>
              <small className="text-muted d-block text-center mb-5">
                * รหัสใช้งานได้ภายใน 5 นาที
              </small>
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
