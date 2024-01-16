import mongoose from 'mongoose';

export interface IUser {
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String },
});

export const userModel = mongoose.model('User', userSchema);

