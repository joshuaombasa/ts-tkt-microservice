import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const indexTicketRouter = express.Router();

indexTicketRouter.get(
  '/api/tickets',
  async (request: Request, response: Response) => {
    const tickets = await Ticket.find({});
    response.send(tickets);
  }
);

export { indexTicketRouter };
