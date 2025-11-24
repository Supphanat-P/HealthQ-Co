import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // 1. เพิ่ม useLocation ตรงนี้
} from "react-router-dom";
import { DataProvider, useData } from "./Context/DataContext";
import NavigateBar from "./components/Shared/NavigateBar";
import Loading from "./components/Shared/Loading";
import DoctorSearch from "./Pages/Home/Appointment/DoctorSearch";
import Doctorinfo from "./Pages/Home/Doctorinfo";
import Home from "./Pages/Home/Home";
import ShowData from "./Pages/Adminstrator/ShowData";
import AppoitmentData from "./Pages/Adminstrator/AppointmentData";
import AllDataDisplay from "./Pages/AllDataDisplay";
import Login from "./Pages/Home/Login/Login";
import NotFound from "./Pages/404";
import Logout from "./Pages/Home/Login/Logout";
import Appointment from "./Pages/Home/Appointment/Appointment";
import AdminDoctorSchedule from "./Pages/Adminstrator/AdminDoctorSchedule";
import LocationCompare from "./components/Shared/LocationCompare";
import Profile from "./Pages/Profile";
import Register from "./Pages/Home/Login/Register";
import { Toaster } from "react-hot-toast";
import Chatbot from "./components/Chatbot/Chatbot";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAppointments from "./components/Admin/AdminAppointments";
import AdminPatients from "./components/Admin/AdminPatients";

function AppContent() {
  const { loading, error } = useData();
  const location = useLocation(); // 2. เรียกใช้ hook เพื่อดึง path ปัจจุบัน

  // 3. กำหนด path ที่ "ไม่ต้องการ" ให้โชว์ Chatbot
  const hiddenPaths = [
    "/login",
    "/register",
    "/admindashboard",
    "/adminappointments",
    "/adminpatients",
  ];

  // เช็คว่า path ปัจจุบันอยู่ในรายการที่ต้องซ่อนไหม
  const showChatbot = !hiddenPaths.includes(location.pathname.toLowerCase());

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-danger mt-5">❌ {error}</div>;

  return (
    <>
      <Toaster />
      <LocationCompare />
      <NavigateBar />
      
      {/* 4. แสดงผลแบบมีเงื่อนไข */}
      {showChatbot && <Chatbot />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctorsearch" element={<DoctorSearch />} />
        <Route path="/doctorinfo" element={<Doctorinfo />} />
        <Route path="/showdata" element={<ShowData />} />
        <Route path="/admindoctorschedule" element={<AdminDoctorSchedule />} />
        <Route path="/appointments" element={<AppoitmentData />} />
        <Route path="/alldata" element={<AllDataDisplay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/locationcompare" element={<LocationCompare />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminappointments" element={<AdminAppointments />} />
        <Route path="/adminpatients" element={<AdminPatients />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;