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
  fetchAppointments,
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsByUser, setAppointmentsByUser] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const [usersInfoByUserId, setUsersInfoByUserId] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      return {
        id: jwtDecode(token)?.userId,
        role: jwtDecode(token)?.roleId == 1 ? "admin" : "user",
      };
    } catch {
      return null;
    }
  });

  const fetchAndSetData = async (userId) => {
    try {
      toast.loading("กำลังโหลดข้อมูล...", { id: "fetchData" });

      setUsersInfoByUserId(null);
      setAppointments([]);

      const specialtiesData = await fetchSpecialties();
      const doctorsData = await fetchDoctors();
      const hospitalsData = await fetchHospitals();
      const appointmentsData = await fetchAppointments();

      const appointmentsByUserData = userId
        ? await fetchAppointmentsByUser(userId)
        : [];

      const usersInfoData = await fetchUsersInfo();

      const usersInfoByUserIdData = userId
        ? await fetchUsersInfoByUserId(userId)
        : null;

      setSpecialties(specialtiesData);
      setDoctors(doctorsData);
      setHospitals(hospitalsData);
      setAppointmentsByUser(appointmentsByUserData);
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
    fetchAndSetData(currentUser?.id);
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      fetchAndSetData(currentUser.id);
    }
  }, [currentUser]);

  return (
    <DataContext.Provider
      value={{
        specialties,
        doctors,
        hospitals,
        appointmentsByUser,
        appointments,
        setAppointments,
        usersInfo,
        usersInfoByUserId,
        currentUser,
        setCurrentUser,
        token,
        setToken,
        isLogin: !!token,
        fetchAndSetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
