import React, { use, useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { DataContext } from "../../../Context/DataContext";
import DoctorCard from "../../../components/DoctorSearch/DoctorCard";
import DoctorFilter from "../../../components/DoctorSearch/DoctorFilter";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

const DoctorSearch = () => {
  const { doctors, specialties, hospitals } =
    useContext(DataContext);

  const location = useLocation();

  const [filteredDoctors, setFilteredDoctors] = useState(doctors || []);
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (location && location.state) {
      const { selectedSpecialty: initSpec, selectedHospital: initHosp } =
        location.state;
      if (initSpec) setSelectedSpecialty(initSpec);
      if (initHosp) setSelectedHospital(initHosp);
    }
  }, [location]);

  ///pageination
  const [currpage, setCurrpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  ///Map
  useEffect(() => {
    let filteredDoctors = (doctors || []).slice();

    if (selectedDoctor) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.doctor_id === selectedDoctor
      );
    }
    if (selectedHospital) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.hospital.hospital_name === selectedHospital
      );
    }

    if (selectedSpecialty) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.specialty.specialty_name === selectedSpecialty
      );
    }

    // filteredDoctors = filteredDoctors.sort((a, b) => {
    //   const aRec = !!a.recommended;
    //   const bRec = !!b.recommended;
    //   if (aRec !== bRec) return aRec ? -1 : 1;
    //   return 0;
    // });

    setFilteredDoctors(filteredDoctors);
    setCurrpage(1);
  }, [
    doctors,
    selectedSpecialty,
    selectedHospital,
    selectedDate,
    selectedDoctor,
  ]);

  ///Pagination

  useEffect(() => {
    const i = (currpage - 1) * itemsPerPage;
    const paginatedDoctors = (filteredDoctors || []).slice(i, i + itemsPerPage);
    setDisplayedDoctors(paginatedDoctors);
    setTotalPages(Math.ceil((filteredDoctors || []).length / itemsPerPage));
    if (currpage > totalPages && totalPages > 0) {
      setCurrpage(totalPages);
    }
  }, [currpage, filteredDoctors, itemsPerPage]);

  return (
    <>
      <div className="container">
        <DoctorFilter
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          selectedHospital={selectedHospital}
          setSelectedHospital={setSelectedHospital}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <hr />

        <div className="d-flex gap-4 flex-wrap justify-content-center">
          {(filteredDoctors || []).length === 0 && (
            <div className="text-center text-danger mt-5">
              ไม่ข้อมูลพบแพทย์ ❌
            </div>
          )}

          {displayedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.doctor_id}
              doctor={doctor}
              selectedDate={selectedDate}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-5 mb-3 align-content-center">
          <Button
            className="align-content-center bg-navy border-0"
            onClick={() => {
              if (currpage > 1) {
                setCurrpage((p) => p - 1);
              }
            }}
          >
            <i className="bi bi-chevron-left" />
          </Button>

          <span className="align-content-center ms-3 me-3">
            {currpage} / {totalPages}
          </span>

          <Button
            className="align-content-center bg-navy border-0"
            onClick={() => {
              if (currpage < totalPages) {
                setCurrpage((p) => p + 1);
              }
            }}
          >
            <i className="bi bi-chevron-right" />
          </Button>
        </div>
        <hr />
      </div>
    </>
  );
};
export default DoctorSearch;
