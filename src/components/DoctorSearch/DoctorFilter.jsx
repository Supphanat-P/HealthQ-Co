import React, { useEffect, useState, forwardRef } from "react";
import "./DoctorFilter.css";
import { MdOutlineClear } from "react-icons/md";
import PopupModal from "./PopupModal";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useData } from "../../Context/DataContext";
import { Autocomplete, TextField } from "@mui/material";
import { FileBadge, Hospital } from "lucide-react";

const DoctorFilter = ({
  selectedSearch,
  setSelectedSearch,
  selectedDoctor,
  setSelectedDoctor,
  selectedHospital,
  setSelectedHospital,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDate,
  setSelectedDate,
  closestHospital,
  lang,
}) => {
  const { specialties, hospitals, doctors, searchData } = useData();
  const [showSpecialtiesModal, setShowSpecialtiesModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const clearFilters = () => {
    setSelectedSpecialty(null);
    setSelectedHospital(null);
    setSelectedDate(null);
    setSelectedSearch(null);
    setSelectedDoctor(null);
  };
  const text = {
    findDT: lang === "TH" ? "ค้นหาเเพทย์" : "FIND A DOCTOR",
    allHos: lang === "TH" ? "โรงพยาบาลทั้งหมด" : "All hospitals",
    allspec: lang === "TH" ? "ความชำนาญแพทย์ทั้งหมด" : "All medical expertise",
    labeltext: lang === "TH" ? "ค้นหา (แพทย์ / โรงพยาบาล / ความเชี่ยวชาญ)" : "Search (doctor / hospital / specialty)",
    langFil: lang === "TH" ? "ตัวกรอง" : "filters",
  }
  const options = (searchData || []).map((option) => ({
    id: option.id,
    title: option.name,
    category: option.category,
  }));

  useEffect(() => {
    if (!selectedSearch) return;
    const cat = selectedSearch.category;
    if (cat === "แพทย์") setSelectedDoctor(selectedSearch.id);
    else if (cat === "โรงพยาบาล") setSelectedHospital(selectedSearch.title);
    else if (cat === "ความชำนาญ") setSelectedSpecialty(selectedSearch.title);
  }, [selectedSearch]);

  const modalShow = (dataName) => {
    if (dataName === "hospitals") setShowHospitalsModal(true);
    else setShowSpecialtiesModal(true);
  };

  const toggleFilters = () => setFiltersOpen((state) => !state);
  const clearHospital = () => setSelectedHospital(null);
  const clearSpecialty = () => setSelectedSpecialty(null);
  const clearDateOnly = () => setSelectedDate(null);
  const clearDoctor = () => setSelectedDoctor(null);

  return (
    <>
      <h1 className="text-navy mt-3">{text.findDT}</h1>
      <div
        className="input-group shadow rounded-full!"
        style={{ borderRadius: "0 50px 50px 0" }}
      >
        <Autocomplete
          options={options}
          className="doctor-filter-input grow"
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px 0 0 50px",
              paddingRight: "9px !important",
            },
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          value={selectedSearch}
          onChange={(event, newValue) => setSelectedSearch(newValue)}
          renderInput={(params) => (
            < TextField
              {...params}
              label={text.labeltext}
              placeholder="พิมพ์ชื่อหรือเลือกจากรายการ"
            />
          )}
        />
        <button
          className="btn bg-navy text-white doctor-filter-input bg-navy"
          onClick={toggleFilters}
          aria-expanded={filtersOpen}
          aria-controls="filter-div"
          style={{ borderRadius: "0 50px 50px 0" }}
        >
          {text.langFil}
        </button>
      </div>

      <div
        className={`${filtersOpen ? "d-flex" : "d-none"
          } gap-4 mt-0 align-items-center`}
        id="filter-div"
      >
        <Button
          className="bg-navy border-0 d-flex text-white rounded-full! fs-6 mt-2 py-2 px-4 align-items-center bg-navy"
          aria-label="เลือกโรงพยาบาล"
          id="Hosp_Filter"
          onClick={() => modalShow("hospitals")}
        >
          <Hospital />
          &nbsp;
          {selectedHospital ? selectedHospital : text.allHos}
        </Button>
        <Button
          className="bg-navy d-flex border-0 text-white rounded-full! fs-6 mt-2 py-2 px-4 align-items-center bg-navy"
          aria-label="เลือกความชำนาญ"
          id="Spec_Filter"
          onClick={() => modalShow("specialties")}
        >
          <FileBadge />
          &nbsp;
          {selectedSpecialty ? selectedSpecialty : text.allspec}
        </Button>
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
          className="btn btn-danger h-fit fw-bold rounded-full! mt-2 align-items-center"
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
