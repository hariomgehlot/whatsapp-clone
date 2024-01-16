import mongoose, { Schema } from 'mongoose';
import { IMessage } from './message';

export interface IRoom {
  name: string;
  lastMessage: IMessage;
  profile: string;
}

const roomSchema = new mongoose.Schema<IRoom>(
  {
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    name: { type: String },
    profile: { type: String },
  },
  {
    timestamps: true,
  }
);

export const roomModel = mongoose.model('Room', roomSchema);
