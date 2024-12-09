import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = 'alumno' | 'orientador'

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  disponibilidad?: string[];
  comparePassword: (password: string) => Promise<Boolean>
};

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String, 
    required: true, 
    enum: ['alumno', 'orientador'] 
  },
  disponibilidad: { 
    type: [String], 
    enum: ['10:00', '11:00', '12:00', '13:00'], 
    required: function(this: IUser) { 
      return this.role === 'orientador'; 
    } 
  },
});

userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User =  model<IUser>("User", userSchema);
