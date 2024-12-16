import React from "react";
import { Appointment } from "./AppointmentForm";

interface AppointmentTableProps {
  appointments: Appointment[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  return (
    <div>
      <h3>Lista de Citas</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
