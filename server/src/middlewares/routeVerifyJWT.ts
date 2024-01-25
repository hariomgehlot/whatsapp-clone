import { NextFunction, Request, Response } from 'express';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    let secret = process.env.JSON_WEB_TOKEN_SECRET ?? 'M@inBramhaHun123';
    const decoded = jwt.verify(token, secret);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
