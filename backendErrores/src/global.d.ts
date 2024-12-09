// globals.d.ts
import { IUser } from './models/user'; // Asegúrate de importar IUser correctamente

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Esto asegura que `req.user` sea de tipo `IUser`
    }
  }
}
