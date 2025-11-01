import React, { use, useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import DoctorCard from "../../components/AppointmentComponents/DoctorCard";
import DoctorFilter from "../../components/AppointmentComponents/DoctorFilter";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

const DoctorSearch = () => {
  const { doctors, specialties, hospitals, doctorsSchedule } =
    useContext(DataContext);

  const [filteredDoctors, setFilteredDoctors] = useState(doctors || []);
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  ///pageination
  const [currpage, setCurrpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  ///Log
  useEffect(() => {
    let formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");
    console.log("Formatted Date:", formattedDate);
  }, [selectedSpecialty, selectedHospital, selectedDate]);

  ///Map
  useEffect(() => {
    let filteredDoctors = (doctors || []).slice();
    console.log(selectedSpecialty, selectedHospital, selectedDate);





    setFilteredDoctors(filteredDoctors);
    setCurrpage(1);
    console.log("Filtered Doctors:", filteredDoctors);
  }, [doctors, selectedSpecialty, selectedHospital, selectedDate]);

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

          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.doctor_id} doctor={doctor} />
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
