import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import AppointmentHeader from "../../components/AppointmentComponents/AppointmentHeader";
import FooterButton from "../../components/AppointmentComponents/FooterButton";
import RadioChoice from "../../components/AppointmentComponents/RadioChoice";
import Stepper from "../../components/Shared/Stepper/Stepper";
import PopupModal from "../../components/AppointmentComponents/PopupModal";
import DatePicker from "../../components/Shared/DatePickerTh";

const Appointment = () => {
  const navigate = useNavigate();
  const [hospitalOption, sethospitalOption] = useState(null);
  const [doctorOption, setdoctorOption] = useState(null);
  const [showSpecialtiesModal, setShowSpecialtiesModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const nextPageClick = () => {
    navigate("/doctorsearch", {
      state: {
        selectedSpecialty,
        selectedHospital,
      },
    });
  };

  useEffect(() => {
    if (doctorOption === "self") {
      setShowSpecialtiesModal(true);
    }
  }, [doctorOption]);

  useEffect(() => {
    if (hospitalOption === "self") {
      setShowHospitalsModal(true);
    }
  }, [hospitalOption]);

  return (
    <>
      <AppointmentHeader />
      <div
        className="d-flex justify-content-center mb-5"
        style={{ marginRight: "11rem" }}
      >
        <Stepper Step={1} />
        <div className="AppointmentBackground">
          <RadioChoice
            label={"เลือกโรงพยาบาล"}
            name={"hospital"}
            value={hospitalOption}
            onChange={sethospitalOption}
            selectedValue={selectedHospital}
            onOptionClick={(val) => {
              if (val === "self") setShowHospitalsModal(true);
            }}
          />
          <hr />
          <div>
            <RadioChoice
              label={"เลือกแพทย์"}
              name={"doctor"}
              value={doctorOption}
              onChange={setdoctorOption}
              selectedValue={selectedSpecialty}
              onOptionClick={(val) => {
                if (val === "self") setShowSpecialtiesModal(true);
              }}
            />
          </div>
        </div>
      </div>
      <FooterButton
        labelNext={"ต่อไป"}
        labelBack={"เริ่มใหม่"}
        gotoLocation={"stay"}
        backtoLocation=""
        onNextClick={nextPageClick}
      />

      {showSpecialtiesModal && (
        <PopupModal
          label={"เลือกความชำนาญแพทย์"}
          name={"specialties"}
          itemOption={doctorOption}
          show={showSpecialtiesModal}
          onClose={() => setShowSpecialtiesModal(false)}
          onSelect={setSelectedSpecialty}
          dataName={"specialties"}
        />
      )}

      {showHospitalsModal && (
        <PopupModal
          label={"เลือกโรงพยาบาล"}
          name={"hospitals"}
          itemOption={hospitalOption}
          show={showHospitalsModal}
          onClose={() => setShowHospitalsModal(false)}
          onSelect={setSelectedHospital}
          dataName={"hospitals"}
        />
      )}
    </>
  );
};

export default Appointment;
