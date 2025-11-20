import React, { useEffect, useState, forwardRef } from "react";
import DatePicker from "../Shared/DatePickerTh";
import "./DoctorFilter.css";
import { MdOutlineClear } from "react-icons/md";
import PopupModal from "./PopupModal";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useData } from "../../Context/DataContext";
import { Autocomplete, TextField } from "@mui/material";
const DoctorFilter = ({
  selectedDoctor,
  setSelectedDoctor,
  selectedHospital,
  setSelectedHospital,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDate,
  setSelectedDate,
  closestHospital,
}) => {
  const { specialties, hospitals, doctors, searchData } = useData();
  const [showSpecialtiesModal, setShowSpecialtiesModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const clearFilters = () => {
    setSelectedSpecialty(null);
    setSelectedHospital(null);
    setSelectedDate(null);
    setSelectedSearch(null);
    setSelectedDoctor(null);
  };
  const options = (searchData || []).map((option) => ({
    id: option.id,
    title: option.name,
    category: option.category,
  }));
  useEffect(() => {
    if (!selectedSearch) return;
    const cat = selectedSearch.category;
    if (cat === "Doctor") setSelectedDoctor(selectedSearch.id);
    else if (cat === "Hospital") setSelectedHospital(selectedSearch.title);
    else if (cat === "Specialty") setSelectedSpecialty(selectedSearch.title);
  }, [selectedSearch]);
  const modalShow = (dataName) => {
    if (dataName === "hospitals") setShowHospitalsModal(true);
    else setShowSpecialtiesModal(true);
  };
  const DateButton = forwardRef(({ value, onClick, className }, ref) => (
    <button
      type="button"
      className={
        (className || "") +
        " btn border border-navy text-navy rounded fs-6 mt-2 p-2 d-flex align-items-center justify-content-center"
      }
      onClick={onClick}
      ref={ref}
      style={{ minWidth: "160px" }}
    >
      {value || "เลือกวันที่"}
    </button>
  ));

  const toggleFilters = () => setFiltersOpen((state) => !state);
  const clearHospital = () => setSelectedHospital(null);
  const clearSpecialty = () => setSelectedSpecialty(null);
  const clearDateOnly = () => setSelectedDate(null);
  const clearDoctor = () => setSelectedDoctor(null);
  return (
    <>
      <h1 className="text-navy mt-3">ค้นหาเเพทย์</h1>
      <div className="input-group shadow">
        <Autocomplete
          options={options}
          className="doctor-filter-input flex-grow-1"
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          sx={{ width: 300 }}
          value={selectedSearch}
          onChange={(event, newValue) => setSelectedSearch(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="ค้นหา (แพทย์ / โรงพยาบาล / ความเชี่ยวชาญ)"
              placeholder="พิมพ์ชื่อหรือเลือกจากรายการ"
            />
          )}
        />
        <button
          className="btn bg-navy text-white doctor-filter-input"
          onClick={toggleFilters}
          aria-expanded={filtersOpen}
          aria-controls="filter-div"
        >
          ตัวกรอง
        </button>
      </div>
      <div
        className={`${filtersOpen ? "d-flex" : "d-none"
          } gap-4 mt-0 align-items-center`}
        id="filter-div"
      >
        <Button
          className="bg-navy border-0 text-white rounded fs-6 mt-2 p-2 align-items-center"
          aria-label="เลือกโรงพยาบาล"
          id="Hosp_Filter"
          onClick={() => modalShow("hospitals")}
        >
          {selectedHospital ? selectedHospital : "โรงพยาบาลทั้งหมด"}
        </Button>
        <Button
          className="bg-navy border-0 text-white rounded fs-6 mt-2 p-2 align-items-center"
          aria-label="เลือกความชำนาญ"
          id="Spec_Filter"
          onClick={() => modalShow("specialties")}
        >
          {selectedSpecialty ? selectedSpecialty : "ความชำนาญแพทย์ทั้งหมด"}
        </Button>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          customInput={<DateButton className="example-custom-input" />}
          minDate={new Date()}
          selected={
            selectedDate ? dayjs(selectedDate, "YYYY-MM-DD").toDate() : null
          }
          onChange={(date) => setSelectedDate(dayjs(date).format("YYYY-MM-DD"))}
          filterDate={(date) => {
            const isoDate = dayjs(date).format("YYYY-MM-DD");
            const isAvailable = doctors.some(
              (doctor) =>
                Array.isArray(doctor.available_dates) &&
                doctor.available_dates.includes(isoDate)
            );
            return isAvailable;
          }}
        />
        <div
          role="separator"
          aria-orientation="vertical"
          className="mx-2"
          style={{
            width: "1px",
            height: "36px",
            backgroundColor: "#dee2e6",
            opacity: "1",
          }}
        />
        <button
          type="button"
          className="btn btn-danger h-fit fw-bold rounded mt-2 align-items-center"
          aria-label="ล้างตัวกรองทั้งหมด"
          title="ล้างตัวกรองทั้งหมด"
          onClick={clearFilters}
        >
          <MdOutlineClear />
        </button>
      </div>
      <div className="mt-2 d-flex gap-2 align-items-center flex-wrap">
        {selectedHospital && (
          <div className="badge bg-light border d-inline-flex align-items-center">
            <span className="text-navy me-2">{selectedHospital}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearHospital}
              aria-label="ล้างโรงพยาบาล"
            >
              ×
            </button>
          </div>
        )}
        {selectedSpecialty && (
          <div className="badge bg-light border d-inline-flex align-items-center">
            <span className="text-navy me-2">{selectedSpecialty}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearSpecialty}
              aria-label="ล้างความชำนาญ"
            >
              ×
            </button>
          </div>
        )}
        {selectedDate && (
          <div className="badge bg-light border d-inline-flex align-items-center">
            <span className="text-navy me-2">
              {dayjs(selectedDate).locale("th").format("DD/MM/YYYY")}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearDateOnly}
              aria-label="ล้างวันที่"
            >
              ×
            </button>
          </div>
        )}
        {selectedDoctor && (
          <div className="badge bg-light border d-inline-flex align-items-center">
            <span className="text-navy me-2">
              {doctors.find((d) => d.doctor_id === selectedDoctor)?.doctor_name}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearDoctor}
              aria-label="ล้างแพทย์"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <PopupModal
        label={"เลือกโรงพยาบาล"}
        name={"hospitals"}
        show={showHospitalsModal}
        onClose={() => setShowHospitalsModal(false)}
        onSelect={setSelectedHospital}
        dataName={"hospitals"}
      />
      <PopupModal
        label={"เลือกความชำนาญ"}
        name={"specialties"}
        show={showSpecialtiesModal}
        onClose={() => setShowSpecialtiesModal(false)}
        onSelect={setSelectedSpecialty}
        dataName={"specialties"}
      />
    </>
  );
};
export default DoctorFilter;
