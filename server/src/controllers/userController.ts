import { Request, Response } from 'express';
import { IUser, userModel } from '../models/user';

require('../services/home.service');

export const userController = {
  createNewUser: async (req: Request, res: Response) => createNewUser(req, res),
};

async function createNewUser(req: Request, res: Response) {
  try {
    let newUser = req.body as IUser;
    return await new userModel(newUser).save();
  } catch (error) {
    res.status(500).send({ message: error });
  }
}
