import mongoose, { Schema } from 'mongoose';
import { IRoom } from './room';
import { IUser } from './user';
export interface IMessage {
  sender: IUser;
  message: string;
  room: IRoom;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  },
  { timestamps: true }
);
export const messageModel = mongoose.model('Message', messageSchema);
