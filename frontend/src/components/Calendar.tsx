import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

export function Calendar({ onDateChange } : CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateChange(date);
  };

  return (
    <div>
      <h3>Selecciona una Fecha</h3>
      <DatePicker selected={selectedDate} onChange={handleChange} />
    </div>
  );
};

export default Calendar;
