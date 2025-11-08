import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useData } from "../../Context/DataContext";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");
const SelectTime = ({
  selectedTime: propSelectedTime,
  selectedDoctorId,
  onTimeChange,
  selectedDate,
}) => {
  const { doctorsSchedule } = useData();
  const doctorSchedule = (doctorsSchedule || []).find(
    (ds) => ds.doctor_id === selectedDoctorId
  );

  const [selectedTime, setSelectedTime] = useState(propSelectedTime || null);

  const slotsForDate = useMemo(() => {
    if (!doctorSchedule || !selectedDate) return [];
    const slots = doctorSchedule.slots || [];

    return slots.filter((slot) => {
      const parsed = dayjs(slot.date, "DD/MM/YYYY", true);
      const slotKey = parsed.isValid()
        ? parsed.format("YYYY-MM-DD")
        : dayjs(slot.date).format("YYYY-MM-DD");
      const formattedSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      return slotKey === formattedSelectedDate;
    });
  }, [doctorSchedule, selectedDate]);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  return (
    <>
      <div className="ms-4 d-flex flex-column">
        <h5 className="text-navy">เลือกเวลา</h5>
        <div className="d-flex flex-wrap gap-2 mb-4 ">
          {slotsForDate.length === 0 && <div>กรุณาเลือกวัน</div>}
          {slotsForDate.map((slot, idx) => {
            const orderByStartTime = slotsForDate.sort((a, b) =>
              dayjs(a.start_time, "HH:mm").isBefore(
                dayjs(b.start_time, "HH:mm")
              )
                ? -1
                : 1
            );
            const isBooked = slot.status !== "available";
            const isPending = slot.status === "pending";
            const label = `${slot.start_time} - ${slot.end_time}`;
            return (
              <Button
                key={`${idx}-${slot.status}`}
                variant={isPending ? "warning" : isBooked ? "danger" : ""}
                disabled={isBooked}
                className={`time-button shadow-sm ${
                  selectedTime === label ? "bg-navy text-white" : ""
                } ${isPending ? "text-black" : ""}`}
                style={{ width: "140px" }}
                onClick={() => {
                  setSelectedTime(label);
                  onTimeChange?.(slot);
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
        <hr />
        <h5 className="text-navy">วัน-เวลานัด</h5>
        <div className="mb-3">
          <strong>วันที่</strong>: &nbsp;
          {selectedDate
            ? dayjs(selectedDate).format("DD MMMM BBBB")
            : "กรุณาเลือกวัน"}
          &nbsp; <strong>เวลา</strong>: &nbsp;
          {selectedTime || "กรุณาเลือกเวลา"} น.
        </div>
      </div>
    </>
  );
};

export default SelectTime;
