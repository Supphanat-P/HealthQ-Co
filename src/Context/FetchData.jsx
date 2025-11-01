const DoctorsScheduleData = (() => {
  const DoctorsScheduleData = [
    {
      schedule_id: "SCH001",
      doctor_id: "D001",
      slots: [
        {
          schedule_text: "อาทิตย์ 11:00-12:00",
          date: "29/10/2025",
          start_time: "11:00",
          end_time: "12:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "จันทร์ 09:00-12:00",
          date: "31/10/2025",
          start_time: "09:00",
          end_time: "10:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "จันทร์ 12:00-13:00",
          date: "31/10/2025",
          start_time: "12:00",
          end_time: "13:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "อังคาร 12:00-13:00",
          date: "04/11/2025",
          start_time: "12:00",
          end_time: "13:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "พุธ 13:00-16:00",
          date: "31/10/2025",
          start_time: "13:00",
          end_time: "16:00",
          duration: 60,
          status: "booked",
        },
      ],
    },
    {
      schedule_id: "SCH002",
      doctor_id: "D002",
      slots: [
        {
          schedule_text: "อังคาร 10:00-12:00",
          date: "01/11/2025",
          start_time: "10:00",
          end_time: "12:00",
          duration: 20,
          status: "available",
        },
      ],
    },
  ];

  const hospitalsData = [
    { hospital_name: "โรงพยาบาลบำรุงราษฎร์", hospital_id: "H001" },
    { hospital_name: "โรงพยาบาลสมิติเวช", hospital_id: "H002" },
    { hospital_name: "โรงพยาบาลกรุงเทพ", hospital_id: "H003" },
  ];

  const doctorsData = [
    {
      doctor_id: "D001",
      doctor_name: "นพ. กิตติพงศ์ วัฒนากุล",
      specialty_id: "S010",
      hospital_id: "H001",
    },
    {
      doctor_id: "D002",
      doctor_name: "พญ. สุทธิดา จันทรสกุล",
      specialty_id: "S011",
      hospital_id: "H002",
    },
    {
      doctor_id: "D003",
      doctor_name: "นพ. ธนากร อัศวะวงศ์",
      specialty_id: "S007",
      hospital_id: "H003",
    },
    {
      doctor_id: "D004",
      doctor_name: "พญ. ปราณี ภัทรวัฒน์",
      specialty_id: "S009",
      hospital_id: "H001",
    },
    {
      doctor_id: "D005",
      doctor_name: "นพ. วุฒิชัย พิพัฒน์กุล",
      specialty_id: "S003",
      hospital_id: "H002",
    },
    {
      doctor_id: "D006",
      doctor_name: "พญ. อมราพร นันทวัฒน์",
      specialty_id: "S001",
      hospital_id: "H003",
    },
    {
      doctor_id: "D007",
      doctor_name: "นพ. ภูมิภัทร เจนจิระ",
      specialty_id: "S004",
      hospital_id: "H001",
    },
    {
      doctor_id: "D008",
      doctor_name: "พญ. มณฑิรา วีรเศรษฐ์",
      specialty_id: "S008",
      hospital_id: "H002",
    },
    {
      doctor_id: "D009",
      doctor_name: "นพ. ธีรศักดิ์ ชัยเจริญ",
      specialty_id: "S002",
      hospital_id: "H003",
    },
    {
      doctor_id: "D010",
      doctor_name: "พญ. วิมลรัตน์ โชติกานนท์",
      specialty_id: "S012",
      hospital_id: "H001",
    },
  ];

  const specialtiesData = [
    { specialty_name: "โรคหัวใจ", specialty_id: "S001" },
    { specialty_name: "มะเร็งวิทยา", specialty_id: "S002" },
    { specialty_name: "ออร์โธปิดิกส์ (กระดูก)", specialty_id: "S003" },
    { specialty_name: "ระบบประสาท (สมอง)", specialty_id: "S004" },
    { specialty_name: "อุบัติเหตุ", specialty_id: "S005" },
    { specialty_name: "ตรวจสุขภาพ", specialty_id: "S006" },
    { specialty_name: "ศัลยกรรมทั่วไป", specialty_id: "S007" },
    { specialty_name: "ทันตกรรม", specialty_id: "S008" },
    { specialty_name: "สูตินรีเวช", specialty_id: "S009" },
    { specialty_name: "อายุรกรรม", specialty_id: "S010" },
    { specialty_name: "กุมารเวชกรรม", specialty_id: "S011" },
    { specialty_name: "จักษุวิทยา (ตา)", specialty_id: "S012" },
    { specialty_name: "ความงาม", specialty_id: "S013" },
    { specialty_name: "โสต ศอ นาสิก (ตา หู คอ จมูก)", specialty_id: "S014" },
    { specialty_name: "ศูนย์บริการผู้ป่วยชาวต่างชาติ", specialty_id: "S015" },
    { specialty_name: "กายภาพบำบัด", specialty_id: "S016" },
    { specialty_name: "ระบบทางเดินอาหาร ตับและถุงน้ำดี", specialty_id: "S017" },
    { specialty_name: "ดูแลผู้สูงอายุ", specialty_id: "S018" },
    { specialty_name: "ปอดและระบบทางเดินหายใจ", specialty_id: "S019" },
  ];

  return {
    doctors: doctorsData,
    hospitals: hospitalsData,
    specialties: specialtiesData,
    schedules: DoctorsScheduleData,
  };
})();

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export const fetchDoctorsScheduleData = async () => {
  await delay();
  return DoctorsScheduleData.schedules;
};

export const fetchDoctors = async () => {
  await delay();
  return DoctorsScheduleData.doctors;
};

export const fetchHospitals = async () => {
  await delay();
  return DoctorsScheduleData.hospitals;
};

export const fetchSpecialties = async () => {
  await delay();
  return DoctorsScheduleData.specialties;
};

export default DoctorsScheduleData;
