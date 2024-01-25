import express, { Request, Response } from 'express';
import { userController } from '../controllers/userController';
import {
  userCreateValidator,
  loginValidator,
} from '../validators/userValidator';
import { validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { verifyToken } from '../middlewares/routeVerifyJWT';

export const userRouter = express.Router();
userRouter.use(express.json());
dotenv.config();
userRouter.post(
  '/create',
  userCreateValidator,
  async (_req: Request, res: Response) => {
    try {
      const errors = validationResult(_req);
      let userBody = _req.body;

      if (errors.isEmpty()) {
        let userPresent = await userController.findUser(userBody.email);
        if (userPresent) {
          return res
            .status(400)
            .json({ error: { message: 'USER_ALREADY_EXIST' } });
        } else {
          let result = await userController.createNewUser(_req, res);
          if (result) {
            return res.status(200).send(result);
          }
        }
      } else {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error: any) {
      // Handle promise rejections here
      return res.status(500).send(error.message);
    }
  }
);

userRouter.post(
  '/login',
  loginValidator,
  async (_req: Request, res: Response) => {
    try {
      const errors = validationResult(_req);
      if (errors.isEmpty()) {
        const { email, password } = _req.body;
        let user = await userController.findUser(email);
        if (!user) {
          return res.status(401).json({ error: { message: 'USER NOT FOUND' } });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Authentication failed' });
        }
        const secret = process.env.JSON_WEB_TOKEN_SECRET || 'M@inBramhaHun123';
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: '1h',
        });
        const _id = user._id;
        return res.status(200).json({ token, email, _id });
      } else {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }
);

userRouter.post(
  '/getAllUsers',
  verifyToken,
  async (_req: Request, res: Response) => {
    try {
      const { email } = _req.body;
      let user = await userController.getAllUsers(email);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }
);
