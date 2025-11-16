import { UserRound, HeartPulse, Phone } from "lucide-react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";
import AppointmentHistory from "../components/Profile/AppointmentHistory";
import ProfileCard from "../components/Profile/ProfileCard";
import { useState } from "react";
import { useData } from "../Context/DataContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const {isLogin} = useData();
  if (isLogin === false) {
    return (Navigate({ to: "/login" }));
  }
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
