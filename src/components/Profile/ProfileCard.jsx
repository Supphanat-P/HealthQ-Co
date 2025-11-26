import { useState, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { supabase } from "../../config/supabaseClient";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { SquarePen, X } from "lucide-react";

const ProfileCard = ({ lang }) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { currentUser, usersInfo, fetchUsersInfo } = useData();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [nationValue, setNationValue] = useState("");
  const [isNationOpen, setIsNationOpen] = useState(false);

  const findUserId = usersInfo.find((u) => u.user_id === currentUser?.user_id);

  useEffect(() => {
    if (!findUserId) return;

    const thNation = findUserId.nation || "";
    const nationObj = nations.find((n) => n.th === thNation);

    setNationValue(lang === "TH" ? thNation : nationObj?.en || thNation);
  }, [findUserId, lang]);

  const nations = [
    { th: "ไทย", en: "Thai" },
    { th: "สหรัฐอเมริกา", en: "American" },
    { th: "อังกฤษ", en: "British" },
    { th: "ญี่ปุ่น", en: "Japanese" },
    { th: "จีน", en: "Chinese" },
    { th: "เกาหลีใต้", en: "South Korean" },
    { th: "ลาว", en: "Lao" },
    { th: "กัมพูชา", en: "Cambodian" },
    { th: "เมียนมา", en: "Myanmar" },
    { th: "สิงคโปร์", en: "Singaporean" },
    { th: "มาเลเซีย", en: "Malaysian" },
    { th: "ฟิลิปปินส์", en: "Filipino" },
  ];

  const filteredNation = nations.filter((n) =>
    (lang === "TH" ? n.th : n.en)
      .toLowerCase()
      .includes(nationValue.toLowerCase())
  );

  const genderMap = {
    male: { th: "ชาย", en: "Male" },
    female: { th: "หญิง", en: "Female" },
    other: { th: "อื่นๆ", en: "Other" },
  };

  const displayGender = {
    male: lang === "TH" ? genderMap.male.th : genderMap.male.en,
    female: lang === "TH" ? genderMap.female.th : genderMap.female.en,
    other: lang === "TH" ? genderMap.other.th : genderMap.other.en,
  };

  const displayNation = {
    ไทย: lang === "TH" ? "ไทย" : "Thai",
    สหรัฐอเมริกา: lang === "TH" ? "สหรัฐอเมริกา" : "American",
    อังกฤษ: lang === "TH" ? "อังกฤษ" : "British",
    ญี่ปุ่น: lang === "TH" ? "ญี่ปุ่น" : "Japanese",
    จีน: lang === "TH" ? "จีน" : "Chinese",
    เกาหลีใต้: lang === "TH" ? "เกาหลีใต้" : "South Korean",
    ลาว: lang === "TH" ? "ลาว" : "Lao",
    กัมพูชา: lang === "TH" ? "กัมพูชา" : "Cambodian",
    เมียนมา: lang === "TH" ? "เมียนมา" : "Myanmar",
    สิงคโปร์: lang === "TH" ? "สิงคโปร์" : "Singaporean",
    มาเลเซีย: lang === "TH" ? "มาเลเซีย" : "Malaysian",
    ฟิลิปปินส์: lang === "TH" ? "ฟิลิปปินส์" : "Filipino",
  };

  const text = {
    noData: lang === "TH" ? "ไม่พบข้อมูล" : "No data",

    edit: lang === "TH" ? "แก้ไข" : "Edit",
    save: lang === "TH" ? "บันทึก" : "Save",
    cancel: lang === "TH" ? "ยกเลิก" : "Cancel",
    saveSuccess: lang === "TH" ? "บันทึกข้อมูลสำเร็จ" : "Saved successfully.",
    saveError:
      lang === "TH"
        ? "เกิดข้อผิดพลาดในการบันทึก"
        : "An error occurred while saving.",

    tab1: lang === "TH" ? "ข้อมูลส่วนตัว" : "Personal Info",
    tab2: lang === "TH" ? "ประวัติสุขภาพ" : "Health History",
    tab3: lang === "TH" ? "ข้อมูลติดต่อ" : "Contact Info",

    fullname: lang === "TH" ? "ชื่อ - นามสกุล" : "Full name",
    gender: lang === "TH" ? "เพศ" : "Gender",
    birthdate: lang === "TH" ? "วันเกิด" : "Date of Birth",
    nation: lang === "TH" ? "สัญชาติ" : "Nationality",
    nid: lang === "TH" ? "เลขประจำตัวประชาชน" : "Citizen ID",
    blood: lang === "TH" ? "หมู่เลือด" : "Blood Type",
    height: lang === "TH" ? "ส่วนสูง" : "Height",
    weight: lang === "TH" ? "น้ำหนัก" : "Weight",

    chronic: lang === "TH" ? "โรคประจำตัว" : "Chronic Diseases",
    regularMed: lang === "TH" ? "ยาประจำตัว" : "Regular Medication",
    allergiesMed: lang === "TH" ? "ประวัติแพ้ยา" : "Drug Allergies",
    foodAllergies: lang === "TH" ? "ประวัติแพ้อาหาร" : "Food Allergies",

    phone: lang === "TH" ? "เบอร์โทรศัพท์" : "Phone Number",
    email: lang === "TH" ? "อีเมล" : "Email",
    emergency: lang === "TH" ? "เบอร์ติดต่อฉุกเฉิน" : "Emergency Contact",

    notSpecified: lang === "TH" ? "ไม่ระบุ" : "Not specified",

    male: lang === "TH" ? "ชาย" : "Male",
    female: lang === "TH" ? "หญิง" : "Female",
    other: lang === "TH" ? "อื่นๆ" : "Other",
    selectGender: lang === "TH" ? "เลือกเพศ" : "Select gender",
  };

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

        emergency_contact: { phone: form.emergency || "" },

        chronic_conditions: form.chronic_conditions
          ? form.chronic_conditions.split(",").map((wow) => wow.trim())
          : [],

        allergies_med: form.allergies_med
          ? form.allergies_med.split(",").map((wow) => wow.trim())
          : [],

        food_allergies: form.food_allergies
          ? form.food_allergies.split(",").map((wow) => wow.trim())
          : [],

        regular_med: form.regular_med
          ? form.regular_med.split(",").map((wow) => wow.trim())
          : [],
      };

      const { error } = await supabase
        .from("users_info")
        .update(updateData)
        .eq("user_id", currentUser.user_id);

      if (error) {
        toast.error(text.saveError);
        return;
      }

      setIsEdit(false);
      toast.success(text.saveSuccess);
    } catch (err) {
      console.error(err);
      toast.error(text.saveError);
    }
  };

  if (!form) return <div className="text-center mt-4">{text.noData}</div>;

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
            <div className="text-gray">{form.email || text.notSpecified}</div>
          </div>

          <div className="ms-auto">
            {!isEdit ? (
              <button
                className="btn btn-primary flex!"
                onClick={() => setIsEdit(true)}
              >
                <SquarePen /> &nbsp; {text.edit}
              </button>
            ) : (
              <div className="flex gap-3">
                <button className="btn btn-success flex!" onClick={handleSave}>
                  <SquarePen /> &nbsp; {text.save}
                </button>
                <button
                  className="btn btn-danger flex!"
                  onClick={() => setIsEdit(false)}
                >
                  <X /> &nbsp; {text.cancel}
                </button>
              </div>
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
                borderBottom: selectedTab === tab ? "3px solid #1f2054" : "",
                color: selectedTab === tab ? "#1f2054" : "black",
              }}
            >
              {tab === "1" ? text.tab1 : tab === "2" ? text.tab2 : text.tab3}
            </div>
          ))}
        </div>

        {selectedTab === "1" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">{text.fullname}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.full_name || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
              )}

              <div className="text-black">{text.gender}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {displayGender[form.gender] || text.notSpecified}
                </div>
              ) : (
                <select
                  className="form-select mb-4"
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">{text.selectGender}</option>

                  <option value="male">
                    {genderMap.male[lang === "TH" ? "th" : "en"]}
                  </option>
                  <option value="female">
                    {genderMap.female[lang === "TH" ? "th" : "en"]}
                  </option>
                  <option value="other">
                    {genderMap.other[lang === "TH" ? "th" : "en"]}
                  </option>
                </select>
              )}

              <div className="text-black">{text.birthdate}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.dob || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  type="date"
                  min="1900-01-01"
                  max={dayjs().format("YYYY-MM-DD")}
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
              )}

              {/* Nation */}
              <div className="text-black">{text.nation}</div>

              {!isEdit ? (
                <div className="text-navy mb-4">
                  {displayNation[form.nation] || text.notSpecified}
                </div>
              ) : (
                <div className="position-relative mb-4">
                  <input
                    className="form-control"
                    value={nationValue}
                    onChange={(e) => {
                      setNationValue(e.target.value);
                      setIsNationOpen(true);
                    }}
                    onFocus={() => setIsNationOpen(true)}
                  />

                  {isNationOpen && filteredNation.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100 mt-1 shadow bg-white"
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 9999,
                      }}
                    >
                      {filteredNation.map((n, i) => (
                        <li
                          key={i}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            const displayValue = lang === "TH" ? n.th : n.en;
                            setNationValue(displayValue);
                            handleChange("nation", n.th);
                            setIsNationOpen(false);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {lang === "TH" ? n.th : n.en}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="col-6">
              <div className="text-black">{text.nid}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.nid || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  type="number"
                  value={form.nid}
                  onChange={(e) => handleChange("nid", e.target.value)}
                />
              )}

              <div className="text-black">{text.blood}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.blood_type || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.blood_type}
                  onChange={(e) => handleChange("blood_type", e.target.value)}
                />
              )}

              <div className="text-black">{text.height}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.height ? form.height + " cm" : text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  type="number"
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              )}

              <div className="text-black">{text.weight}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.weight ? form.weight + " kg" : text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  type="number"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        {selectedTab === "2" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">{text.chronic}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.chronic_conditions || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.chronic_conditions}
                  onChange={(e) =>
                    handleChange("chronic_conditions", e.target.value)
                  }
                />
              )}

              <div className="text-black">{text.regularMed}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.regular_med || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.regular_med}
                  onChange={(e) => handleChange("regular_med", e.target.value)}
                />
              )}

              <div className="text-black">{text.allergiesMed}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.allergies_med || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.allergies_med}
                  onChange={(e) =>
                    handleChange("allergies_med", e.target.value)
                  }
                />
              )}

              <div className="text-black">{text.foodAllergies}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.food_allergies || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.food_allergies}
                  onChange={(e) =>
                    handleChange("food_allergies", e.target.value)
                  }
                />
              )}
            </div>
          </div>
        )}

        {selectedTab === "3" && (
          <div className="row fs-6">
            <div className="col-6">
              <div className="text-black">{text.phone}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {String(form.phone || text.notSpecified)
                    .replace(/\D/g, "")
                    .replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              )}

              <div className="text-black">{text.email}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {form.email || text.notSpecified}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              )}
            </div>

            <div className="col-6">
              <div className="text-black">{text.emergency}</div>
              {!isEdit ? (
                <div className="text-navy mb-4">
                  {String(form.emergency || text.notSpecified)
                    .replace(/\D/g, "")
                    .replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")}
                </div>
              ) : (
                <input
                  className="form-control mb-4"
                  value={form.emergency}
                  onChange={(e) => handleChange("emergency", e.target.value)}
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
