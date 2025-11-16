import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  fetchSpecialties,
  fetchDoctors,
  fetchHospitals,
  fetchDoctorsScheduleData,
  fetchAppointments,
  fetchUsersInfo,
  fetchUsersCredentials,
  fetchSymptomsList,
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctorsSchedule, setDoctorsSchedule] = useState([]);
  const [packages, setPackages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [symptomsListData, setSymptomsListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersInfo, setUsersInfo] = useState([]);
  const [usersCredentials, setUsersCredentials] = useState([]);

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

  const login = (newToken, user) => {
    setToken(newToken);
    setCurrentUser(user || null);
    try {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(user || null));
    } catch (err) {}
  };

  const logout = () => {
    setToken("");
    setCurrentUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {}
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const specialtiesData = await fetchSpecialties();
        const doctorsData = await fetchDoctors();
        const hospitalsData = await fetchHospitals();
        const doctorsScheduleData = await fetchDoctorsScheduleData();
        const appointmentsData = await fetchAppointments();
        const usersInfoData = await fetchUsersInfo();
        const usersCredentialsData = await fetchUsersCredentials();
        const symptomsListData = await fetchSymptomsList();

        const formattedDoctorsData = doctorsData.map((doctor) => {
          const specialty = specialtiesData.find(
            (spec) => spec.specialty_id === doctor.specialty_id
          );
          const hospital = hospitalsData.find(
            (hosp) => hosp.hospital_id === doctor.hospital_id
          );
          const hospitalImage = hospitalsData.find(
            (hosp) => hosp.hospital_id === doctor.hospital_id
          )?.imgPath;

          const scheduleInfo = doctorsScheduleData.find(
            (schedule) => schedule.doctor_id === doctor.doctor_id
          );

          const all_dates = (scheduleInfo?.slots || [])
            .filter((slot) => slot && slot.date)
            .map((slot) => dayjs(slot.date).format("YYYY-MM-DD"));

          const available_dates = (scheduleInfo?.slots || [])
            .filter((slot) => slot && slot.date && slot.status === "available")
            .map((slot) => dayjs(slot.date).format("YYYY-MM-DD"));

          const booked_dates = (scheduleInfo?.booked_slots || [])
            .filter((slot) => slot && slot.date && slot.status === "booked")
            .map((slot) => dayjs(slot.date).format("YYYY-MM-DD"));

          return {
            ...doctor,
            specialty_name: specialty ? specialty.specialty_name : "",
            hospital_name: hospital ? hospital.hospital_name : "",
            hospital_img: hospitalImage || "",
            all_dates,
            available_dates,
            booked_dates,
          };
        });

        const formattedUsersInfo = usersInfoData.map((user) => {
          const credential = usersCredentialsData.find(
            (cred) => cred.user_id === user.user_id
          );
          return {
            ...user,
            username: credential ? credential.username : "",
            password: credential ? credential.password : "",
          };
        });

        const formattedSymptomsList = symptomsListData.map((item) => ({
          specialty_name:
            specialtiesData.find(
              (spec) => spec.specialty_id === item.specialty_id
            )?.specialty_name || "",
          ...item,
        }));

        const searchData = doctorsData
          .map((doctor) => ({
            id: doctor.doctor_id,
            name: doctor.doctor_name,
            category: "Doctor",
          }))
          .concat(
            hospitalsData.map((hospital) => ({
              id: hospital.hospital_id,
              name: hospital.hospital_name,
              category: "Hospital",
            }))
          )
          .concat(
            specialtiesData.map((specialty) => ({
              id: specialty.specialty_id,
              name: specialty.specialty_name,
              category: "Specialty",
            }))
          );

        setDoctors(formattedDoctorsData);
        setSpecialties(specialtiesData);
        setHospitals(hospitalsData);
        setDoctorsSchedule(doctorsScheduleData);
        setAppointments(appointmentsData || []);
        setUsersCredentials(usersCredentialsData || []);
        setUsersInfo(formattedUsersInfo || []);
        setSearchData(searchData);
        setSymptomsListData(formattedSymptomsList || []);
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
        doctorsSchedule,
        setDoctorsSchedule,
        appointments,
        setAppointments,
        usersInfo,
        setUsersInfo,
        usersCredentials,
        token,
        currentUser,
        isLogin: !!token, //isAuthenticated
        login,
        logout,
        searchData,
        loading,
        error,
        symptomsListData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export { DataContext };
export default DataContext;
