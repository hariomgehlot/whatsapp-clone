import express, { Request, Response } from 'express';
import { messageController } from '../controllers/messageContoller';

export const messageRouter = express.Router();
messageRouter.use(express.json());

export type messageException = {
  error: {
    name: string;
    message: string;
  };
};
export async function createNewMessage(message: any) {
  return messageController
    .createNewMessage(message)
    .then((data) => {
      console.log('received success at controller');
      return Promise.resolve(data);
    })
    .catch((error) => {
      console.log('received error at controller');
      return Promise.reject(error);
    });
}

messageRouter.post('/getAllMessages', async (_req: Request, res: Response) => {
  try {
    let result = await messageController.getAllMessagesByRoomID(_req, res);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
