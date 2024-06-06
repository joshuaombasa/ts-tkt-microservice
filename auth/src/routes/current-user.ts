import express, { Request, Response, NextFunction } from 'express';
import { isJSDocNonNullableType } from 'typescript';
import { currentUser } from '@joshuaombasateeketi/common9';

const currentuserRouter = express.Router();

currentuserRouter.get(
  '/api/users/currentuser',
  currentUser,
  async (request: Request, response: Response, next: NextFunction) => {
    response.json({
      currentUser: request.currentUser ? request.currentUser : null,
    });
  }
);

export { currentuserRouter };
