import React, { use, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import th from "date-fns/locale/th";
import "react-day-picker/dist/style.css";
import dayjs from "dayjs";
import { useData } from "../../Context/DataContext";

function Calendar({
  className,
  showOutsideDays = true,
  locale = th,
  weekStartsOn = 1,
  selectedDoctorId,
  onDateSelect,
  selectedDate,
}) {
  const { doctors } = useData();
  const [availableDates, setAvailableDates] = useState([]);

  const doctor = (doctors || []).find(
    (doc) => doc.doctor_id === selectedDoctorId
  );

  useEffect(() => {
    if (doctor?.available_dates) {
      const formattedAvailableDates = doctor.available_dates.map((date) => {
        const parsed = dayjs(date, "DD/MM/YYYY", true);
        const final = parsed.isValid() ? parsed : dayjs(date);
        return final.format("YYYY-MM-DD");
      });
      setAvailableDates(formattedAvailableDates);
    } else {
      setAvailableDates([]);
    }
  }, [doctor]);

  const isDisabled = (date) => {
    const formatted = dayjs(date).format("YYYY-DD-MM");
    return !availableDates.includes(formatted);
  };

  const today = new Date();

  return (
    <>
      <h5 className="text-navy">เลือกวันที่</h5>
      <div className="card border-navy p-2 w-fit justify-self-center">
        <DayPicker
          navLayout="around"
          className={className}
          components={{
            IconLeft: () => <ChevronLeft />,
            IconRight: () => <ChevronRight />,
          }}
          locale={locale}
          showOutsideDays={showOutsideDays}
          weekStartsOn={weekStartsOn}
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={(date) => {
            const formatted = dayjs(date).format("YYYY-MM-DD");
            onDateSelect?.(formatted);
          }}
          disabled={[{ before: today }, isDisabled]}
          required
        />
        <div className="text-center mt-2">
          {selectedDate ? (
            <span className="text-navy fw-medium">
              วันที่เลือก: {dayjs(selectedDate).format("D MMMM YYYY")}
            </span>
          ) : (
            <span className="text-muted">กรุณาเลือกวันที่</span>
          )}
        </div>
      </div>
    </>
  );
}

export { Calendar };
