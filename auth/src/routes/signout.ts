import express, { Request, Response, NextFunction } from 'express';

const signoutRouter = express.Router();

signoutRouter.post(
  '/api/users/signout',
  async (request: Request, response: Response, next: NextFunction) => {
    request.session = null;

    response.send({});
  }
);

export { signoutRouter };
