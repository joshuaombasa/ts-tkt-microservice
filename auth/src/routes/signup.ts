import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { body } from 'express-validator';
import { BadRequestError ,validateRequest} from '@joshuaombasateeketi/common9';
import { User, build } from '../models/user';
import { Password } from '../services/Password';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const {email, password} = request.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
      throw new BadRequestError()
    }

    const hashedPassword = await Password.toHash(password)
    
    const userObject = build({email, password:hashedPassword})

    const savedUser = await userObject.save()

    const jwtToken = jwt.sign(
      {
        id: savedUser.id,
        emai: savedUser.email
      },'asdf'
    )

    request.session = { jwt: jwtToken}

    response.status(201).send(savedUser)
  }
);

export { signupRouter };
