import { useState } from "react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";

const ProfileNew = () => {
  const [selectedTab, setSelectedTab] = useState("1");

  // โหมดแก้ไข
  const [isEdit, setIsEdit] = useState(false);

  // state สำหรับเก็บข้อมูล
  const [form, setForm] = useState({
    fullname: "นาย ธีรดน คนธรรมดา",
    gender: "ชาย",
    birthdate: "05-01-2549",
    nationality: "ไทย",
    citizenId: "1234567890123",
    blood: "O",
    height: "170",
    weight: "52",
    phone: "",
    email: "",
    emergency: "",
    disease: "ไม่มี",
    allergyDrug: "ไม่มี",
    allergyFood: "ไม่มี",
    medicine: "ไม่มี",
  });

  // ฟังก์ชันรับค่าจาก input
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

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
            <div className="fs-3 fw-bold">{form.fullname}</div>
            <div className="text-gray">{form.email || "ไม่มีอีเมล"}</div>
          </div>

          {/* ปุ่มแก้ไข */}
          <div className="ms-auto">
            {!isEdit ? (
              <button
                className="btn btn-primary"
                onClick={() => setIsEdit(true)}
              >
                แก้ไข
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => setIsEdit(false)}
              >
                บันทึก
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex gap-4 border-bottom pb-2 mb-4">
          {["1", "2", "3"].map((tab) => (
            <div
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                cursor: "pointer",
                borderBottom:
                  selectedTab === tab ? "3px solid #1f2054" : "",
                color: selectedTab === tab ? "#1f2054" : "black",
              }}
            >
              {tab === "1"
                ? "ข้อมูลส่วนตัว"
                : tab === "2"
                ? "ประวัติสุขภาพ"
                : "ข้อมูลติดต่อ"}
            </div>
          ))}
        </div>

        {/* เนื้อหา TAB 1 */}
        {selectedTab === "1" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">ชื่อ - นามสกุล</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.fullname}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.fullname}
                  onChange={(e) => handleChange("fullname", e.target.value)}
                />
              )}

              <div className="text-black">เพศ</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.gender}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
              )}

              <div className="text-black">วันเกิด</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.birthdate}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.birthdate}
                  onChange={(e) => handleChange("birthdate", e.target.value)}
                />
              )}

              <div className="text-black">สัญชาติ</div>
              {!isEdit ? (
                <div className="text-navy">{form.nationality}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
              )}
            </div>

            <div className="col-6">
              <div className="text-black">เลขประจำตัวประชาชน</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.citizenId}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.citizenId}
                  onChange={(e) => handleChange("citizenId", e.target.value)}
                />
              )}

              <div className="text-black">หมู่เลือด</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.blood}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.blood}
                  onChange={(e) => handleChange("blood", e.target.value)}
                />
              )}

              <div className="text-black">ส่วนสูง</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.height}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              )}

              <div className="text-black">น้ำหนัก</div>
              {!isEdit ? (
                <div className="text-navy">{form.weight}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ประวัติสุขภาพ */}
        {selectedTab === "2" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">โรคประจำตัว</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.disease}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.disease}
                  onChange={(e) => handleChange("disease", e.target.value)}
                />
              )}

              <div className="text-black">ยาประจำตัว</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.medicine}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.medicine}
                  onChange={(e) => handleChange("medicine", e.target.value)}
                />
              )}
            </div>

            <div className="col-6">
              <div className="text-black">ประวัติแพ้ยา</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.allergyDrug}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.allergyDrug}
                  onChange={(e) => handleChange("allergyDrug", e.target.value)}
                />
              )}

              <div className="text-black">ประวัติแพ้อาหาร</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.allergyFood}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.allergyFood}
                  onChange={(e) => handleChange("allergyFood", e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ข้อมูลติดต่อ */}
        {selectedTab === "3" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">เบอร์โทรศัพท์</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.phone || "ไม่มี"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              )}

              <div className="text-black">อีเมล</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.email || "ไม่มี"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              )}
            </div>

            <div className="col-6">
              <div className="text-black">เบอร์ติดต่อฉุกเฉิน</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.emergency || "ไม่มี"}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.emergency}
                  onChange={(e) =>
                    handleChange("emergency", e.target.value)
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileNew;
