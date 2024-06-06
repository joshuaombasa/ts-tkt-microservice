import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { NotFoundError,validateRequest } from '@joshuaombasateeketi/common9';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const {email,password} = request.body

    const existingUser = await User.findOne({email})

    if (!existingUser) {
      throw new NotFoundError()
    }

    const jwtToken = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, 'asdf')

    request.session = {jwt: jwtToken}

    response.send(existingUser)
  }
);

export { signinRouter };
