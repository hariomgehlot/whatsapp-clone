import { Request, Response } from 'express';
import { IUser, userModel } from '../models/user';
import * as bcrypt from 'bcrypt';

require('../services/home.service');

export const userController = {
  createNewUser: async (req: Request, res: Response) => createNewUser(req, res),
  findUser: async (email: string) => findUserByEmail(email),
  getAllUsers: async (search: string) => getAllUsers(search),
};

async function createNewUser(req: Request, res: Response) {
  try {
    let newUser = req.body as IUser;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    let user = await userModel.create(newUser);
    user.password = '';
    return user;
  } catch (error) {
    res.status(500).send({ message: error });
  }
}
async function findUserByEmail(email: string) {
  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      return user;
    }
  } catch (error) {
    return null;
  }
  return null;
}
async function getAllUsers(searchKey: string) {
  try {
    let user = await userModel.find({
      email: { $regex: searchKey || '', $options: 'i' },
    });
    if (user) {
      return user;
    }
  } catch (error) {
    return [];
  }
  return [];
}
