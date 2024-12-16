import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Orientador } from '../api/types';

export function Orientadores() {
  const [orientadores, setOrientadores] = useState<Orientador[]>([]);

  useEffect(() => {
    const fetchOrientadores = async () => {
      try {
        const response = await api.get<Orientador[]>('/admin/orientadores'); // Tipado de la respuesta
        setOrientadores(response.data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        // console.error('Error al obtener orientadores:', error);
        alert('Error al obtener orientadores');
      }
    };

    fetchOrientadores();
  }, []);

  return (
    <div>
      <h2>Lista de Orientadores</h2>
      <ul>
        {orientadores.map((orientador) => (
          <li key={orientador._id}>{orientador.email}</li>
        ))}
      </ul>
    </div>
  );
};
