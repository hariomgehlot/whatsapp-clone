import express, { Request, Response } from 'express';
// import { Room } from '../models/room';
import { roomController } from '../controllers/roomController';

export const roomRouter = express.Router();
roomRouter.use(express.json());

roomRouter.get('/getAllRooms', async (_req: Request, res: Response) => {
  try {
    let result = await roomController.getAllRooms(_req, res);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

roomRouter.post('/create', async (req: Request, res: Response) => {
  try {
    let result = await roomController.createNewRoom(req, res);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
