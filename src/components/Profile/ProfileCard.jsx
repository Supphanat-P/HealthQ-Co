import { useState } from "react";
import { useData } from "../../Context/DataContext";
import { supabase } from "../../config/supabaseClient";
import toast from "react-hot-toast";
import { useEffect } from "react";
import dayjs from "dayjs";

const ProfileCard = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { currentUser, usersInfo, fetchUsersInfo } = useData();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(null);

  const findUserId = usersInfo.find(
    (u) => u.user_id === currentUser?.user_id
  );

  useEffect(() => {
    if (!findUserId) return;

    setForm({
      full_name: findUserId.full_name || "",
      gender: findUserId.gender || "",
      dob: findUserId.dob || "",
      nation: findUserId.nation || "",
      nid: findUserId.nid || "",
      blood_type: findUserId.blood_type || "",
      height: findUserId.height || "",
      weight: findUserId.weight || "",
      phone: findUserId.phone || "",
      email: findUserId.email || "",
      emergency: findUserId.emergency_contact?.phone || "",
      chronic_conditions: findUserId.chronic_conditions?.join(", ") || "",
      allergies_med: findUserId.allergies_med?.join(", ") || "",
      food_allergies: findUserId.food_allergies?.join(", ") || "",
      regular_med: findUserId.regular_med?.join(", ") || "",
    });
  }, [usersInfo, currentUser]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        full_name: form.full_name,
        first_name: form.full_name.split(" ")[0] || "",
        last_name: form.full_name.split(" ")[1] || "",
        gender: form.gender,

        dob: form.dob || null,

        nation: form.nation,
        nid: form.nid,
        blood_type: form.blood_type,

        height: form.height === "" ? null : Number(form.height),
        weight: form.weight === "" ? null : Number(form.weight),

        phone: form.phone,
        email: form.email,

        emergency_contact: {
          phone: form.emergency || ""
        },

        chronic_conditions: form.chronic_conditions
          ? form.chronic_conditions.split(",").map(wow => wow.trim())
          : [],

        allergies_med: form.allergies_med
          ? form.allergies_med.split(",").map(wow => wow.trim())
          : [],

        food_allergies: form.food_allergies
          ? form.food_allergies.split(",").map(wow => wow.trim())
          : [],

        regular_med: form.regular_med
          ? form.regular_med.split(",").map(wow => wow.trim())
          : [],
      };


      const { error } = await supabase
        .from("users_info")
        .update(updateData)
        .eq("user_id", currentUser.user_id);

      if (error) {
        console.error(error);
        toast.error("เกิดข้อผิดพลาดในการบันทึก");
        return;
      }

      setIsEdit(false);
      toast.success("บันทึกข้อมูลสำเร็จ!");

    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  console.log(form)

  if (!form) return <div className="text-center mt-4">กำลังโหลด...</div>;


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
            <div className="fs-3 fw-bold">{form.full_name}</div>
            <div className="text-gray">{form.email || "ไม่ระบุอีเมล"}</div>
          </div>

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
                onClick={handleSave}
              >
                บันทึก
              </button>
            )}
          </div>
        </div>

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

        {selectedTab === "1" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">ชื่อ - นามสกุล</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.full_name ? form.full_name : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
              )}

              <div className="text-black">เพศ</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.gender ? form.gender : "ไม่ระบุ"}</div>
              ) : (
                <select className="form-select mb-4" value={form.gender} onChange={(e) => handleChange("gender", e.target.value)} >
                  <option value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              )}

              <div className="text-black">วันเกิด</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.dob ? form.dob : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.dob}
                  type="date"
                  min="1900-01-01"
                  max={dayjs().format("YYYY-MM-DD")}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
              )}

              <div className="text-black">สัญชาติ</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.nation ? form.nation : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.nation}
                  onChange={(e) => handleChange("nation", e.target.value)}
                />
              )}
            </div>

            <div className="col-6">
              <div className="text-black">เลขประจำตัวประชาชน</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.nid ? form.nid : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.nid}
                  type="number"
                  maxLength={13}
                  onChange={(e) => handleChange("nid", e.target.value)}
                />
              )}

              <div className="text-black">หมู่เลือด</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.blood_type ? form.blood_type : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.blood_type}
                  onChange={(e) => handleChange("blood_type", e.target.value)}
                />
              )}

              <div className="text-black">ส่วนสูง</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.height ? form.height + " cm" : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.height}
                  type="number"
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              )}

              <div className="text-black">น้ำหนัก</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.weight ? form.weight + " kg" : "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.weight}
                  type="number"
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              )}
            </div>
          </div>
        )}


        {selectedTab === "2" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">โรคประจำตัว</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.chronic_conditions || "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.chronic_conditions}
                  onChange={(e) => handleChange("chronic_conditions", e.target.value)}
                />
              )}

              <div className="text-black">ยาประจำตัว</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.regular_med || "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.regular_med}
                  onChange={(e) => handleChange("regular_med", e.target.value)}
                />
              )}

              <div className="text-black">ประวัติแพ้ยา</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.allergies_med || "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.allergies_med}
                  onChange={(e) => handleChange("allergies_med", e.target.value)}
                />
              )}

              <div className="text-black">ประวัติแพ้อาหาร</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.food_allergies || "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.food_allergies}
                  onChange={(e) => handleChange("food_allergies", e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        {selectedTab === "3" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">เบอร์โทรศัพท์</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.phone || "ไม่ระบุ"}</div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              )}

              <div className="text-black">อีเมล</div>
              {!isEdit ? (
                <div className="text-navy mb-4">{form.email || "ไม่ระบุ"}</div>
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
                  {form.emergency || "ไม่ระบุ"}
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

export default ProfileCard;
