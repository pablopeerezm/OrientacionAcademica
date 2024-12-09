import { model, Schema, Document } from "mongoose";
import { IUser } from "./user";
import bcrypt from "bcrypt";

export interface ICita extends Document {
  alumno: IUser['_id'];
  orientador: IUser['_id'];
  dia: Date;
  hora: string;
};

const citaSchema = new Schema({
    alumno: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orientador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dia: { type: Date, required: true },
    hora: { type: String, required: true, enum: ['10:00', '11:00', '12:00', '13:00'] },
  
});

export default model<ICita>("Cita", citaSchema);
