import { body, param } from 'express-validator';

export const loginValidator = [
  body('email', 'email can not be Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'password can not be empty').not().isEmpty(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
];

export const userCreateValidator = [
  body('email', 'Invalid email').isEmail(),
  body('email', 'email should not be empty').not().isEmpty(),
  body('password', 'password does not Empty').not().isEmpty(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
];
