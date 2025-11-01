import React, { useEffect, useState, forwardRef, useContext } from "react";
import DatePicker from "../Shared/DatePickerTh";
import { MdOutlineClear } from "react-icons/md";
import PopupModal from "./PopupModal";
import { Button } from "react-bootstrap";
import DataContext from "../../Context/DataContext";
const DoctorFilter = ({
  selectedHospital,
  setSelectedHospital,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDate,
  setSelectedDate,
}) => {
  const { specialties, hospitals } = useContext(DataContext);
  const [showSpecialtiesModal, setShowSpecialtiesModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);

  const clearFilters = () => {
    setSelectedSpecialty(null);
    setSelectedHospital(null);
    setSelectedDate(null);
  };

  ///Modal
  const modalShow = (dataName) => {
    if (dataName === "hospitals") {
      setShowHospitalsModal(true);
    } else {
      setShowSpecialtiesModal(true);
    }
  };
  ///Date
  const DateButton = forwardRef(({ value, onClick, className }, ref) => (
    <button
      type="button"
      className={
        (className || "") +
        " btn border-1 border-navy text-navy rounded fs-6 mt-2 p-2 d-flex align-items-center justify-content-center"
      }
      onClick={onClick}
      ref={ref}
      style={{ minWidth: "160px" }}
    >
      {value || "เลือกวันที่"}
    </button>
  ));

  ///Hide div
  const filterDiv = () => {
    const filterDiv = document.getElementById("filter-div");
    if (filterDiv.classList.contains("d-none")) {
      filterDiv.classList.remove("d-none");
      filterDiv.classList.add("d-flex");
    } else {
      filterDiv.classList.remove("d-flex");
      filterDiv.classList.add("d-none");
    }
  };
  return (
    <>
      <h1 className="text-navy mt-3">ค้นหาเเพทย์</h1>
      <div className="input-group shadow">
        <input
          type="text"
          className="form-control doctor-filter-input"
          placeholder="ชื่อ, ความชำนาญ, โรงพาบาล"
        />
        <button
          className="btn bg-navy text-white doctor-filter-input"
          onClick={() => filterDiv()}
        >
          ตัวกรอง
        </button>
      </div>
      <div className="d-flex gap-4 align-items-center" id="filter-div">
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
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
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
          aria-label="ล้างวันที่"
          tooltip="ล้างวันที่"
          onClick={clearFilters}
        >
          <MdOutlineClear />
        </button>
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
