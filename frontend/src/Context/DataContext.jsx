import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import {
  fetchSpecialties,
  fetchDoctors,
  fetchHospitals,
  fetchAppointmentsByUser,
  fetchUsersInfo,
  fetchUsersInfoByUserId,
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [usersInfoByUserId, setUsersInfoByUserId] = useState([]);

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const decoded = jwtDecode(token);
      return decoded?.id || null;
    } catch {
      return null;
    }
  });

  const fetchAndSetData = async () => {
    try {
      toast.loading("กำลังโหลดข้อมูล...", { id: "fetchData" });

      const specialtiesData = await fetchSpecialties();

      const doctorsData = await fetchDoctors();

      const hospitalsData = await fetchHospitals();

      const appointmentsData = currentUser
        ? await fetchAppointmentsByUser(currentUser)
        : [];

      const usersInfoData = await fetchUsersInfo();

      const usersInfoByUserIdData = currentUser
        ? await fetchUsersInfoByUserId(currentUser)
        : null;

      setSpecialties(specialtiesData);
      setDoctors(doctorsData);
      setHospitals(hospitalsData);
      setAppointments(appointmentsData);
      setUsersInfo(usersInfoData);
      setUsersInfoByUserId(usersInfoByUserIdData);

      toast.success("โหลดสำเร็จ", { id: "fetchData" });
    } catch (error) {
      console.error("❌ Fetch error:", error);
      toast.error("โหลดล้มเหลว", { id: "fetchData" });
    }
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
        usersInfo,
        usersInfoByUserId,
        currentUser,
        token,
        isLogin: !!token,
        fetchAndSetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
