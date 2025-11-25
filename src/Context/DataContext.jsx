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
  updateUserInfo
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [symptomsListData, setSymptomsListData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const specialtiesData = await fetchSpecialties();
        const doctorsData = await fetchDoctors();
        const hospitalsData = await fetchHospitals();
        const appointmentsData = await fetchAppointments();
        const usersInfoData = await fetchUsersInfo();
        const symptomsListData = await fetchSymptomsList();

        const formattedDoctors = (doctorsData || []).map(doctor => {
          const specialty = (specialtiesData || []).find(s => s.specialty_id === doctor.specialty_id);
          const hospital = (hospitalsData || []).find(h => h.hospital_id === doctor.hospital_id);
          return { ...doctor, specialty, hospital };
        });

        const symptomsWithSpecialties = (symptomsListData || []).map(symptom => {
          const specialty = (specialtiesData || []).find(s => s.specialty_id === symptom.specialty_id);
          return { ...symptom, specialties: specialty ? [specialty] : [] };
        });

        const searchData = (doctorsData || [])
          .map((doctor) => ({
            id: doctor.doctor_id,
            name: doctor.doctor_name,
            category: "Doctor",
          }))
          .concat(
            (hospitalsData || []).map((hospital) => ({
              id: hospital.hospital_id,
              name: hospital.hospital_name,
              category: "Hospital",
            }))
          )
          .concat(
            (specialtiesData || []).map((specialty) => ({
              id: specialty.specialty_id,
              name: specialty.specialty_name,
              category: "Specialty",
            }))
          );

        const formattedappointmentsData = appointmentsData.map((appointment) => {
          const user = (usersInfoData || []).find((u) => u.user_id === appointment.user_id);
          const doctor = (doctorsData || []).find((d) => d.doctor_id === appointment.doctor_id);
          return {
            ...appointment,
            user,
            doctor,
          };
        });

        setDoctors(formattedDoctors);
        setSpecialties(specialtiesData || []);
        setHospitals(hospitalsData || []);
        setAppointments(formattedappointmentsData || []);
        setUsersInfo(usersInfoData || []);
        setSearchData(searchData);
        setSymptomsListData(symptomsWithSpecialties);
        setError(null);
      } catch (err) {
        console.warn("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
        loading,
        error,
        symptomsListData,
        createAppointment,
        sendOtpForRegistration,
        createUserAccount,
        updateUserInfo
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export { DataContext };
export default DataContext;
