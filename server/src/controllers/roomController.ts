import { Request, Response } from 'express';
import { IRoom, roomModel } from '../models/room';
// import { collections, connectToMongo } from '../services/rooms.service';
// import { Room } from '../models/room';

// connectToMongo();
require('../services/home.service');
export const roomController = {
  getAllRooms: async (req: Request, res: Response) => getAllRooms(req, res),
  createNewRoom: async (req: Request, res: Response) => createNewRoom(req, res),
};

async function getAllRooms(req: Request, res: Response) {
  try {
    // let result = await collections.rooms?.find({}).toArray();
    // return result;
    let result = await roomModel
      .find({})
      .populate('lastMessage')
      .sort({ updatedAt: -1 });
    return result;
  } catch (error) {
    res.status(500).send({ message: error });
  }
}
async function createNewRoom(req: Request, res: Response) {
  try {
    let newRoom = req.body as IRoom;
    return await new roomModel(newRoom).save();
  } catch (error) {
    console.log(error);
  }
}
