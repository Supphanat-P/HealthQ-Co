import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import {
  fetchSpecialties,
  fetchDoctors,
  fetchHospitals,
  fetchAppointmentsByUser,
  fetchUsersInfo,
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

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
    if (!currentUser) return;

    toast.promise(
      (async () => {
        const [
          specialtiesData,
          doctorsData,
          hospitalsData,
          appointmentsData,
          usersInfoData,
        ] = await Promise.all([
          fetchSpecialties(),
          fetchDoctors(),
          fetchHospitals(),
          fetchAppointmentsByUser(currentUser),
          fetchUsersInfo(),
        ]);

        setSpecialties(specialtiesData);
        setDoctors(doctorsData);
        setHospitals(hospitalsData);
        setAppointments(appointmentsData);
        setUsersInfo(usersInfoData);
      })(),
      {
        loading: "กำลังโหลดข้อมูล...",
        success: "โหลดสำเร็จ",
        error: "โหลดล้มเหลว",
      },
    );
  };

  useEffect(() => {
    fetchAndSetData();
  }, [currentUser]);

  return (
    <DataContext.Provider
      value={{
        specialties,
        doctors,
        hospitals,
        appointments,
        usersInfo,
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
