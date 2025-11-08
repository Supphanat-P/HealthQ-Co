import React, { useEffect, useMemo, useState } from "react";
import { useData } from "../../Context/DataContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, Form } from "react-bootstrap";

dayjs.extend(customParseFormat);

const normalizeDateString = (raw) => {
  if (!raw) return raw;
  let s = String(raw).trim();
  s = s.replace(/[\u0E50-\u0E59]/g, (d) => String(d.charCodeAt(0) - 0x0e50));
  s = s.replace(/[.\-\\ ]+/g, "/");
  const p = dayjs(s, "DD/MM/YYYY", true);
  if (p.isValid()) return p.format("DD/MM/YYYY");
  const p2 = dayjs(s);
  if (p2.isValid()) return p2.format("DD/MM/YYYY");
  return raw;
};

const AdminDoctorSchedule = () => {
  const { doctors = [], doctorsSchedule = [], setDoctorsSchedule } = useData();

  const [localSchedules, setLocalSchedules] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctors.length > 0 ? doctors[0].doctor_id : ""
  );

  const [form, setForm] = useState({
    date: "",
    start_time: "09:00",
    end_time: "10:00",
    status: "available",
  });

  useEffect(() => {
    setLocalSchedules(doctorsSchedule || []);
  }, [doctorsSchedule]);

  useEffect(() => {
    if (doctors && doctors.length && !selectedDoctorId) {
      setSelectedDoctorId(doctors[0].doctor_id);
    }
  }, [doctors]);

  const handleAddSlot = () => {
    if (!selectedDoctorId) return alert("กรุณาเลือกแพทย์");
    if (!form.date) return alert("กรุณาใส่วันที่ (DD/MM/YYYY)");
    const normalized = normalizeDateString(form.date);
    if (!normalized) return alert("วันที่ไม่ถูกต้อง");

    const newSlot = {
      schedule_text: `วันที่ ${form.date} ${form.start_time}-${form.end_time}`,
      date: normalized,
      start_time: form.start_time,
      end_time: form.end_time,
      duration: 60,
      status: form.status,
    };

    const updated = (localSchedules || []).map((s) => {
      if (s.doctor_id === selectedDoctorId) {
        return { ...s, slots: [...(s.slots || []), newSlot] };
      }
      return s;
    });

    // if no schedule existed for doctor, add one
    if (!updated.find((s) => s.doctor_id === selectedDoctorId)) {
      updated.push({
        schedule_id: `SCH-${selectedDoctorId}`,
        doctor_id: selectedDoctorId,
        slots: [newSlot],
      });
    }

    setLocalSchedules(updated);
    if (typeof setDoctorsSchedule === "function") setDoctorsSchedule(updated);
    setForm({
      date: "",
      start_time: "09:00",
      end_time: "10:00",
      status: "available",
    });
  };

  const handleDeleteSlot = (doctorId, idx) => {
    if (!confirm("ลบเวลานัดนี้หรือไม่?")) return;
    const updated = (localSchedules || []).map((s) => {
      if (s.doctor_id === doctorId) {
        const newSlots = (s.slots || []).filter((_, i) => i !== idx);
        return { ...s, slots: newSlots };
      }
      return s;
    });
    setLocalSchedules(updated);
    if (typeof setDoctorsSchedule === "function") setDoctorsSchedule(updated);
  };

  const handleEditSlot = (doctorId, idx, changes) => {
    const updated = (localSchedules || []).map((s) => {
      if (s.doctor_id === doctorId) {
        const newSlots = (s.slots || []).map((slot, i) =>
          i === idx ? { ...slot, ...changes } : slot
        );
        return { ...s, slots: newSlots };
      }
      return s;
    });
    setLocalSchedules(updated);
    if (typeof setDoctorsSchedule === "function") setDoctorsSchedule(updated);
  };

  return (
    <div className="container mt-4">
      <h3>Admin — Doctor Schedules</h3>
      <div className="card p-3 mt-3">
        <h5>เพิ่มเวลานัด</h5>
        <div className="d-flex gap-2 align-items-end">
          <Form.Group>
            <Form.Label>แพทย์</Form.Label>
            <Form.Select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              {doctors.map((d) => (
                <option key={d.doctor_id} value={d.doctor_id}>
                  {d.doctor_name} ({d.doctor_id})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>วันที่ (DD/MM/YYYY)</Form.Label>
            <Form.Control
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="02/11/2025"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>เริ่ม</Form.Label>
            <Form.Control
              type="time"
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>สิ้นสุด</Form.Label>
            <Form.Control
              type="time"
              value={form.end_time}
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>สถานะ</Form.Label>
            <Form.Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="available">available</option>
              <option value="booked">booked</option>
              <option value="pending">pending</option>
            </Form.Select>
          </Form.Group>

          <div>
            <Button onClick={handleAddSlot} className="mt-2">
              Add Slot
            </Button>
          </div>
        </div>
      </div>

      <div className="card mt-4 p-3">
        <h5>ตารางเวลาทั้งหมด</h5>
        {(localSchedules || []).map((sched) => {
          const doctor =
            doctors.find((d) => d.doctor_id === sched.doctor_id) || {};
          return (
            <div key={sched.schedule_id || sched.doctor_id} className="mb-4">
              <h6>{doctor.doctor_name || sched.doctor_id}</h6>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>วันที่</th>
                    <th>เวลา</th>
                    <th>สถานะ</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(sched.slots || []).map((slot, idx) => (
                    <tr key={`${sched.doctor_id}-${idx}`}>
                      <td>{idx + 1}</td>
                      <td>{slot.date}</td>
                      <td>{`${slot.start_time} - ${slot.end_time}`}</td>
                      <td>{slot.status}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            const newDate = prompt(
                              "วันที่ (DD/MM/YYYY)",
                              slot.date
                            );
                            const newStart = prompt(
                              "start_time",
                              slot.start_time
                            );
                            const newEnd = prompt("end_time", slot.end_time);
                            const newStatus = prompt(
                              "status (available/booked/pending)",
                              slot.status
                            );
                            if (newDate) {
                              const normalized = normalizeDateString(newDate);
                              handleEditSlot(sched.doctor_id, idx, {
                                date: normalized,
                                start_time: newStart || slot.start_time,
                                end_time: newEnd || slot.end_time,
                                status: newStatus || slot.status,
                                schedule_text: `วันที่ ${newDate} ${
                                  newStart || slot.start_time
                                }-${newEnd || slot.end_time}`,
                              });
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteSlot(sched.doctor_id, idx)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDoctorSchedule;
