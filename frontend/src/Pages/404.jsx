import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh", padding: "3rem" }}
    >
      <div
        className="text-center rounded shadow p-4"
        style={{ maxWidth: 900, width: "100%", background: "var(--softgray)" }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: "var(--primary)" }}>404</div>
        <h2 style={{ marginTop: 8, marginBottom: 8 }}>หน้าไม่พบ (Page not found)</h2>
        <p className="text-muted" style={{ maxWidth: 680, margin: "0.5rem auto 1.5rem" }}>
          ขอโทษด้วย! หน้าเว็บที่คุณกำลังมองหาไม่มีอยู่หรือถูกย้ายไปแล้ว.
          ลองกลับไปที่หน้าหลักหรือลองค้นหาแพทย์แทน.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Button as={Link} to="/" variant="light" className="border-0">
            กลับหน้าหลัก
          </Button>
          <Button as={Link} to="/doctorSearch" variant="primary">
            ค้นหาแพทย์
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
