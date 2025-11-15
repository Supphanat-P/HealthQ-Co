import { MdDescription } from "react-icons/md";

const Data = (() => {
  const DoctorsScheduleData = [
    {
      schedule_id: "SCH001",
      doctor_id: "D001",
      slots: [
        {
          slot_id: "SL001",
          date: "2025-11-14",
          start_time: "09:00",
          end_time: "10:00",
          status: "pending",
        },
        {
          slot_id: "SL002",
          date: "2025-11-14",
          start_time: "10:00",
          end_time: "11:00",
          status: "completed",
          patient_id: "PT00001",
        },
        {
          slot_id: "SL003",
          date: "2025-11-14",
          start_time: "12:00",
          end_time: "13:00",
          status: "booked",
          patient_id: "PT00001",
        },
        {
          slot_id: "SL004",
          date: "2025-11-15",
          start_time: "13:00",
          end_time: "14:00",
          status: "available",
        },
      ],
    },
    {
      schedule_id: "SCH002",
      doctor_id: "D002",
      slots: [
        {
          slot_id: "SL005",
          date: "2025-11-17",
          start_time: "09:00",
          end_time: "10:00",
          status: "available",
        },
        {
          slot_id: "SL006",
          date: "2025-11-17",
          start_time: "10:00",
          end_time: "11:00",
          status: "available",
        },
      ],
    },
  ];

  const hospitalsData = [
    {
      hospital_id: "H001",
      hospital_name: "โรงพยาบาลกรุงเทพ",
      lat: 13.7495071,
      lng: 100.5810116,
      imgPath: "BangkokHospital.png",
    },
    {
      hospital_id: "H002",
      hospital_name: "โรงพยาบาลสมิติเวช สาขาสุขุมวิท",
      lat: 13.7489617,
      lng: 100.5426656,
      imgPath: "SamitivejSukhumvit.png",
    },
    {
      hospital_id: "H003",
      hospital_name: "โรงพยาบาลบำรุงราษฎร์",
      lat: 13.7460712,
      lng: 100.5501064,
      imgPath: "BumrungradHospital.png",
    },
    {
      hospital_id: "H004",
      hospital_name: "โรงพยาบาลพญาไท สาขาพหลโยธิน",
      lat: 13.8191002,
      lng: 100.5602871,
      imgPath: "PhyathaiPhaholyothin.png",
    },
    {
      hospital_id: "H005",
      hospital_name: "โรงพยาบาลวิชัยยุทธ",
      lat: 13.7832026,
      lng: 100.5288346,
      imgPath: "VichaiyutHospital.png",
    },
    {
      hospital_id: "H006",
      hospital_name: "โรงพยาบาลเวชธานี",
      lat: 13.918137,
      lng: 100.604613,
      imgPath: "VejthaniHospital.png",
    },
    {
      hospital_id: "H007",
      hospital_name: "โรงพยาบาลศิริราช",
      lat: 13.756331,
      lng: 100.488882,
      imgPath: "SirirajHospital.png",
    },
    {
      hospital_id: "H008",
      hospital_name: "โรงพยาบาลรามาธิบดี",
      lat: 13.756303,
      lng: 100.501765,
      imgPath: "RamathibodiHospital.png",
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

  const appointmentData = [
    {
      appointment_id: "APPT20803",
      patient_id: "PT00001",
      patient_name: "สมชาย ใจดี",
      patient_phone: "0629735453",
      patient_email: "sxphxnxt@gmail.com",
      patient_symptom: "sssssssssssssssssss",
      doctor_id: "D001",
      slot_id: "SL001",
      created_at: "2025-11-11T11:25:15.068Z",
    },
    {
      appointment_id: "APPT20804",
      patient_id: "PT00001",
      patient_name: "สมชาย ใจดี",
      patient_phone: "0629735453",
      patient_email: "sxphxnxt@gmail.com",
      patient_symptom: "ปวดหัวและมีไข้",
      doctor_id: "D001",
      slot_id: "SL002",
      created_at: "2025-11-12T09:15:30.000Z",
    },
    {
      appointment_id: "APPT20805",
      patient_id: "PT00001",
      patient_name: "สมชาย ใจดี",
      patient_phone: "0629735453",
      patient_email: "sxphxnxt@gmail.com",
      patient_symptom: "ปวดหัวและมีไข้",
      doctor_id: "D001",
      slot_id: "SL003",
      created_at: "2025-11-12T09:15:30.000Z",
    },
  ];

  const usersCredentialsData = [
    {
      user_id: "PT00001",
      email: "sxphxnxt@gmail.com",
      password: "1",
      phone: "0629735453",
      role: "patient",
    },
    {
      user_id: "PT00002",
      email: "sxphxnxt2@gmail.com",
      password: "1",
      phone: "0629735454",
      role: "patient",
    },
    {
      user_id: "PT00003",
      email: "theeradon@gmail.com",
      password: "1",
      phone: "0991991991",
      role: "patient",
    },
    {
      user_id: "ADMIN01",
      email: "admin@healthq.test",
      password: "adminpass",
      phone: "0801234567",
      role: "admin",
    },
  ];

  const usersInfoData = [
    {
      user_id: "PT00001",
      first_name: "สมชาย",
      last_name: "ใจดี",
      full_name: "สมชาย ใจดี",
      dob: "1985-06-20",
      gender: "male",
      phone: "0629735453",
      email: "sxphxnxt@gmail.com",
      address: "123 ถนนสุขภาพ เขตตัวอย่าง กรุงเทพฯ",
      emergency_contact: {
        name: "สมหญิง ใจดี",
        phone: "0812345678",
        relation: "ภรรยา",
      },
      blood_type: "O+",
      allergies: ["penicillin"],
      chronic_conditions: ["hypertension"],
      created_at: "2025-11-11T10:00:00.000Z",
      updated_at: "2025-11-11T11:25:15.068Z",
    },
    {
      user_id: "PT00002",
      first_name: "สมหญิง",
      last_name: "ใจดี",
      full_name: "สมหญิง ใจดี",
      dob: "1985-06-20",
      gender: "female",
      phone: "0629735454",
      email: "sxphxnxt2@gmail.com",
      address: "123 ถนนสุขภาพ เขตตัวอย่าง กรุงเทพฯ",
      emergency_contact: {
        name: "สมชาย ใจดี",
        phone: "0812345678",
        relation: "สามี",
      },
      blood_type: "O+",
      allergies: ["penicillin"],
      chronic_conditions: ["hypertension"],
      created_at: "2025-11-11T10:00:00.000Z",
      updated_at: "2025-11-11T11:25:15.068Z",
    },
  ];

  return {
    doctors: doctorsData,
    hospitals: hospitalsData,
    specialties: specialtiesData,
    schedules: DoctorsScheduleData,
    appointments: appointmentData,
    users_credentials: usersCredentialsData,
    users_info: usersInfoData,
    symptom_to_specialty: symptomToSpecialty,
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
export const fetchAppointments = async () => {
  await delay();
  return Data.appointments;
};

export const fetchUsersCredentials = async () => {
  await delay();
  return Data.users_credentials;
};

export const fetchUsersInfo = async () => {
  await delay();
  return Data.users_info;
};

export const fetchSymptomsList = async () => {
  await delay();
  return Data.symptom_to_specialty;
};
export default Data;
