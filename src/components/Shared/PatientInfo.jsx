import React, { useState } from "react";
import { X } from "lucide-react";
import { red } from "@mui/material/colors";

const PatientInfo = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length + files.length > 5) {
      alert("คุณสามารถอัปโหลดไฟล์ได้สูงสุด 5 ไฟล์");
      return;
    }
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const clearFiles = () => {
    setFiles([]);
  };
  return (
    <>
      <h4 className="mb-4 fw-semibold fs-3 text-center">ข้อมูลผู้ป่วย</h4>
      <div className="row">
        <div className="col-md-7">
          <div className="mb-3">
            <label className="form-label fw-ligh ">ชื่อ-นามสกุล</label>
            <input
              type="text"
              className="form-control  shadow-sm"
              placeholder="กรอกชื่อ-นามสกุล"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-ligh ">เบอร์โทร</label>
            <input
              type="text"
              className="form-control  shadow-sm"
              placeholder="กรอกเบอร์โทรติดต่อ"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-ligh ">E-mail</label>
            <input
              type="email"
              className="form-control  shadow-sm"
              placeholder="กรอกอีเมล"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-ligh ">อาการเบื้องต้น</label>
            <textarea
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
