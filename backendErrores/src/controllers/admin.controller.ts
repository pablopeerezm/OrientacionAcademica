import { Request, Response } from 'express';
import {User} from '../models/user';  // Asegúrate de que la exportación sea 'User'

// Método CRUD para que el admin pueda eliminar orientadores
export const eliminarOrientador = async (req: Request, res: Response) => {
  try {
    const orientadorId = req.params.id;
    const orientador = await User.findById(orientadorId);
    if (!orientador || orientador.role !== 'orientador') {
      return res.status(400).json({ message: 'El usuario no es un orientador.' });
    }

    await User.findByIdAndDelete(orientadorId);
    res.status(200).json({ message: 'Orientador eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el orientador.', error });
  }
};
