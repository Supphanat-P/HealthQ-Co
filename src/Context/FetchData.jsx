import { MdDescription } from "react-icons/md";
import ImgChild from "../assets/childPackage.png";
import ImgHeart from "../assets/heartPackage.png";
import ImgLiver from "../assets/liverPackage.png";
import ImgOld from "../assets/oldPackage.png";

const Data = (() => {
  let slots = [];
  const genSlots = () => {
    const doctorIds = Array.from(
      { length: 10 },
      (_, i) => `D${String(i + 1).padStart(3, "0")}`
    );
    const year = 2025;
    const monthIndex = 10;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const startHour = 9;
    const endHour = 16;
    const allTimes = [];
    for (let h = startHour; h <= endHour; h += 2) {
      const sh = String(h).padStart(2, "0") + ":00";
      const eh = String(h + 1).padStart(2, "0") + ":00";
      allTimes.push({ start: sh, end: eh });
    }

    let nextSlotNum = slots.length + 1;

    const randInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    for (const doctorId of doctorIds) {
      for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, monthIndex, d);
        const dd = String(dateObj.getDate()).padStart(2, "0");
        const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
        const yyyy = dateObj.getFullYear();
        const dateStr = `${dd}/${mm}/${yyyy}`;

        const maxSlotsToday = allTimes.length;
        const numSlots = randInt(0, Math.min(6, maxSlotsToday));

        const existingStartTimes = new Set(
          slots
            .filter((s) => s.doctor_id === doctorId && s.date === dateStr)
            .map((s) => s.start_time)
        );

        const choices = allTimes
          .map((t) => ({ start: t.start, end: t.end }))
          .filter((t) => !existingStartTimes.has(t.start));

        shuffle(choices);
        const picks = choices.slice(0, numSlots);

        for (const pick of picks) {
          const isBooked = Math.random() < 0.35;
          const isPending = !isBooked && Math.random() < 0.2;
          const patientId = isBooked
            ? `PT${String(randInt(1, 9999)).padStart(4, "0")}`
            : null;

          const slot = {
            slot_id: `SL${String(nextSlotNum).padStart(3, "0")}`,
            doctor_id: doctorId,
            schedule_text: `วันที่ ${dateStr} ${pick.start}-${pick.end}`,
            date: dateStr,
            start_time: pick.start,
            end_time: pick.end,
            duration: 60,
            status: isBooked ? "booked" : isPending ? "pending" : "available",
            patient_id: patientId,
          };

          slots.push(slot);
          nextSlotNum += 1;
        }
      }
    }
  };
  genSlots();

  const doctorIdsSet = new Set(slots.map((s) => s.doctor_id));
  const doctorIds = Array.from(doctorIdsSet).sort();

  const DoctorsScheduleData = doctorIds.map((doctorId, idx) => ({
    schedule_id: `SCH${String(idx + 1).padStart(3, "0")}`,
    doctor_id: doctorId,
    slots: slots.filter((s) => s.doctor_id === doctorId),
  }));

  const hospitalsData = [
    {
      hospital_id: "H001",
      hospital_name: "โรงพยาบาล กรุงเทพ",
      lat: 13.7495071,
      lng: 100.5810116,
    },
    {
      hospital_id: "H002",
      hospital_name: "โรงพยาบาล สมิติเวช สุขุมวิท",
      lat: 13.7489617,
      lng: 100.5426656,
    },
    {
      hospital_id: "H003",
      hospital_name: "โรงพยาบาล บำรุงราษฎร์",
      lat: 13.7460712,
      lng: 100.5501064,
    },
    {
      hospital_id: "H004",
      hospital_name: "โรงพยาบาล พญาไท พหลโยธิน",
      lat: 13.8191002,
      lng: 100.5602871,
    },
    {
      hospital_id: "H005",
      hospital_name: "โรงพยาบาล วิชัยยุทธ",
      lat: 13.7832026,
      lng: 100.5288346,
    },
    {
      hospital_id: "H006",
      hospital_name: "โรงพยาบาล เวชธานี",
      lat: 13.918137,
      lng: 100.604613,
    },
    {
      hospital_id: "H007",
      hospital_name: "โรงพยาบาล ศิริราช",
      lat: 13.756331,
      lng: 100.488882,
    },
    {
      hospital_id: "H008",
      hospital_name: "โรงพยาบาล รามาธิบดี",
      lat: 13.756303,
      lng: 100.501765,
    },
  ];

  const doctorsData = [
    {
      doctor_id: "D001",
      doctor_name: "นพ. กิตติพงศ์ วัฒนากุล",
      specialty_id: "S010",
      hospital_id: "H001",
      recommended: true,
    },
    {
      doctor_id: "D002",
      doctor_name: "พญ. สุทธิดา จันทรสกุล",
      specialty_id: "S011",
      hospital_id: "H002",
      recommended: true,
    },
    {
      doctor_id: "D003",
      doctor_name: "นพ. ธนากร อัศวะวงศ์",
      specialty_id: "S007",
      hospital_id: "H003",
      recommended: true,
    },
    {
      doctor_id: "D004",
      doctor_name: "พญ. ปราณี ภัทรวัฒน์",
      specialty_id: "S009",
      hospital_id: "H001",
      recommended: true,
    },
    {
      doctor_id: "D005",
      doctor_name: "นพ. วุฒิชัย พิพัฒน์กุล",
      specialty_id: "S003",
      hospital_id: "H002",
      recommended: true,
    },
    {
      doctor_id: "D006",
      doctor_name: "พญ. อมราพร นันทวัฒน์",
      specialty_id: "S001",
      hospital_id: "H003",
      recommended: false,
    },
    {
      doctor_id: "D007",
      doctor_name: "นพ. ภูมิภัทร เจนจิระ",
      specialty_id: "S004",
      hospital_id: "H001",
      recommended: true,
    },
    {
      doctor_id: "D008",
      doctor_name: "พญ. มณฑิรา วีรเศรษฐ์",
      specialty_id: "S008",
      hospital_id: "H002",
      recommended: false,
    },
    {
      doctor_id: "D009",
      doctor_name: "นพ. ธีรศักดิ์ ชัยเจริญ",
      specialty_id: "S002",
      hospital_id: "H003",
      recommended: false,
    },
    {
      doctor_id: "D010",
      doctor_name: "พญ. วิมลรัตน์ โชติกานนท์",
      specialty_id: "S012",
      hospital_id: "H001",
      specialty_name: "จักษุวิทยา (ตา)",
      recommended: true,
    },
  ];

  const specialtiesData = [
    { specialty_name: "หู คอ จมูก", specialty_id: "S001" },
    { specialty_name: "ตา", specialty_id: "S002" },
    { specialty_name: "ทันตกรรม", specialty_id: "S003" },
    { specialty_name: "สุขภาพสตรี", specialty_id: "S004" },
    { specialty_name: "ระบบทางเดินอาหารและตับ", specialty_id: "S005" },
    { specialty_name: "ตรวจสุขภาพ", specialty_id: "S006" },
    { specialty_name: "เบาหวานและต่อมไร้ท่อ", specialty_id: "S007" },
    { specialty_name: "โรคระบบทางเดินปัสสาวะ", specialty_id: "S008" },
    { specialty_name: "ผิวหนัง", specialty_id: "S009" },
    { specialty_name: "โรคระบบทางเดินหายใจ", specialty_id: "S010" },
    { specialty_name: "กระดูกและข้อ", specialty_id: "S011" },
    { specialty_name: "รังสีวินิจฉัย X-Ray", specialty_id: "S012" },
    { specialty_name: "ศัลยกรรม", specialty_id: "S013" },
    { specialty_name: "อายุรกรรม", specialty_id: "S014" },
    { specialty_name: "ส่งเสริมสุขภาพและอาชีวเวชศาสตร์", specialty_id: "S015" },
    { specialty_name: "หัวใจ", specialty_id: "S016" },
    { specialty_name: "วิสัญญี", specialty_id: "S017" },
    { specialty_name: "เวชกรรม", specialty_id: "S018" },
    { specialty_name: "สุขภาพเพศชาย", specialty_id: "S019" },
    { specialty_name: "โรคระบบประสาทและสมอง", specialty_id: "S020" },
    { specialty_name: "เวชศาสตร์ฟื้นฟู และกายภาพบำบัด", specialty_id: "S021" },
  ];

  const symptomToSpecialty = [
    { symptom: "ปวดหู คัดจมูก ไอ เจ็บคอ", specialty_id: "S001" },
    { symptom: "ตามัว ตาแดง มองไม่ชัด", specialty_id: "S002" },
    { symptom: "ฟันผุ ปวดฟัน เหงือกบวม", specialty_id: "S003" },
    { symptom: "ประจำเดือนผิดปกติ ปวดท้องน้อย", specialty_id: "S004" },
    { symptom: "ท้องอืด ท้องเสีย ปวดท้อง", specialty_id: "S005" },
    { symptom: "ตรวจสุขภาพประจำปี", specialty_id: "S006" },
    { symptom: "น้ำตาลในเลือดสูง กระหายน้ำบ่อย", specialty_id: "S007" },
    { symptom: "ปัสสาวะบ่อย ปัสสาวะเจ็บ", specialty_id: "S008" },
    { symptom: "ผื่น แพ้คัน แดง", specialty_id: "S009" },
    { symptom: "ไอ หอบ หายใจลำบาก", specialty_id: "S010" },
    { symptom: "ปวดกระดูก ข้ออักเสบ", specialty_id: "S011" },
    { symptom: "X-Ray / วินิจฉัยทางรังสี", specialty_id: "S012" },
    { symptom: "ผ่าตัดทั่วไป / บาดแผล", specialty_id: "S013" },
    { symptom: "เจ็บป่วยทั่วไป", specialty_id: "S014" },
    { symptom: "ตรวจสุขภาพอาชีวเวช", specialty_id: "S015" },
    { symptom: "เจ็บหน้าอก หัวใจเต้นผิดปกติ", specialty_id: "S016" },
    { symptom: "ผ่าตัด รักษาเฉพาะวิสัญญี", specialty_id: "S017" },
    { symptom: "ตรวจทั่วไป ตรวจโรค", specialty_id: "S018" },
    { symptom: "ปัญหาสุขภาพเพศชาย", specialty_id: "S019" },
    { symptom: "ปวดหัว ชา อ่อนแรง กล้ามเนื้ออ่อนแรง", specialty_id: "S020" },
    { symptom: "ฟื้นฟูกายภาพหลังอาการ/ผ่าตัด", specialty_id: "S021" },
  ];

  const PackageData = [
    {
      package_id: "P001",
      package_name: "ตรวจสุขภาพทั่วไป",
      price: 1500,
      description: "ตรวจสุขภาพร่างกายครบวงจร",
      headline: "สุขภาพดี เริ่มต้นที่นี่",
      image: ImgChild,
    },
    {
      package_id: "P002",
      package_name: "ตรวจสุขภาพสตรี",
      price: 2500,
      description: "ตรวจสุขภาพสำหรับผู้หญิงโดยเฉพาะ",
      headline: "เพราะคุณผู้หญิงคือคนสำคัญ",
      image: ImgHeart,
    },
    {
      package_id: "P003",
      package_name: "ตรวจสุขภาพหัวใจ",
      price: 3000,
      description: "ตรวจสุขภาพหัวใจโดยละเอียด",
      headline: "หัวใจแข็งแรง ชีวิตยืนยาว",
      image: ImgHeart,
    },
    {
      package_id: "P004",
      package_name: "ตรวจสุขภาพเบาหวาน",
      price: 2000,
      description: "ติดตามและป้องกันโรคเบาหวาน",
      headline: "ควบคุมเบาหวาน ปลอดภัยทุกวัน",
      image: ImgLiver,
    },
    {
      package_id: "P005",
      package_name: "ตรวจสุขภาพเด็ก",
      price: 1800,
      description: "ตรวจสุขภาพสำหรับเด็ก",
      headline: "สุขภาพดี เริ่มต้นตั้งแต่เด็ก",
      image: ImgChild,
    },
    {
      package_id: "P006",
      package_name: "ตรวจสุขภาพผู้สูงอายุ",
      price: 2200,
      description: "ดูแลสุขภาพผู้สูงวัยอย่างครบถ้วน",
      headline: "สุขภาพดี ไม่มีวันหยุดสำหรับผู้สูงวัย",
      image: ImgOld,
    },
    {
      package_id: "P007",
      package_name: "ตรวจสุขภาพตับ",
      price: 2800,
      description: "ตรวจสุขภาพตับโดยเฉพาะ",
      headline: "ตับแข็งแรง ชีวิตกระปรี้กระเปร่า",
      image: ImgLiver,
    },
  ];

  return {
    doctors: doctorsData,
    hospitals: hospitalsData,
    specialties: specialtiesData,
    schedules: DoctorsScheduleData,
    packages: PackageData,
  };
})();

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export const fetchDoctorsScheduleData = async () => {
  await delay();
  return Data.schedules;
};

export const fetchDoctors = async () => {
  await delay();
  return Data.doctors;
};

export const fetchHospitals = async () => {
  await delay();
  return Data.hospitals;
};

export const fetchSpecialties = async () => {
  await delay();
  return Data.specialties;
};

export const fetchPackages = async () => {
  await delay();
  return Data.packages;
};
export default Data;
