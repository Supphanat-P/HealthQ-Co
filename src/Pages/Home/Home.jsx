import React from 'react';
import { Search, Calendar, Phone } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section with Background */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "600px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "-100px",
          right: "-100px",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          bottom: "-150px",
          left: "-100px",
          filter: "blur(40px)",
        }} />

        <div
          className="m-auto d-flex justify-content-center align-items-center"
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: "600px",
            padding: "0 20px",
          }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center text-white text-center"
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "20px",
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              WE CARE ABOUT <br /> YOUR HEALTH
            </h1>

            <p
              style={{
                fontSize: "24px",
                marginTop: "20px",
                lineHeight: "1.5",
                maxWidth: "800px",
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              every day is a new opportunity for you to do <br /> something for
              your health.
            </p>

            <button
              style={{
                width: "275px",
                height: "70px",
                borderRadius: "50px",
                marginTop: "40px",
                background: "white",
                border: "none",
                color: "#667eea",
                fontSize: "24px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
              }}
            >
              นัดหมายแพทย์
            </button>
          </div>
        </div>
      </div>

      {/* Search and Quick Actions Section */}
      <div
        style={{
          background: "linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Search Bar */}
          <div className="d-flex justify-content-center mb-5">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "600px",
                height: "65px",
                backgroundColor: "#ffffff",
                borderRadius: "50px",
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 15px 50px rgba(102, 126, 234, 0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(102, 126, 234, 0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <button
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  width: "65px",
                  height: "65px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
              >
                <Search size={24} color="white" />
              </button>
              <input
                type="text"
                placeholder="ค้นหาโรงพยาบาล ชื่อแพทย์ ความชำนาญ"
                style={{
                  flex: 1,
                  height: "100%",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontSize: "16px",
                  color: "#1a1f57",
                  borderRadius: "50px",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
            {[
              { icon: Calendar, text: "จองคิวตรวจ", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { icon: Search, text: "ค้นหาแพทย์", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { icon: Phone, text: "ติดต่อเรา", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
            ].map((btn, index) => {
              const IconComponent = btn.icon;
              return (
                <button
                  key={index}
                  style={{
                    background: btn.gradient,
                    border: "none",
                    borderRadius: "20px",
                    padding: "20px 40px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    minWidth: "200px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  <IconComponent size={28} color="white" />
                  <span style={{ color: "white", fontSize: "20px", fontWeight: "600", margin: 0 }}>
                    {btn.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#1F2054",
              marginBottom: "20px",
            }}
          >
            วิธีการใช้งาน
          </h2>
          <p
            style={{
              fontSize: "24px",
              color: "#5a5a8f",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            เพียง 4 ขั้นตอนง่ายๆ คุณก็สามารถจองนัดหมายกับแพทย์ได้ทันที
          </p>
        </div>

        <div
          className="d-flex flex-wrap justify-content-center align-items-start gap-5"
          style={{ maxWidth: "1400px", margin: "0 auto" }}
        >
          {[
            { num: "01", title: "เลือกโรงพยาบาล", desc: "เลือกโรงพยาบาลที่ต้องการจากรายชื่อของเรา", color: "#667eea" },
            { num: "02", title: "เลือกแพทย์", desc: "เลือกแพทย์ที่ต้องการจากรายชื่อแพทย์ผู้เชี่ยวชาญของเรา", color: "#f093fb" },
            { num: "03", title: "เลือกวันและเวลา", desc: "เลือกวันที่และเวลาที่สะดวกสำหรับคุณจากตารางที่ว่าง", color: "#4facfe" },
            { num: "04", title: "ยืนยันนัดหมาย", desc: "ยืนยันการนัดหมายและรับการแจ้งเตือนก่อนถึงเวลานัด", color: "#f5576c" },
          ].map((step, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center text-center"
              style={{ maxWidth: "280px", position: "relative" }}
            >
              {/* Step Number Badge */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "24px",
                  boxShadow: `0 8px 25px ${step.color}50`,
                  position: "relative",
                  zIndex: 2,
                  marginBottom: "-35px",
                }}
              >
                {step.num}
              </div>

              {/* Card */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 100%)`,
                  borderRadius: "25px",
                  border: `3px solid ${step.color}30`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = `0 15px 40px ${step.color}30`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "60px",
                    opacity: 0.3,
                    fontWeight: "700",
                    color: step.color,
                  }}
                >
                  {step.num}
                </div>
              </div>

              {/* Text */}
              <div style={{ marginTop: "25px" }}>
                <h5 style={{ color: "#1F2054", fontWeight: "700", fontSize: "20px", marginBottom: "10px" }}>
                  {step.title}
                </h5>
                <p
                  style={{
                    color: "#5a5a8f",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "60px 20px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Health Queue
          </h2>

          <div
            className="d-flex flex-wrap justify-content-center align-items-center gap-5"
            style={{ marginBottom: "40px" }}
          >
            {["About Us", "Services", "Help & Support", "Social Media"].map((item, index) => (
              <button
                key={index}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "10px 20px",
                  transition: "all 0.3s ease",
                  borderBottom: "2px solid transparent",
                }}
                onMouseOver={(e) => {
                  e.target.style.borderBottom = "2px solid white";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderBottom = "2px solid transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255, 255, 255, 0.3)",
              margin: "30px 0",
            }}
          />

          <div
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            © 2025 Health Queue
          </div>
        </div>
      </div>
    </>
  );
}