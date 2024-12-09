import { Request, Response } from 'express';
import Cita from '../models/cita';  // Asegúrate de que la exportación sea 'Cita'
import {User, IUser} from '../models/user';  // Asegúrate de que la exportación sea 'User'

export const crearCita = async (req: Request, res: Response) => {
  try {
    const { alumnoId, orientadorId, dia, hora } = req.body;

    // Verificamos que el orientador tiene disponibilidad
    const orientador = await User.findById(orientadorId).exec() as IUser;
    if (!orientador || orientador.role !== 'orientador' || !orientador.disponibilidad?.includes(hora)) {
      return res.status(400).json({ message: 'El orientador no tiene disponibilidad en este horario.' });
    }

    const cita = new Cita({
      alumno: alumnoId,
      orientador: orientadorId,
      dia,
      hora,
    });

    await cita.save();
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita.', error });
  }
};

// Método para que el orientador vea sus citas
export const obtenerCitasOrientador = async (req: Request, res: Response) => {
  try {
    const orientadorId = req.user?._id;
    const citas = await Cita.find({ orientador: orientadorId });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas.', error });
  }
};

// Método para que el alumno vea sus citas
export const obtenerCitasAlumno = async (req: Request, res: Response) => {
  try {
    const alumnoId = req.user?._id;
    const citas = await Cita.find({ alumno: alumnoId });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas.', error });
  }
};
