import {
  NotAuthorizedError,
  NotFoundError,
  validateRequest,
} from '@joshuaombasa/common10';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket, build } from '../models/ticket';

const updateTicketRouter = express.Router();

updateTicketRouter.put(
  '/api/tickets/:id',
  [
    body('title').trim().not().isEmpty().withMessage('Title must be provided'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { title, price } = request.body;

    const existingTicket = await Ticket.findById(request.params.id);

    if (!existingTicket) {
      throw new NotFoundError();
    }

    if (existingTicket.userId !== request.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    existingTicket.set({ title, price });
    await existingTicket.save();
    response.send(existingTicket);
  }
);

export { updateTicketRouter };
