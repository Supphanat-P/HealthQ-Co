import { UserRound, HeartPulse, Phone } from "lucide-react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";
import AppointmentHistory from "../components/Profile/AppointmentHistory";
import ProfileCard from "../components/Profile/ProfileCard";
import { useState } from "react";
import { useData } from "../Context/DataContext";
import { Navigate } from "react-router-dom";

const Profile = ({ lang }) => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { isLogin } = useData();
  if (isLogin === false) {
    return (Navigate({ to: "/login" }));
  }
  return (
    <>
      <AppointmentHeader label={lang === "TH" ? "ข้อมูลส่วนตัว" : "PERSONAL INFO"} lang={lang} />

      <ProfileCard lang={lang} />

      <AppointmentHeader label={lang === "TH" ? "ประวัติการนัดหมาย" : "APPOINTMENT HISTORY"} lang={lang} />
      <AppointmentHistory lang={lang}/>
    </>
  );
};

export default Profile;
