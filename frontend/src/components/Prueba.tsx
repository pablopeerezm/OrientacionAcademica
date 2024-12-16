import React, { useState } from "react";
import Calendar from "./Calendar";
import AppointmentForm, { Appointment } from "./AppointmentForm";
import AppointmentTable from "./AppointmentTable";

const Prueba: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  return (
    <div>
      <h1>Gestión de Citas</h1>
      <Calendar onDateChange={handleDateChange} />
      <AppointmentForm
        selectedDate={selectedDate}
        onAddAppointment={handleAddAppointment}
      />
      <AppointmentTable
        appointments={appointments.filter(
          (appointment) =>
            appointment.date === selectedDate.toISOString().split("T")[0]
        )}
      />
    </div>
  );
};

export default Prueba;
