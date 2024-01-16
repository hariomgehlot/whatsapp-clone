import express, { Request, Response } from 'express';
import { userController } from '../controllers/userController';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/', async (_req: Request, res: Response) => {
  try {
    let result = await userController.createNewUser(_req, res);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
