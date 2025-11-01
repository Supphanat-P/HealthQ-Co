import { Modal } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import React, { useState, useEffect, useContext } from "react";
import "./PopupModal.css";

import { DataContext } from "../../Context/DataContext";

const PopupModal = ({
  label,
  dataName,
  itemOption,
  onClose,
  show,
  onSelect,
}) => {
  const { specialties, hospitals } = useContext(DataContext);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  useEffect(() => {
    setSelectedSpecialty(itemOption);
    setSelectedHospital(itemOption);
  }, [itemOption]);
  const handleshow = () => {
    show = true;
  };

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title className="fs-1 text-navy fw-bold mt-0">
            {label}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          <div className="modalBody gap-4">
            {dataName === "specialties" &&
              specialties.map((specialty) => (
                <button
                  key={specialty.specialty_id}
                  className="btn btn-popupModal-color fs-5 text-lg-start"
                  style={{ width: "300px", height: "80px" }}
                  value={specialty.specialty_id}
                  onClick={() => {
                    setSelectedSpecialty(specialty.specialty_id);
                    onSelect(specialty.specialty_name);
                    onClose();
                  }}
                >
                  {specialty.specialty_name}
                </button>
              ))}

            {dataName === "hospitals" &&
              hospitals.map((hospital) => (
                <button
                  key={hospital.hospital_id}
                  className="btn btn-popupModal-color fs-5 text-lg-start"
                  style={{ width: "300px", height: "80px" }}
                  value={hospital.hospital_id}
                  onClick={() => {
                    setSelectedHospital(hospital.hospital_id);
                    onSelect(hospital.hospital_name);
                    onClose();
                  }}
                >
                  {hospital.hospital_name}
                </button>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PopupModal;
