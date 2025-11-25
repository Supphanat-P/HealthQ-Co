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
      <AppointmentHeader label={lang === "TH" ? "ข้อมูลส่วนตัว" : "Personal Info"} lang={lang} />

      <ProfileCard lang={lang} />

      <AppointmentHeader label={"ประวัติการนัดหมาย"} lang={lang} />
      <AppointmentHistory />
    </>
  );
};

export default Profile;
