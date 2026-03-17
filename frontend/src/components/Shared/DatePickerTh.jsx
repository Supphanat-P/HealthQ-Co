import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";

try {
  registerLocale("th", th);
} catch (e) {}

const DatePickerTh = ({
  dateFormat = "d MMM yyyy",
  locale = "th",
  className = "btn border-1 border-navy text-navy rounded fs-6 mt-2 p-2 d-flex align-items-center justify-content-center",
  ...props
}) => {
  return (
    <DatePicker
      dateFormat={dateFormat}
      locale={locale}
      className={className}
      {...props}
    />
  );
};

export default DatePickerTh;
