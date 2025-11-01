import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider, useData, DataContext } from "./Context/DataContext";
import NavigateBar from "./components/Shared/NavigateBar";
import Loading from "./components/Shared/Loading";
import AppointmentTime from "./Pages/Appointment/AppointmentTime";
import Appointment from "./Pages/Appointment/Appointment";
import DoctorSearch from "./Pages/Appointment/DoctorSearch";
import PatientInformation from "./Pages/Appointment/PatientInformation";
import AppointmentInfomation from "./Pages/Appointment/AppointmentInfomation";
import Doctorinfo from "./Pages/Home/Doctorinfo";
import Home from "./Pages/Home/Home";
import ShowData from "./Pages/Adminstrator/ShowData";

function AppContent() {
  const { loading, error } = useData();

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-danger mt-5">❌ {error}</div>;

  return (
    <>
      <NavigateBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointmenttime" element={<AppointmentTime />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctorSearch" element={<DoctorSearch />} />
        <Route path="/patientinfo" element={<PatientInformation />} />
        <Route path="/appointmentinfo" element={<AppointmentInfomation />} />
        <Route path="/doctorinfo" element={<Doctorinfo />} />
        <Route path="/showdata" element={<ShowData />} />
        <Route path="*" element={<div>404 Not Found</div>} />
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
