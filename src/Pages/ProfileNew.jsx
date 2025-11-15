import { useState } from "react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";

const ProfileNew = () => {
  const [selectedTab, setSelectedTab] = useState("1");

  return (
    <>
      <AppointmentHeader label={"ข้อมูลผู้ใช้"} />

      <div
        className="bg-white text-navy rounded-4 p-5 mx-auto shadow-lg"
        style={{ width: "70%" }}
      >
        {/* Header Profile */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "#D9D9D9",
              borderRadius: "50%",
            }}
          ></div>

          <div className="ms-3">
            <div className="fs-3 fw-bold">นายธีรดน คนธรรมดา</div>
            <div className="text-gray">Theeradon.kontamada@gmail.com</div>
          </div>
        </div>

        <div className="d-flex gap-4 border-bottom pb-2 mb-4">
          <div
            onClick={() => setSelectedTab("1")} 
            style={{
              cursor: "pointer",
              borderBottom: selectedTab === "1" ? "3px solid #1f2054" : "",
              color: selectedTab === "1" ? "#1f2054" : "black",
            }}
          >
            ข้อมูลส่วนตัว
          </div>

          <div
            onClick={() => setSelectedTab("2")}
            style={{
              cursor: "pointer",
              borderBottom: selectedTab === "2" ? "3px solid #1f2054" : "",
              color: selectedTab === "2" ? "#1f2054" : "black",
            }}
          >
            ประวัติสุขภาพ
          </div>

          <div
            onClick={() => setSelectedTab("3")}
            style={{
              cursor: "pointer",
              borderBottom: selectedTab === "3" ? "3px solid #1f2054" : "",
              color: selectedTab === "3" ? "#1f2054" : "black",
            }}
          >
            ข้อมูลติดต่อ
          </div>
        </div>

        {selectedTab === "1" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">ชื่อ - นามสกุล</div>
              <div className="text-navy mb-4">นาย ธีรดน คนธรรมดา</div>

              <div className="text-black">เพศ</div>
              <div className="text-navy mb-4">ชาย</div>

              <div className="text-black">วันเกิด</div>
              <div className="text-navy mb-4">05-01-2549</div>

              <div className="text-black">สัญชาติ</div>
              <div className="text-navy">ไทย</div>
            </div>

            <div className="col-6">
              <div className="text-black">เลขประจำตัวประชาชน</div>
              <div className="text-navy mb-4">1234567890123</div>

              <div className="text-black">หมู่เลือด</div>
              <div className="text-navy mb-4">O</div>

              <div className="text-black">ส่วนสูง</div>
              <div className="text-navy mb-4">170</div>

              <div className="text-black">น้ำหนัก</div>
              <div className="text-navy">52</div>
            </div>
          </div>
        )}

        {selectedTab === "2" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">โรคประจำตัว</div>
              <div className="text-navy mb-4">ไม่มี</div>

              <div className="text-black">ยาประจำตัว</div>
              <div className="text-navy mb-4">ไม่มี</div>
            </div>

            <div className="col-6">
              <div className="text-black">ประวัติแพ้ยา</div>
              <div className="text-navy mb-4">ไม่มี</div>

              <div className="text-black">ประวัติแพ้อาหาร</div>
              <div className="text-navy mb-4">ไม่มี</div>
            </div>
          </div>
        )}

        {selectedTab === "3" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">เบอร์โทรศัพท์</div>
              <div className="text-navy mb-4">ไม่มี</div>

              <div className="text-black">อีเมล</div>
              <div className="text-navy mb-4">ไม่มี</div>
            </div>

            <div className="col-6">
              <div className="text-black">เบอร์ติดต่อฉุกเฉิน</div>
              <div className="text-navy mb-4">ไม่มี</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileNew;
