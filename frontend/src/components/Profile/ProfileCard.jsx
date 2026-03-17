import { useState, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { supabase } from "../../config/supabaseClient";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { SquarePen, X, Save } from "lucide-react";

const ProfileCard = ({ lang }) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { currentUser, usersInfo } = useData();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [nationValue, setNationValue] = useState("");
  const [isNationOpen, setIsNationOpen] = useState(false);
  const [isBloodOpen, setIsBloodOpen] = useState(false);
  const [bloodValue, setBloodValue] = useState("");

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

  const bloodType = {
    A: "A",
    B: "B",
    AB: "AB",
    O: "O",
  };

  const filteredNation = nations.filter((n) =>
    (lang === "TH" ? n.th : n.en)
      .toLowerCase()
      .includes(nationValue.toLowerCase())
  );

  const displayGender = {
    ชาย: lang === "TH" ? "ชาย" : "Male",
    หญิง: lang === "TH" ? "หญิง" : "Female",
    อื่นๆ: lang === "TH" ? "อื่นๆ" : "Other",
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
          ? form.chronic_conditions.split(",").map((w) => w.trim())
          : [],
        allergies_med: form.allergies_med
          ? form.allergies_med.split(",").map((w) => w.trim())
          : [],
        food_allergies: form.food_allergies
          ? form.food_allergies.split(",").map((w) => w.trim())
          : [],
        regular_med: form.regular_med
          ? form.regular_med.split(",").map((w) => w.trim())
          : [],
      };

      const { error } = await supabase
        .from("users_info")
        .update(updateData)
        .eq("user_id", currentUser.user_id);
      if (error) throw error;

      setIsEdit(false);
      toast.success(text.saveSuccess);
    } catch (err) {
      console.error(err);
      toast.error(text.saveError);
    }
  };

  if (!form)
    return (
      <div className="text-center! mt-10! text-gray-500!">{text.noData}</div>
    );

  const Label = ({ children }) => (
    <div className="text-sm! font-semibold! text-gray-400! mb-1!">
      {children}
    </div>
  );
  const DisplayValue = ({ children }) => (
    <div className="text-lg! font-medium! text-gray-800! h-10! flex! items-center!">
      {children}
    </div>
  );
  const InputStyle =
    "w-full! px-4! py-2! rounded-xl! border! border-gray-200! bg-gray-50! focus:bg-white! focus:border-indigo-500! focus:ring-4! focus:ring-indigo-100! outline-none! transition-all! duration-200!";

  return (
    <div className="w-full! max-w-5xl! mx-auto! p-6! sm:p-10! mt-10! bg-white! rounded-4xl! shadow-xl! border">
      {/* Header Section */}
      <div className="flex! flex-col! md:flex-row! items-center! gap-6! mb-10!">
        <div className="w-32! h-32! bg-linear-to-br! from-gray-200! to-gray-300! rounded-full! shadow-inner! shrink-0!"></div>

        <div className="flex-1! text-center! md:text-left!">
          <h1 className="text-3xl! font-bold! text-gray-900!">
            {form.full_name}
          </h1>
          <p className="text-gray-500! mt-1!">
            {form.email || text.notSpecified}
          </p>
        </div>

        <div className="shrink-0!">
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="inline-flex! items-center! px-6! py-2.5! bg-indigo-600! hover:bg-indigo-700! text-white! font-medium! rounded-xl! shadow-lg! shadow-indigo-200! transition-all! hover:-translate-y-1!"
            >
              <SquarePen size={18} className="mr-2!" /> {text.edit}
            </button>
          ) : (
            <div className="flex! gap-3!">
              <button
                onClick={handleSave}
                className="inline-flex! items-center! px-5! py-2.5! bg-emerald-500! hover:bg-emerald-600! text-white! font-medium! rounded-xl! shadow-lg! shadow-emerald-200! transition-all! hover:-translate-y-1!"
              >
                <Save size={18} className="mr-2!" /> {text.save}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="inline-flex! items-center! px-5! py-2.5! bg-rose-500! hover:bg-rose-600! text-white! font-medium! rounded-xl! shadow-lg! shadow-rose-200! transition-all! hover:-translate-y-1!"
              >
                <X size={18} className="mr-2!" /> {text.cancel}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex! border-b! border-gray-100! mb-8! gap-4!">
        {["1", "2", "3"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`
              px-5! py-3! text-base! font-semibold! transition-all! relative! rounded-xl!
              ${selectedTab === tab
                ? "text-indigo-900! after:w-full!"
                : "text-gray-400! hover:text-indigo-600! hover:bg-gray-50! after:w-0!"
              }
              after:content-['']! after:absolute! after:bottom-0! after:left-0! after:h-1! after:bg-indigo-900! after:rounded-full! after:transition-all! after:duration-300!
            `}
          >
            {tab === "1" ? text.tab1 : tab === "2" ? text.tab2 : text.tab3}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid! grid-cols-1! md:grid-cols-2! gap-x-12! gap-y-8! animate-fadeIn!">
        {/* Personal Info */}
        {selectedTab === "1" && (
          <>
            <div>
              <Label>{text.fullname}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.full_name || text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
              )}
            </div>

            <div>
              <Label>{text.gender}</Label>
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
                  <option value="ชาย">{displayGender["ชาย"]}</option>
                  <option value="หญิง">{displayGender["หญิง"]}</option>
                  <option value="อื่นๆ">{displayGender["อื่นๆ"]}</option>
                </select>
              )}
            </div>

            <div>
              <Label>{text.birthdate}</Label>
              {!isEdit ? (
                <DisplayValue>{form.dob || text.notSpecified}</DisplayValue>
              ) : (
                <input
                  type="date"
                  className={InputStyle}
                  max={dayjs().format("DD-MM-YYYY")}
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
              )}
            </div>

            <div className="relative!">
              <Label>{text.nation}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {displayNation[form.nation] || text.notSpecified}
                </DisplayValue>
              ) : (
                <>
                  <input
                    className={InputStyle}
                    value={nationValue}
                    onChange={(e) => {
                      setNationValue(e.target.value);
                      setIsNationOpen(true);
                    }}
                    onFocus={() => setIsNationOpen(true)}
                  />
                  {isNationOpen && filteredNation.length > 0 && (
                    <ul className="absolute! z-50! w-full! bg-white! shadow-xl! rounded-xl! max-h-60! overflow-auto! border! border-gray-100! mt-2!">
                      {filteredNation.map((n, i) => (
                        <li
                          key={i}
                          className="px-4! py-3! hover:bg-indigo-50! cursor-pointer! text-gray-700! border-b! border-gray-50! last:border-0!"
                          onClick={() => {
                            setNationValue(lang === "TH" ? n.th : n.en);
                            handleChange("nation", n.th);
                            setIsNationOpen(false);
                          }}
                        >
                          {lang === "TH" ? n.th : n.en}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>{text.nid}</Label>
              {!isEdit ? (
                <DisplayValue>{form.nid || text.notSpecified}</DisplayValue>
              ) : (
                <input
                  type="number"
                  className={InputStyle}
                  value={form.nid}
                  onChange={(e) => handleChange("nid", e.target.value)}
                />
              )}
            </div>
            {/* //blood_type */}
            <div className="relative!">
              <Label>{text.blood}</Label>

              {!isEdit ? (
                <DisplayValue>
                  {form.blood_type || text.notSpecified}
                </DisplayValue>
              ) : (
                <>
                  <input
                    className={InputStyle}
                    value={form.blood_type}
                    onChange={(e) => {
                      setBloodValue(e.target.value);
                      setIsBloodOpen(true);
                    }}
                    onFocus={() => setIsBloodOpen(true)}
                  />

                  {isBloodOpen && (
                    <ul className="absolute! z-50! w-full! bg-white! shadow-xl! rounded-xl! max-h-60! overflow-auto! border! border-gray-100! mt-2!">
                      {Object.values(bloodType).map((bt, index) => (
                        <li
                          key={index}
                          className="px-4! py-3! hover:bg-indigo-50! cursor-pointer! text-gray-700! border-b! border-gray-50! last:border-0!"
                          onClick={() => {
                            handleChange("blood_type", bt);
                            setBloodValue(bt);
                            setIsBloodOpen(false);
                          }}
                        >
                          {bt}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
            <div>
              <Label>{text.height}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.height ? `${form.height} cm` : text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  type="number"
                  className={InputStyle}
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
              )}
            </div>

            <div>
              <Label>{text.weight}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.weight ? `${form.weight} kg` : text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  type="number"
                  className={InputStyle}
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              )}
            </div>
          </>
        )}

        {/* Health History */}
        {selectedTab === "2" && (
          <>
            <div className="md:col-span-2!">
              <Label>{text.chronic}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.chronic_conditions || text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.chronic_conditions}
                  onChange={(e) =>
                    handleChange("chronic_conditions", e.target.value)
                  }
                />
              )}
            </div>

            <div className="md:col-span-2!">
              <Label>{text.regularMed}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.regular_med || text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.regular_med}
                  onChange={(e) => handleChange("regular_med", e.target.value)}
                />
              )}
            </div>

            <div className="md:col-span-2!">
              <Label>{text.allergiesMed}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.allergies_med || text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.allergies_med}
                  onChange={(e) =>
                    handleChange("allergies_med", e.target.value)
                  }
                />
              )}
            </div>

            <div className="md:col-span-2!">
              <Label>{text.foodAllergies}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {form.food_allergies || text.notSpecified}
                </DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.food_allergies}
                  onChange={(e) =>
                    handleChange("food_allergies", e.target.value)
                  }
                />
              )}
            </div>
          </>
        )}

        {/* Contact Info */}
        {selectedTab === "3" && (
          <>
            <div>
              <Label>{text.phone}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {String(form.phone || text.notSpecified).replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                  )}
                </DisplayValue>
              ) : (
                <input
                  type="tel"
                  maxLength={10}
                  className={InputStyle}
                  value={form.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value.replace(/\D/g, ""))
                  }
                />
              )}
            </div>

            <div>
              <Label>{text.email}</Label>
              {!isEdit ? (
                <DisplayValue>{form.email || text.notSpecified}</DisplayValue>
              ) : (
                <input
                  className={InputStyle}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              )}
            </div>

            <div className="md:col-span-2!">
              <Label>{text.emergency}</Label>
              {!isEdit ? (
                <DisplayValue>
                  {String(form.emergency || text.notSpecified).replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                  )}
                </DisplayValue>
              ) : (
                <input
                  type="tel"
                  maxLength={10}
                  className={InputStyle}
                  value={form.emergency}
                  onChange={(e) =>
                    handleChange("emergency", e.target.value.replace(/\D/g, ""))
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
