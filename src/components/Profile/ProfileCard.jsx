import { useState } from "react";
import { useData } from "../../Context/DataContext";
const ProfileCard = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { currentUser, usersInfo } = useData();
  console.log(currentUser)
  const findUserId = usersInfo.find((u) => u.user_id === currentUser.user_id);
  console.log(findUserId);
  return (
    <>
      <div
        className="card p-4 mt-4 justify-content-center d-flex m-auto"
        style={{ width: "70%" }}
      >
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
            <div className="fs-3 fw-bold">{findUserId?.full_name ? findUserId?.full_name : "ไม่ระบุ"}</div>
            <div className="text-gray">{findUserId?.email ? findUserId?.email : "ไม่ระบุ"}</div>
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
              <div className="text-navy mb-4">{findUserId?.full_name ? findUserId?.full_name : "ไม่ระบุ"}</div>

              <div className="text-black">เพศ</div>
              <div className="text-navy mb-4">{findUserId?.gender ? findUserId?.gender : "ไม่ระบุ"}</div>

              <div className="text-black">วันเกิด</div>
              <div className="text-navy mb-4">{findUserId?.dob ? new Date(findUserId?.dob).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) : "ไม่ระบุ"}</div>

              <div className="text-black">สัญชาติ</div>
              <div className="text-navy">{findUserId?.nation ? findUserId?.nation : "ไม่ระบุ"}</div>
            </div>

            <div className="col-6">
              <div className="text-black">เลขประจำตัวประชาชน</div>
              <div className="text-navy mb-4">{findUserId?.nId ? findUserId?.nId : "ไม่ระบุ"}</div>

              <div className="text-black">หมู่เลือด</div>
              <div className="text-navy mb-4">{findUserId?.blood_type ? findUserId?.blood_type : "ไม่ระบุ"}</div>

              <div className="text-black">ส่วนสูง</div>
              <div className="text-navy mb-4">{findUserId?.height ? findUserId?.height : "ไม่ระบุ"}</div>

              <div className="text-black">น้ำหนัก</div>
              <div className="text-navy">{findUserId?.weight ? findUserId?.weight : "ไม่ระบุ"}</div>
            </div>
          </div>
        )}

        {selectedTab === "2" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">โรคประจำตัว</div>
              <div className="text-navy mb-4">{findUserId?.chronic_conditions ? findUserId?.chronic_conditions : "ไม่ระบุ"}</div>

              <div className="text-black">ยาประจำตัว</div>
              <div className="text-navy mb-4">{findUserId?.regular_med ? findUserId?.regular_med : "ไม่ระบุ"}</div>
            </div>

            <div className="col-6">
              <div className="text-black">ประวัติแพ้ยา</div>
              <div className="text-navy mb-4">{findUserId?.allergies ? findUserId?.allergies : "ไม่ระบุ"}</div>

              <div className="text-black">ประวัติแพ้อาหาร</div>
              <div className="text-navy mb-4">{findUserId?.food_allergies ? findUserId?.food_allergies : "ไม่ระบุ"}</div>
            </div>
          </div>
        )}

        {selectedTab === "3" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">เบอร์โทรศัพท์</div>
              <div className="text-navy mb-4">{findUserId?.phone ? findUserId?.phone : "ไม่ระบุ"}</div>

              <div className="text-black">อีเมล</div>
              <div className="text-navy mb-4">{findUserId?.email ? findUserId?.email : "ไม่ระบุ"}</div>
            </div>

            <div className="col-6">
              <div className="text-black">เบอร์ติดต่อฉุกเฉิน</div>
              <div className="text-navy mb-4">{findUserId?.emergency_contact[0].phone ? findUserId?.emergency_contact[0].phone : "ไม่ระบุ"}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
