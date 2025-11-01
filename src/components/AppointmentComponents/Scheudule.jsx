import React, { use } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useNavigate } from "react-router-dom";

dayjs.locale("th");

const Schedule = ({
  schedule,
  selectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const navigate = useNavigate();
  const selectedClick = () => {
    navigate("/appointmentinfo", {
      state: {
        selectedDate,
        selectedTime,
      },
    });
    navigate("/patientinfo", {
      state: {
        selectedDate,
        selectedTime,
      },
    });
  };

  const weekDays = Array.from({ length: 5 }, (_, i) =>
    dayjs(selectedDate).add(i, "day")
  );

  const format = (date) => dayjs(date).format("DD/MM/YYYY");

  const grouped = weekDays.map((day) => {
    const dateStart = format(day);
    const slots = (schedule?.slots || []).filter(
      (slot) => slot.date === dateStart
    );
    return { date: day, slots };
  });

  return (
    <div className="d-flex gap-3 overflow-auto py-3 justify-content-center">
      {grouped.length === 0 && (
        <div className="text-center text-danger mt-5">
          ไม่พบเวลาว่างสำหรับการนัดหมาย ❌
        </div>
      )}
      {grouped
        .filter((day) => day.slots.length > 0)
        .map((day, idx) => (
          <div
            key={idx}
            className="card card-schedule d-flex flex-column align-items-center bordershadow p-3 bg-white"
            style={{ minWidth: "140px" }}
          >
            <div
              className="rounded py-2 px-3 text-center w-100 text-white"
              style={{ backgroundColor: "#002D73" }}
            >
              <div className="fw-bold">{day.date.format("dddd")}</div>
              <div className="small">{day.date.format("D MMM")}</div>
            </div>

            <div className="mt-2 w-100">
              {day.slots.map((slot, i) => {
                const id = `${slot.date}-${slot.start_time}`;
                const isSelected = selectedTime === id;
                const isBooked = slot.status === "booked";

                return (
                  <div
                    key={i}
                    onClick={() =>
                      !isBooked && setSelectedTime(id) && selectedClick()
                    }
                    className={`border rounded text-center py-2 mb-2 small ${
                      isBooked
                        ? "bg-danger text-white"
                        : isSelected
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`}
                    style={{ cursor: isBooked ? "not-allowed" : "pointer" }}
                  >
                    {slot.start_time} - {slot.end_time}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Schedule;
