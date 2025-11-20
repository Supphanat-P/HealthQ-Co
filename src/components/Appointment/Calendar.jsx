import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import th from "date-fns/locale/th";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import 'react-day-picker/dist/style.css';

const Calendar = ({ selectedDates = [], onDateSelect }) => {
  const [dates, setDates] = useState(selectedDates);
  const today = new Date();

  const handleSelect = (selected) => {
    if (selected.length > 3) {
      toast.error("เลือกได้สูงสุด 3 วัน");
      return;
    }
    setDates(selected);
    const formattedDates = selected.map(d => dayjs(d).format("YYYY-MM-DD"));
    onDateSelect?.(formattedDates);
  };

  return (
    <div className="flex flex-col space-y-2">
      <h5 className="text-lg font-semibold text-navy-600 mb-2">เลือกวันที่</h5>
      <div className="border border-gray-300 rounded p-2">
        <DayPicker
          navLayout="around"
          components={{
            IconLeft: () => <ChevronLeft />,
            IconRight: () => <ChevronRight />,
          }}
          locale={th}
          showOutsideDays
          weekStartsOn={1}
          mode="multiple"
          selected={dates}
          onSelect={handleSelect}
          disabled={[{ before: today }]}
        />
      </div>
    </div>
  );
};

export default Calendar;
