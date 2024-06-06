import { validateRequest } from '@joshuaombasa/common10';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket, build } from '../models/ticket';

const newTicketRouter = express.Router();

newTicketRouter.post(
  '/api/tickets',
  [
    body('title').trim().not().isEmpty().withMessage('Title must be provided'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { title, price } = request.body;

    const userId = request.currentUser!.id;

    const ticketObject = build({ title, price, userId });
    const savedTicket = await ticketObject.save();
    response.status(201).send(savedTicket);
  }
);

export { newTicketRouter };
