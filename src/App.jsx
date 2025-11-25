import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "TH";
  });

  const updateLang = (value) => {
    setLang(value);
    localStorage.setItem("lang", value);
  };
  
  const hiddenPaths = [
    "/login",
    "/register",
    "/admindashboard",
    "/adminappointments",
    "/adminpatients",
  ];

  const showChatbot = !hiddenPaths.includes(location.pathname.toLowerCase());

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-danger mt-5">❌ {error}</div>;

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
      <LocationCompare />
      <NavigateBar lang={lang} setLang={updateLang} />
      {showChatbot && <Chatbot />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment lang={lang} setLang={setLang} />} />
        <Route path="/doctorsearch" element={<DoctorSearch lang={lang} setLang={setLang} />} />
        <Route path="/doctorinfo" element={<Doctorinfo lang={lang} setLang={setLang} />} />
        <Route path="/showdata" element={<ShowData lang={lang} setLang={setLang} />} />
        <Route path="/admindoctorschedule" element={<AdminDoctorSchedule lang={lang} setLang={setLang} />} />
        <Route path="/appointments" element={<AppoitmentData lang={lang} setLang={setLang} />} />
        <Route path="/alldata" element={<AllDataDisplay lang={lang} setLang={setLang} />} />
        <Route path="/login" element={<Login lang={lang} setLang={setLang} />} />
        <Route path="/register" element={<Register lang={lang} setLang={setLang} />} />
        <Route path="/logout" element={<Logout lang={lang} setLang={setLang} />} />
        <Route path="/locationcompare" element={<LocationCompare lang={lang} setLang={setLang} />} />
        <Route path="/profile" element={<Profile lang={lang} setLang={setLang} />} />
        <Route path="/adminsidebar" element={<AdminSidebar lang={lang} setLang={setLang} />} />
        <Route path="/admindashboard" element={<AdminDashboard lang={lang} setLang={setLang} />} />
        <Route path="/adminappointments" element={<AdminAppointments lang={lang} setLang={setLang} />} />
        <Route path="/adminpatients" element={<AdminPatients lang={lang} setLang={setLang} />} />
        <Route path="*" element={<NotFound lang={lang} setLang={setLang} />} />
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