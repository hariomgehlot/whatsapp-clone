import { Request, Response } from 'express';
import { IMessage, messageModel } from '../models/message';
import { roomModel } from '../models/room';
import { userModel } from '../models/user';

export const messageController = {
  getAllMessagesByRoomID: async (req: Request, res: Response) =>
    getAllMessagesByRoomID(req, res),
  createNewMessage: async (message: any) => createNewMessage(message),
};

async function createNewMessage(message: any) {
  try {
    const user = await userModel.findOne({ _id: message.sender });

    if (!user) {
      // Handle case where user is not found
      throw new Error('USER_NOT_FOUND');
    }

    let newMessage = message as IMessage;
    const result = await messageModel.create(newMessage);

    const messageToReturn = await messageModel
      .findOne(result._id)
      .populate('sender')
      .populate('room');

    await roomModel
      .findOne({ _id: newMessage.room })
      .updateOne({ lastMessage: result })
      .exec();

    return messageToReturn;
  } catch (error: any) {
    throw error;
  }
}

async function getAllMessagesByRoomID(req: Request, res: Response) {
  try {
    let result = await messageModel
      .find({ room: req.body.roomId })
      .sort({ createdAt: 1 })
      .populate('sender')
      .populate('room');
    console.log('id is ', req.body.roomId);
    return result;
  } catch (error) {
    console.log(error);
  }
}
