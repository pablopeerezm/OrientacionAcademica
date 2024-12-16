import React, { useState } from "react";

interface AppointmentFormProps {
  selectedDate: Date;
  onAddAppointment: (appointment: Appointment) => void;
}

export interface Appointment {
  id: number;
  date: string; // Fecha como string ISO
  time: string; // Hora en formato HH:mm
  description: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate, onAddAppointment }) => {
  const [time, setTime] = useState<string>("09:00");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = selectedDate.toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD
    const newAppointment: Appointment = {
      id: Date.now(),
      date: formattedDate,
      time,
      description,
    };

    onAddAppointment(newAppointment);
    setTime("09:00"); // Reiniciar a la primera hora disponible
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agendar Cita</h3>
      <div>
        <label>Fecha:</label>
        <span>{selectedDate.toDateString()}</span>
      </div>
      <div>
        <label>Hora:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
        </select>
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          placeholder="Descripción de la cita"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Añadir Cita</button>
    </form>
  );
};

export default AppointmentForm;
