import React from "react";
import { useData } from "../../Context/DataContext";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";

const AppoitmentData = () => {
  const { appointments = [], doctors = [], hospitals = [] } = useData();

  const findDoctorName = (doctor_id) =>
    doctors.find((d) => d.doctor_id === doctor_id)?.doctor_name || doctor_id;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Appointments</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Phone</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Slot ID</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments.map((a) => (
              <tr key={a.appointment_id}>
                <td>{a.appointment_id}</td>
                <td>{a.patient_name || a.patient_id}</td>
                <td>{a.patient_phone}</td>
                <td>{findDoctorName(a.doctor_id)}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.slot_id}</td>
                <td>
                  {a.created_at
                    ? dayjs(a.created_at).format("D MMM YYYY HH:mm")
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AppoitmentData;
