import React, { useEffect, useState } from "react";
import { Clock, Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/th";

const SelectTime = ({
  selectedDates = [],
  selectedTimes = {},
  onTimeChange,
}) => {
  const [localTimes, setLocalTimes] = useState(selectedTimes);

  useEffect(() => {
  }, [selectedTimes]);

  const handleTimeChange = (date, time) => {
    const updated = { ...localTimes, [date]: time };
    setLocalTimes(updated);
    onTimeChange?.(updated);
  };

  if (selectedDates.length === 0) {
    return (
      <div className="flex items-center w-full justify-center p-8 bg-linear-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-dashed border-red-200">
        <div className="text-center">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-red-400" />
          <p className="text-red-600 font-medium">กรุณาเลือกวันก่อน</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-6 h-6 text-blue-600" />
        <h5 className="text-xl font-bold text-gray-800">เลือกเวลา</h5>
      </div>

      <div className="space-y-4!">
        {selectedDates.map((date) => {
          const selectedTime = localTimes[date] || "";

          return (
            <div
              key={date}
              className="bg-white rounded-xl shadow-sm mb-2 hover:shadow-lg transition-all duration-300 p-2.5! border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {dayjs(date).locale("th").format("D MMMM YYYY")}
                    </p>
                    {selectedTime && (
                      <p className="text-sm text-gray-500">
                        เวลาที่เลือก: {selectedTime} น.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <hr />

              <div className="flex items-center gap-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เวลา
                </label>
                <input
                  style={{ colorScheme: "light" }}
                  type="time"
                  value={selectedTime}
                  onChange={(e) => {
                    handleTimeChange(date, e.target.value);
                  }}
                  className="flex-1 px-4! py-3! text-center text-lg font-semibold border-2 border-gray-200 rounded-lg! focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                  [&::-webkit-calendar-picker-indicator]:filter
                  [&::-webkit-calendar-picker-indicator]:invert
                  [&::-webkit-calendar-picker-indicator]:cursor-pointer
                  [&::-webkit-calendar-picker-indicator]:p-1.5
                  [&::-webkit-calendar-picker-indicator]:rounded-xl
                [&::-webkit-calendar-picker-indicator]:bg-orange-200
                "
                  required
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectTime;
