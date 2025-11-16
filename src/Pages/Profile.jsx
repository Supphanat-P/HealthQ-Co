import { UserRound, HeartPulse, Phone } from "lucide-react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";
import AppointmentHistory from "../components/Profile/AppointmentHistory";
import ProfileCard from "../components/Profile/ProfileCard";
import { useState } from "react";
const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  return (
    <>
      <AppointmentHeader label={"ข้อมูลผู้ใช้"} />

      <ProfileCard />

      <AppointmentHeader label={"ประวัติการนัดหมาย"} />
      <AppointmentHistory />
    </>
  );
};

export default Profile;
