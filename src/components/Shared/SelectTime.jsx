import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import dayjs from "dayjs";
import 'dayjs/locale/th';
import 'react-time-picker/dist/TimePicker.css';
import "./SelectTime.css"
dayjs.locale("th");

const SelectTime = ({ selectedDates = [], selectedTimes = {}, onTimeChange }) => {
  const [localTimes, setLocalTimes] = useState(selectedTimes);

  useEffect(() => {
    console.log(selectedTimes);
  }, [selectedTimes]);

  const handleTimeChange = (date, time) => {
    const updated = { ...localTimes, [date]: time };
    setLocalTimes(updated);
    onTimeChange?.(updated);
  };

  if (selectedDates.length === 0)
    return <div className="text-red-500">กรุณาเลือกวันก่อน</div>;

  return (
    <div className="flex flex-col justify-self-center">
      <h5 className="text-lg font-semibold text-navy-600">เลือกเวลา</h5>
      {selectedDates.map((date) => {
        const selectedTime = localTimes[date];
        return (
          <div key={date} className="flex flex-col justify-center">
            <div className="d-flex">
              <strong className="mb-2">{dayjs(date).format("D MMMM YYYY")}  </strong>
              &nbsp;
              {selectedTime && (
                <p className="mb-2 text-gray-600">
                  เวลา: {dayjs(selectedTime, "HH:mm").format("HH:mm")}
                </p>
              )}
            </div>
            <TimePicker
              onChange={(time) => handleTimeChange(date, time)}
              value={selectedTime || ""}
              disableClock
              className="custom-timepicker border border-gray-300 rounded px-3 py-1 w-36 focus:outline-none focus:ring-2 focus:ring-navy-500"
              format="HH:mm"
              clearIcon={null}
              required	
            />


          </div>
        );
      })}
    </div >
  );
};

export default SelectTime;
