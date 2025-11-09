import { Modal, Badge } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import React, { useState, useEffect, useContext } from "react";
import LocationCompare from "./locationCompare";
import "./PopupModal.css";

import { DataContext } from "../../Context/DataContext";

const PopupModal = ({
  label,
  dataName,
  itemOption,
  onClose,
  show,
  onSelect,
  closestHospital: propClosestHospital,
}) => {
  const { specialties, hospitals } = useContext(DataContext);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [closestHospital, setClosestHospital] = useState(null);
  useEffect(() => {
    setSelectedSpecialty(itemOption);
    setSelectedHospital(itemOption);
  }, [itemOption]);

  useEffect(() => {
    // prefer prop if provided, otherwise read last computed closest hospital from localStorage
    if (propClosestHospital) {
      setClosestHospital(propClosestHospital);
      return;
    }
    try {
      const raw = localStorage.getItem("hq_closest_hospital");
      if (raw) setClosestHospital(JSON.parse(raw));
    } catch (err) {
      // ignore JSON errors
    }
  }, [propClosestHospital]);

  return (
    <>
      <Modal show={show} onHide={onClose} centered scrollable>
        <Modal.Header>
          <Modal.Title
            className="fs-1 text-navy fw-bold mt-0"
            style={{ letterSpacing: 0.5 }}
          >
            {label}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="modalBody"
          style={{
            padding: "1.25rem",
          }}
        >
          <div
            className="modalBody d-flex flex-column align-items-center"
            style={{ gap: "1rem" }}
          >
            <div style={{ width: "100%" }}>
              {dataName === "specialties" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.75rem",
                  }}
                >
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.specialty_id}
                      className="btn btn-popupModal btn-popupModal-color fs-5 text-start d-flex align-items-center shadow-sm"
                      value={specialty.specialty_id}
                      onClick={() => {
                        setSelectedSpecialty(specialty.specialty_id);
                        onSelect(specialty.specialty_name);
                        onClose();
                      }}
                    >
                      <div className="Spec-Icon">
                        {specialty.specialty_name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          {specialty.specialty_name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {dataName === "hospitals" && (
                <>
                  {closestHospital && (
                    <div>
                      <p className="fs-6">โรงพยาบาลที่ใกล้ที่สุด</p>

                      <button
                        key={closestHospital.hospital.hospital_id}
                        className="btn btn-popupModal btn-popupModal-color fs-5 text-start d-flex align-items-center"
                        style={{ maxWidth: "max-content" }}
                        value={closestHospital.hospital.hospital_id}
                        onClick={() => {
                          setSelectedHospital(
                            closestHospital.hospital.hospital_id
                          );
                          onSelect(closestHospital.hospital.hospital_name);
                          onClose();
                        }}
                      >
                        <div className="Hospital-Icon">H</div>
                        <div style={{ flex: 1 }}>
                          <div className="w-fit fw-bold fs-6">
                            {closestHospital.hospital.hospital_name}
                          </div>
                          {closestHospital.distance && (
                            <div
                              className="w-fit fw-bold text-gray"
                              style={{ fontSize: "12px" }}
                            >
                              {closestHospital.distance < 1000
                                ? `${closestHospital.distance} เมตร จากตำแหน่งของคุณ`
                                : `${(closestHospital.distance / 1000).toFixed(
                                    2
                                  )} กิโลเมตร จากตำแหน่งของคุณ`}
                            </div>
                          )}
                        </div>
                        <Badge>ใกล้ที่สุด</Badge>
                      </button>
                    </div>
                  )}
                  {!closestHospital && (
                    <>
                      <p className="fs-6">โรงพยาบาลที่ใกล้ที่สุด</p>
                      <hr />
                      <div className="div alert alert-warning">
                        ไม่สามารถรับตำแหน่งได้
                      </div>
                    </>
                  )}
                  <hr />
                  <p>โรงพยาบาลทั้งหมด</p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "0.75rem",
                    }}
                  >
                    {hospitals.map((hospital) => (
                      <button
                        key={hospital.hospital_id}
                        className="btn btn-popupModal btn-popupModal-color fs-5 text-start d-flex align-items-center"
                        value={hospital.hospital_id}
                        onClick={() => {
                          setSelectedHospital(hospital.hospital_id);
                          onSelect(hospital.hospital_name);
                          onClose();
                        }}
                      >
                        <div className="Hospital-Icon">H</div>
                        <div style={{ flex: 1 }}>
                          <div className="w-fit fw-bold fs-6">
                            {hospital.hospital_name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PopupModal;
