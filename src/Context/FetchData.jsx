import { MdDescription } from "react-icons/md";

const DoctorsScheduleData = (() => {
  const DoctorsScheduleData = [
    {
      schedule_id: "SCH001",
      doctor_id: "D001",
      slots: [
        {
          schedule_text: "วันที่ 02/11/2025 11:00-12:00",
          date: "02/11/2025",
          start_time: "11:00",
          end_time: "12:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "วันที่ 03/11/2025 08:00-09:00",
          date: "03/11/2025",
          start_time: "08:00",
          end_time: "09:00",
          duration: 60,
          status: "available",
        },

        {
          schedule_text: "วันที่ 03/11/2025 13:00-14:00",
          date: "03/11/2025",
          start_time: "13:00",
          end_time: "14:00",
          duration: 60,
          status: "booked",
        },

        {
          schedule_text: "วันที่ 04/11/2025 09:00-10:00",
          date: "04/11/2025",
          start_time: "09:00",
          end_time: "10:00",
          duration: 60,
          status: "booked",
        },
        {
          schedule_text: "วันที่ 04/11/2025 13:30-14:30",
          date: "04/11/2025",
          start_time: "13:30",
          end_time: "14:30",
          duration: 60,
          status: "available",
        },

        {
          schedule_text: "วันที่ 05/11/2025 10:00-11:00",
          date: "05/11/2025",
          start_time: "10:00",
          end_time: "11:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "วันที่ 05/11/2025 16:00-17:00",
          date: "05/11/2025",
          start_time: "16:00",
          end_time: "17:00",
          duration: 60,
          status: "available",
        },

        {
          schedule_text: "วันที่ 06/11/2025 11:00-12:00",
          date: "06/11/2025",
          start_time: "11:00",
          end_time: "12:00",
          duration: 60,
          status: "booked",
        },

        {
          schedule_text: "วันที่ 07/11/2025 09:00-10:00",
          date: "07/11/2025",
          start_time: "09:00",
          end_time: "10:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "วันที่ 07/11/2025 12:00-13:00",
          date: "07/11/2025",
          start_time: "12:00",
          end_time: "13:00",
          duration: 60,
          status: "booked",
        },
        {
          schedule_text: "วันที่ 07/11/2025 15:00-16:00",
          date: "07/11/2025",
          start_time: "15:00",
          end_time: "16:00",
          duration: 60,
          status: "available",
        },

        {
          schedule_text: "วันที่ 08/11/2025 13:00-14:00",
          date: "08/11/2025",
          start_time: "13:00",
          end_time: "14:00",
          duration: 60,
          status: "booked",
        },

        {
          schedule_text: "วันที่ 28/11/2025 09:00-10:00",
          date: "28/11/2025",
          start_time: "09:00",
          end_time: "10:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "วันที่ 28/11/2025 14:00-15:00",
          date: "28/11/2025",
          start_time: "14:00",
          end_time: "15:00",
          duration: 60,
          status: "booked",
        },

        {
          schedule_text: "วันที่ 29/11/2025 10:00-11:00",
          date: "29/11/2025",
          start_time: "10:00",
          end_time: "11:00",
          duration: 60,
          status: "available",
        },
        {
          schedule_text: "วันที่ 29/11/2025 13:00-14:00",
          date: "29/11/2025",
          start_time: "13:00",
          end_time: "14:00",
          duration: 60,
          status: "available",
        },

        {
          schedule_text: "วันที่ 30/11/2025 08:00-09:00",
          date: "30/11/2025",
          start_time: "08:00",
          end_time: "09:00",
          duration: 60,
          status: "booked",
        },
        {
          schedule_text: "วันที่ 30/11/2025 10:00-11:00",
          date: "30/11/2025",
          start_time: "10:00",
          end_time: "11:00",
          duration: 60,
          status: "available",
        },
      ],
    },
    {
      schedule_id: "SCH002",
      doctor_id: "D002",
      slots: [
        {
          schedule_text: "วันที่ 01/11/2025 10:00-12:00",
          date: "01/11/2025",
          start_time: "10:00",
          end_time: "12:00",
          duration: 120,
          status: "available",
        },

        {
          schedule_text: "วันที่ 02/11/2025 09:00-10:00",
          date: "02/11/2025",
          start_time: "09:00",
          end_time: "10:00",
          duration: 60,
          status: "booked",
        },
        {
          schedule_text: "วันที่ 02/11/2025 13:00-14:30",
          date: "02/11/2025",
          start_time: "13:00",
          end_time: "14:30",
          duration: 90,
          status: "available",
        },

        {
          schedule_text: "วันที่ 03/11/2025 15:00-16:00",
          date: "03/11/2025",
          start_time: "15:00",
          end_time: "16:00",
          duration: 60,
          status: "available",
        },
      ],
    },
  ];

  const hospitalsData = [
    {
      hospital_name: "โรงพยาบาลบำรุงราษฎร์",
      hospital_id: "H001",
      city: "กรุงเทพมหานคร",
      map_location: "13.7460712,100.5478211,17z",
      lat: 13.7460712,
      lng: 100.5478211,
    },
    {
      hospital_name: "โรงพยาบาลสมิติเวช",
      hospital_id: "H002",
      city: "กรุงเทพมหานคร",
      map_location: "13.8577808,100.5422968,12z",
      lat: 13.8577808,
      lng: 100.5422968,
    },
    {
      hospital_name: "โรงพยาบาลกรุงเทพ",
      hospital_id: "H003",
      city: "กรุงเทพมหานคร",
      map_location: "13.7495071,100.5810116,17z",
      lat: 13.7495071,
      lng: 100.5810116,
    },
    {
      hospital_name: "โรงพยาบาลมหาราชนครเชียงใหม่",
      hospital_id: "H004",
      city: "เชียงใหม่",
      map_location: "18.7961432,98.9792633,15z",
      lat: 18.7961432,
      lng: 98.9792633,
    },
    {
      hospital_name: "โรงพยาบาลวชิระภูเก็ต",
      hospital_id: "H005",
      city: "ภูเก็ต",
      map_location: "7.8804475,98.3923186,15z",
      lat: 7.8804475,
      lng: 98.3923186,
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

  const PackageData = [
    {
      package_id: "P001",
      package_name: "ตรวจสุขภาพทั่วไป",
      price: 1500,
      Description: "ตรวจสุขภาพทั่วไป",
    },
    {
      package_id: "P002",
      package_name: "ตรวจสุขภาพสตรี",
      price: 2500,
      Description: "ตรวจสุขภาพสำหรับผู้หญิง",
    },
    {
      package_id: "P003",
      package_name: "ตรวจสุขภาพหัวใจ",
      price: 3000,
      Description: "ตรวจสุขภาพหัวใจโดยเฉพาะ",
    },
    {
      package_id: "P004",
      package_name: "ตรวจสุขภาพเบาหวาน",
      price: 2000,
      Description: "ตรวจสุขภาพสำหรับผู้ป่วยเบาหวาน",
    },
    {
      package_id: "P005",
      package_name: "ตรวจสุขภาพเด็ก",
      price: 1800,
      Description: "ตรวจสุขภาพสำหรับเด็ก",
    },
    {
      package_id: "P006",
      package_name: "ตรวจสุขภาพผู้สูงอายุ",
      price: 2200,
      Description: "ตรวจสุขภาพสำหรับผู้สูงอายุ",
    },
    {
      package_id: "P007",
      package_name: "ตรวจสุขภาพตับ",
      price: 2800,
      Description: "ตรวจสุขภาพตับโดยเฉพาะ",
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

export const fetchPackages = async () => {
  await delay();
  return DoctorsScheduleData.packages;
};
export default DoctorsScheduleData;
