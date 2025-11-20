import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { red } from "@mui/material/colors";
import { useData } from "../../Context/DataContext";
import toast from "react-hot-toast";
const PatientInfo = ({ onChange } = {}) => {
  const [files, setFiles] = useState([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [symptom, setSymptom] = useState("");
  const { isLogin, usersInfo, currentUser } = useData();

  useEffect(() => {
    if (
      !isLogin ||
      !currentUser ||
      !usersInfo ||
      usersInfo.length === 0
    ) {
      toast.error("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      return;
    }

    const info = usersInfo.find((u) => u.user_id === currentUser.userId);
    if (!info) return;
    if (!firstName) setFirstName(info.first_name || "");
    if (!lastName) setLastName(info.last_name || "");
    if (!gender) setGender(info.gender || "");
    if (!phone) setPhone(info.phone || "");
    if (!email) setEmail(info.email || "");
    console.log(info);
  }, [isLogin, currentUser, usersInfo]);

  useEffect(() => {
    onChange?.({ lastName, firstName, phone, email, symptom, files });
  }, [lastName, firstName, phone, email, symptom, files]);

  const handleFileChange = (e) => {
    if (e.target.files.length + files.length > 5) {
      alert("คุณสามารถอัปโหลดไฟล์ได้สูงสุด 5 ไฟล์");
      return;
    }
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };
  const clearFiles = () => {
    setFiles([]);
  };
  return (
    <>
      <h4 className="mb-4 fw-semibold fs-3 text-center">ข้อมูลผู้ป่วย</h4>
      <div className="row">
        <div className="col-md-7">
          <div className="col">
            <div className="mb-3">
              <div className="row g-2">
                <div className="col-2">
                  <label className="form-label fw-ligh ">เพศ</label>
                  <select
                    name="gender"
                    id="gender"
                    className="form-control  shadow-sm"
                    value={gender ? gender : ""}
                  >
                    <option value="">เพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </div>
                <div className="col-5">
                  <label className="form-label fw-ligh ">ชื่อ</label>
                  <input
                    value={firstName ? firstName : ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="form-control  shadow-sm"
                    placeholder="กรอกชื่อ"
                  />
                </div>
                <div className="col-5">
                  <label className="form-label fw-ligh ">นามสกุล</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control  shadow-sm"
                    placeholder="กรอกนามสกุล"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-ligh ">เบอร์โทร</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-control  shadow-sm"
                placeholder="กรอกเบอร์โทรติดต่อ"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-ligh ">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control  shadow-sm"
              placeholder="กรอกอีเมล"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-ligh ">อาการเบื้องต้น</label>
            <textarea
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="form-control  shadow-sm"
              rows="4"
              placeholder="อธิบายอาการเบื้องต้น"
            ></textarea>
          </div>
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-start">
          <div
            className="card shadow p-4 text-center w-100"
            style={{ borderRadius: "20px", backgroundColor: "#f9fbff" }}
          >
            <h5 className="mb-3 fw-medium fs-4 text-center">
              แนบไฟล์ผู้ป่วย (ถ้ามี)
            </h5>

            <label
              htmlFor="fileUpload"
              className="d-flex flex-column justify-content-center align-items-center border border-2 border-primary rounded-4 p-4 shadow-sm"
              style={{
                cursor: "pointer",
                transition: "0.2s",
                backgroundColor: "#ffffff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f7ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffffff")
              }
            >
              <i className="bi bi-cloud-upload fs-1 text-primary mb-2"></i>
              <span className="fw-semibold text-secondary">
                คลิกเพื่อเลือกไฟล์
              </span>
              <small className="text-muted mt-1">(PDF, JPG, PNG)</small>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                className="d-none"
                accept=".pdf, .jpg, .jpeg, .png"
                multiple
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-danger mt-3"
                onClick={() => {
                  clearFiles();
                }}
              >
                ล้างไฟล์ที่เลือกทั้งหมด
              </button>
            </label>

            {files.length > 0 && (
              <div className="mt-3 text-start">
                <p className="text-success fw-semibold mb-2">อัปโหลดแล้ว:</p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="mb-1 d-flex align-items-center gap-2 align-middle"
                  >
                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-truncate d-block"
                    >
                      {file.name}
                    </a>
                    <div
                      className="bg-transparent border-0 mt-1"
                      style={{
                        fontSize: "12px",
                        cursor: "pointer",
                        color: red[500],
                      }}
                      onClick={() => {
                        setFiles((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <X />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientInfo;
