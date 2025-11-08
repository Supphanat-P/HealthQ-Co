import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchSpecialties,
  fetchDoctors,
  fetchHospitals,
  fetchDoctorsScheduleData,
  fetchPackages,
} from "./FetchData";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctorsSchedule, setDoctorsSchedule] = useState([]);
  const [packages, setPackages] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // const [specialtiesData, doctorsData, hospitalsData] = await Promise.all(
        //   [
        //     fetch(
        //       "https://api.mockfly.dev/mocks/11c913fd-7c34-428e-bf17-5fddcecbc0b4/Specialties"
        //     ),
        //     fetch(
        //       "https://api.mockfly.dev/mocks/11c913fd-7c34-428e-bf17-5fddcecbc0b4/Doctors"
        //     ),
        //     fetch(
        //       "https://api.mockfly.dev/mocks/11c913fd-7c34-428e-bf17-5fddcecbc0b4/Hospitals"
        //     ),
        //   ]
        // );

        const specialtiesData = await fetchSpecialties();
        const doctorsData = await fetchDoctors();
        const hospitalsData = await fetchHospitals();
        const doctorsScheduleData = await fetchDoctorsScheduleData();
        const packagesData = await fetchPackages();

        const formattedDoctorsData = doctorsData.map((doctor) => {
          const specialty = specialtiesData.find(
            (spec) => spec.specialty_id === doctor.specialty_id
          );
          const hospital = hospitalsData.find(
            (hosp) => hosp.hospital_id === doctor.hospital_id
          );

          const scheduleInfo = doctorsScheduleData.find(
            (schedule) => schedule.doctor_id === doctor.doctor_id
          );

          const all_dates = (scheduleInfo?.slots || [])
            .filter((slot) => slot && slot.date)
            .map((slot) => slot.date);

          const available_dates = (scheduleInfo?.slots || [])
            .filter((slot) => slot && slot.date && slot.status === "available")
            .map((slot) => slot.date);

          const booked_dates = (scheduleInfo?.booked_slots || [])
            .filter((slot) => slot && slot.date && slot.status === "booked")
            .map((slot) => slot.date);

          return {
            ...doctor,
            specialty_name: specialty ? specialty.specialty_name : "",
            hospital_name: hospital ? hospital.hospital_name : "",
            all_dates,
            available_dates,
            booked_dates,
          };
        });

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
        setPackages(packagesData);
        setSearchData(searchData);
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
        packages,
        searchData,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export { DataContext };
export default DataContext;
