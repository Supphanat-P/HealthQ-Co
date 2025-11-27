import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { supabase } from "../config/supabaseClient";
import {
  fetchSpecialties,
  fetchDoctors,
  fetchHospitals,
  fetchAppointments,
  fetchUsersInfo,
  fetchSymptomsList,
  createAppointment,
  sendOtpForRegistration,
  createUserAccount,
  login as loginFromFetchData,
  updateUserInfo,
  sendEmailForApprove,
  sendEmailForCancel
} from "./FetchData";
import toast from "react-hot-toast";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [symptomsListData, setSymptomsListData] = useState([]);
  const [error, setError] = useState(null);
  const [usersInfo, setUsersInfo] = useState([]);

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || "";
    } catch (err) {
      return "";
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (err) {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const user = await loginFromFetchData(email, password);

      const simulatedToken = "custom_auth_token_" + user.user_id;

      setToken(simulatedToken);
      setCurrentUser(user);
      localStorage.setItem("token", simulatedToken);
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken("");
    setCurrentUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) { }
  };

  const fetchAndSetData = async () => {
    toast.promise(
      (async () => {
        const specialtiesData = await fetchSpecialties();
        const doctorsData = await fetchDoctors();
        const hospitalsData = await fetchHospitals();
        const appointmentsData = await fetchAppointments();
        const usersInfoData = await fetchUsersInfo();
        const symptomsListData = await fetchSymptomsList();

        const formattedDoctors = doctorsData.map(doctor => {
          const specialty = specialtiesData.find(s => s.specialty_id === doctor.specialty_id);
          const hospital = hospitalsData.find(h => h.hospital_id === doctor.hospital_id);
          return { ...doctor, specialty, hospital };
        });

        const formattedAppointmentsData = appointmentsData.map((appointment) => {
          const user = usersInfoData.find((u) => u.user_id === appointment.user_id);
          const doctor = formattedDoctors.find((d) => d.doctor_id === appointment.doctor_id);
          return { ...appointment, user, doctor };
        });

        setDoctors(formattedDoctors);
        setSpecialties(specialtiesData);
        setHospitals(hospitalsData);
        setAppointments(formattedAppointmentsData);
        setUsersInfo(usersInfoData);
        setSymptomsListData(symptomsListData);
      })(),
      {
        id: "fetch-data-toast",
        loading: "กำลังโหลดข้อมูล...",
        success: <b>โหลดข้อมูลสำเร็จ!</b>,
        error: <b>โหลดข้อมูลล้มเหลว</b>,
      }
    );
  };
  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        specialties,
        doctors,
        hospitals,
        appointments,
        setAppointments,
        usersInfo,
        setUsersInfo,
        token,
        currentUser,
        isLogin: !!token,
        login,
        logout,
        searchData,
        error,
        symptomsListData,
        createAppointment,
        sendOtpForRegistration,
        createUserAccount,
        updateUserInfo,
        fetchAndSetData,
        sendEmailForApprove,
        sendEmailForCancel
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export { DataContext };
export default DataContext;
